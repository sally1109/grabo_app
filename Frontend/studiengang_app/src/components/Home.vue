<template>
  <header>
    <h1 class="headline_2">Startseite</h1>
    <!-- <img src=> TODO Logo-->
  </header>
  <div class="container_pages">
  <SearchBar @filter-changed="updateFilter" @reset-filters="resetFilters" @search="search" />
  <showData v-if="show && extractedData.length != 0" show = false >
    <ListCourse v-for="(listedCourse, index) in extractedData" :key="index" :listedCourse="listedCourse" @favoriteAdded="addFavorite" @openInfo="openInfo"></ListCourse>
  </showData>
    <div v-else id="warning">
      <v-title> Bitte suche nach einem Studiengang, um eine Liste angezeigt zu bekommen. Auf deine Suche wird automatisch dein angegebenes Bundesland angewendet. Das kannst du im Filter ändern. </v-title>
    </div>
  <DetailsCourse v-model="dialogVisible" :selectedCourse="definedCourse" @closeDialog="closeDialog"/>
</div>
</template>

<script>

import axios from "axios";
import SearchBar from "./SearchBar.vue";
import DetailsCourse from "./DetailsCourse.vue";
import ListCourse from "./ListCourse.vue"


export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    SearchBar,
    DetailsCourse,
    ListCourse,
  },
  data: function () {
    return {
      dialogVisible: false,
      definedCourse: [],
      listOfCourses: [],
      favoritRE : '',
      favoritORTE : '',
      daten: {},
      dkzIds: [],
      extractedData: [],
      show:false,

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
        this.definedCourse = course;
      },

      openInfo(e) {
        this.dialogVisible = true;
        this.definedCourse = e.data;
      },

      closeDialog(){
        this.dialogVisible = false;
      },


      updateFilter(newFilterParams) {
        this.filterParams = newFilterParams;
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
      handleButtonClick(course) { 
        this.addEntry;
        this.defineCourse(course);
      },
      search : function (e){
      axios.get("http://localhost:8080/search", {
        params: {
          searchWord: e.searchWord,
        }
      }).then(response => {
          console.log('Server response:', response.data.extractedData);
          this.show = true;
          this.extractedData = response.data.extractedData;
        })
    },

    addFavorite: function (e) {
      axios
        .post("http://localhost:8080/favorites/", {
          data: e.data
        })
        .then((response) => {
          console.log(response.data)
        });
    }
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

#warning{
  padding: 10px;
  display: flex;
  color: #F74E15;
  text-align: center;
}
</style>
