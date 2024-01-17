<template>
  <header>
    <h3 class="headline_1">Overview</h3>
    <h1 class="headline_2">Home</h1>
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
      <v-card-actions> <!-- Änderung hier von v-card-action auf v-card-actions -->
        <v-btn class="btn" id="add_btn" density="comfortable" variant="text" @click=" defineCourse(course); addEntry();">
          <v-icon size="x-large"> {{ isClicked ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
        </v-btn>
      </v-card-actions>
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
  },

    methods: {
      defineCourse(course) {
        this.defindCourse = course;
        this.favoritRE = course.sfa;
        this.favoritORTE = course.orte;
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
      console.log('Zu sendende Daten:', { name: this.favoritORTE, ort: this.favoritRE });

      axios
        .post("http://" + window.location.hostname + ":8080/favorites/", {
          name : this.favoritRE,
          ort : this.favoritORTE,

        })
        .then((response) => {
          this.listOfEntries = response.data;
          this.updateKey = uuidV4();
        });
    },
    },

    mounted() {
      axios
        .get("http://localhost:8080/course/").then(response => {
          this.listOfCourses = response.data;
          console.log(this.listOfCourses);
        });
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

#btn_close {
  border-radius: 13px;
  margin: 8px -2.5px 0 -2.5px;
  padding: 12px 15px;
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
  #add_btn:active {
    background-color: none;
  }



</style>
