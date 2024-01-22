<template>
  <header>
    <h1 class="headline_2">Startseite</h1>
    <!-- <img src=> TODO Logo-->
  </header>
  <div class="container_pages">
  <Filter @filter-changed="updateFilter" @reset-filters="resetFilters" />
  <DetailsCourse 
    v-model="dialogVisible"
    :selectedCourse="defindCourse"
    @closeDialog="closeDialog"
    />

  <v-card class="container" id="ListHome" v-for="course in filteredCourses" :key="course.id">
    <div id="div_name">
      <v-card-title @click="dialogVisible=true, defineCourse(course)"> {{ course.sfa }} </v-card-title>
        <v-btn class="btn" id="add_btn" density="comfortable" icon="mdi-star-outline" variant="text" @click=" defineCourse(course); addEntry();"> 
          <v-icon size="large" v-if="isClicked"> {{ 'mdi-star'}} </v-icon>
          <v-icon size="large" v-if="!isClicked"> {{ 'mdi-star-outline'}} </v-icon>
        </v-btn>
    </div>
    <div id="div_infos" @click="dialogVisible=true, defineCourse(course)">
      <v-icon icon="mdi-map-marker" size="small"></v-icon>
      <v-card-subtitle> {{ course.orte }} </v-card-subtitle>
      <v-card-subtitle v-if="course.abg === '0'">ohne Angabe </v-card-subtitle>
      <v-card-subtitle v-else-if="course.abg === '1'">Abschlussprüfung</v-card-subtitle>
      <v-card-subtitle v-else-if="course.abg === '2'">Bachelor</v-card-subtitle>
      <v-card-subtitle v-else-if="course.abg === '3'">Diplom</v-card-subtitle>
      <v-card-subtitle v-else-if="course.abg === '4'">Diplom(FH)</v-card-subtitle>
      <v-card-subtitle v-else-if="course.abg === '10'">Master</v-card-subtitle>
      <v-card-subtitle v-else-if="course.abg === '12'">Staatsexamen</v-card-subtitle>
    </div>
  </v-card>
</div>
</template>

<script>

import axios from "axios";
import { v4 as uuidV4 } from 'uuid';
import Filter from "./Filter.vue";
import DetailsCourse from "./DetailsCourse.vue";


export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    Filter,
    DetailsCourse,
  },
  data: function () {
    return {
      dialogVisible: false,
      defindCourse: {},
      listOfCourses: [],
      favoritRE : '',
      favoritORTE : '',
      daten: {},

      filterParams: {
        parameter1: '',
        parameter2: '',
        parameter3: '',
        parameter4: '',
        parameter5: '',
        parameter6: '',
      },

      isClicked: false
    };
  },

  computed: {
    filteredCourses() {
      const parameter1 = this.filterParams.parameter1;
      const parameter2 = this.filterParams.parameter2 !== null ? this.filterParams.parameter2.toString() : '';
      const parameter3 = this.filterParams.parameter3 !== null ? this.filterParams.parameter3.toString() : '';
      const parameter4 = this.filterParams.parameter4 !== null ? this.filterParams.parameter4.toString() : '';
      const parameter5 = this.filterParams.parameter5 !== null ? this.filterParams.parameter5.toString() : '';
      const parameter6 = this.filterParams.parameter6 !== null ? this.filterParams.parameter6.toString() : '';

      return this.listOfCourses.filter(course => {
        // Hier werden die Filterbedingungen für die Parameter überprüft
        return (
          course.re.includes(parameter1) &&
          course.abg.includes(parameter2) && 
          course.sfo.includes(parameter3) &&
          course.st.includes(parameter4) &&
          course.smo.includes(parameter5) && 
          course.hsa.includes(parameter6) 

        );
      });
    },

    openInfo: function (e) {
      this.dialogVisible = true;
      this.definedCourse = e.data;
    },

    closeInfo: function () {
      this.dialogVisible = false;
    },


    updateFilter: function (newFilterParams) {
      this.filterParams = newFilterParams;
      this.checkFilter()
    },

    filterReset: function () {
      this.filterParams.parameter1 = null;
      this.filterParams.parameter2 = null;
      this.filterParams.parameter3 = null;
      this.filterParams.parameter4 = null;
      this.filterParams.parameter5 = null;
      this.checkFilter()
    },

    search: function (e) {
      if (e.searchWord == null || e.searchWord == '') {
        this.extractedData = [];
        this.startSearch = false;
        this.searchWordRequired = true;
      } else {
        this.extractedData = [];
        this.startSearch = true;
        axios.get("http://localhost:8080/search", {
          params: {
            searchWord: e.searchWord,
          }
        }).then(response => {
          this.searchWordRequired = false;
          this.extractedData = response.data.extractedData;
          this.startSearch = false;
          // Filterparameter werden gecheckt
          this.checkFilter();
        })
      }
    },

    checkFilter() {
      if (this.listOfCourses.length = !0) {
        this.listOfCourses = []
      }
      if (this.filterParams.parameter1 == null && this.filterParams.parameter2 == null && this.filterParams.parameter3 == null && this.filterParams.parameter4 == null && this.filterParams.parameter5 == null) {
        this.listOfCourses = this.extractedData
        return;
      } else {
        for (let i = 0; i < this.extractedData.length; i++) {
          const filter_bundesland = this.filterParams.parameter1 == null || this.filterParams.parameter1 === this.extractedData[i].data.region.Key;
          const filter_abschlussgrad = this.filterParams.parameter2 == null || this.filterParams.parameter2 == this.extractedData[i].data.abschlussgrad.id;
          const filter_studienform = this.filterParams.parameter3 == null || this.filterParams.parameter3 == this.extractedData[i].data.studienform.id;
          const filter_studientyp = this.filterParams.parameter4 == null || this.filterParams.parameter4 == this.extractedData[i].data.studientyp.id;
          const filter_hochschulart = this.filterParams.parameter5 == null || this.filterParams.parameter5 == this.extractedData[i].data.hochschulart.id;

          if (filter_bundesland && filter_abschlussgrad && filter_studienform && filter_studientyp && filter_hochschulart) {
            this.listOfCourses.push(this.extractedData[i])
          }
        }
        if (this.listOfCourses.length == 0) {
          this.noFilterResults = true
          console.log("kein Filter")
        }
      }
    },


    addFavorite: function (e) {
      axios
        .post("http://localhost:8080/favorites/", {
          data: e.data
        })
    },

  },

    methods: {
      defineCourse(course) {
        this.defindCourse = course;
        this.favoritRE = course.sfa;
        this.favoritORTE = course.orte;
        this.favoritID = course.id;
      },

      closeDialog(){
        this.dialogVisible = false;
      },


      updateFilter(newFilterParams) {
        this.filterParams = newFilterParams;
        console.log(newFilterParams);
      },

      resetFilters() {
        console.log('resetFilters wurde aufgerufen');
        this.filterParams.parameter1 = '';
        this.filterParams.parameter2 = '';
        this.filterParams.parameter3 = '';
        this.filterParams.parameter4 = '';
        this.filterParams.parameter5 = '';
        this.filterParams.parameter6 = '';
      },

      addRemoveFavorite() {
        this.isClicked = !this.isClicked;
        console.log(this.isClicked);
        if (this.isClicked == true){
          console.log(this.isClicked)
        } else {
          console.log(this.isClicked)
        }
      },
    handleButtonClick(course) { 
      this.addEntry;
      this.defineCourse(course);
      

    },

    addEntry: function () {
      console.log('Zu sendende Daten:', { name: this.favoritORTE, ort: this.favoritRE, courseId: this.favoritID });

      axios
        .post("http://" + window.location.hostname + ":8080/favorites/", {
          name : this.favoritRE,
          ort : this.favoritORTE,
          courseId : this.favoritID

        })
        .then((response) => {
          this.updateKey = uuidV4();
          console.log(response.data)
        });
    },
    },

    mounted() {
      axios
        .get("http://localhost:8080/course/").then(response => {
          this.listOfCourses = response.data;
          console.log(this.listOfCourses);
        });
    axios
      .get("http://localhost:8080/data/").then(response => {
        this.daten = response.data;
        console.log(this.daten)
        this.filterParams.parameter1 = this.daten[0].bundesland;
        console.log(this.filterParams.parameter1)
        console.log(this.daten[0].bundesland)
      })
    },
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 45px;
  margin-left: -1px;
}

#ListCourse{
  margin-bottom: 21.3px;
}

#ListDetails{
  padding-left: 20px;
  padding-bottom: 10px;
}

span{
  padding-left: 10px;
}

#ListHome {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 15px 10px 15px;
    border-radius: 13px;
  }
  
  #div_name {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  #div_infos {
    display: flex;
    flex-direction: row;
    align-items: left;
    width: 100%;
  }
  
  .v-card-title {
    padding: 0px;
    max-width: 265px;
    font-size: medium;
  }
  
  .v-card-subtitle {
    padding-left: 5px;
  }
</style>
