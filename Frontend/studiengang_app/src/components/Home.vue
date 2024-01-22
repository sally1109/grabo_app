<template>
  <header>
    <h1 class="headline_2">Startseite</h1>
    <!-- <img src=> TODO Logo-->
  </header>
  <div class="container_pages">
  <SearchBar @filterChanged="updateFilter" @reset-filters="resetFilters" @search="search" />
  <showData v-if="extractedData.length != 0" show = false >
    <ListCourse v-for="(listedCourse, index) in listOfCourses" :key="index" :listedCourse="listedCourse" @favoriteAdded="addFavorite" @openInfo="openInfo"></ListCourse>
  </showData>
    <div v-if="searchWordRequired == true && startSearch == false" class="warning"> 
      Bitte suche nach einem Studiengang, um eine Liste angezeigt zu bekommen. 
      Auf deine Suche wird automatisch dein angegebenes Bundesland angewendet. Das kannst du im Filter ändern.
    </div>
    <div v-if="noFilterResults == true" class="warning"> 
      Deine Filtereinstellungen haben keine Ergebnisse ergeben. Bitte passe diese an oder suche nach einem anderen Studiengang.
    </div>
    <div v-if="startSearch == true && extractedData.length == 0" class="warning"> 
      <v-progress-circular indeterminate :size="42"></v-progress-circular>
      Deine Suchergebnisse werden geladen.
    </div>
  <DetailsCourse v-model="dialogVisible" :selectedCourse="definedCourse" @closeDialog="closeDialog"/>
</div>
</template>

<script>

import axios from "axios";
import SearchBar from "./SearchBar.vue";
import DetailsCourse from "./DetailsCourse.vue";
import ListCourse from "./ListCourse.vue";


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
      daten: {},
      extractedData: [],
      searchWordRequired: true,
      filteredArray: [],
      noFilterResults: false,
      startSearch: false,

      filterParams: {
        parameter1: null,
        parameter2: null,
        parameter3: null,
        parameter4: null,
        parameter5: null,
        parameter6: null,
      },
    };
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
        console.log("Filter", this.filterParams)
        this.checkFilter()
      },

      resetFilters() {
        console.log('resetFilters wurde aufgerufen');
        this.filterParams.parameter1 = null;
        this.filterParams.parameter2 = null;
        this.filterParams.parameter3 = null;
        this.filterParams.parameter4 = null;
        this.filterParams.parameter5 = null;
        this.checkFilter()
      },
      handleButtonClick(course) { 
        this.addEntry;
        this.defineCourse(course);
      },

      search : function (e){
        if (e.searchWord == null || e.searchWord == '' ) {
          console.log("kein Suchwort")
          this.extractedData = [];
          this.startSearch = false;
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
            // Filterparameter werden gecheckt
              this.checkFilter();
            })
        }
      },

    checkFilter() {
      console.log(this.extractedData)
      if (this.listOfCourses.length =! 0) {
        this.listOfCourses = []
        console.log("leeren", this.listOfCourses)
      }
      console.log(this.filterParams)
      if (this.filterParams.parameter1 == null && this.filterParams.parameter2 == null && this.filterParams.parameter3 == null && this.filterParams.parameter4 == null && this.filterParams.parameter5 == null) {
        console.log("kein Filter")
        this.listOfCourses = this.extractedData
        return;
      } else {
        console.log(this.extractedData.length)
        for(let i = 0; i < this.extractedData.length; i++){
          const filter_bundesland = this.filterParams.parameter1 == null || this.filterParams.parameter1 === this.extractedData[i].data.region.Key;
          const filter_abschlussgrad = this.filterParams.parameter2 == null || this.filterParams.parameter2 == this.extractedData[i].data.abschlussgrad.id;
          const filter_studienform = this.filterParams.parameter3 == null || this.filterParams.parameter3 == this.extractedData[i].data.studienform.id;
          const filter_studientyp = this.filterParams.parameter4 == null || this.filterParams.parameter4 == this.extractedData[i].data.studientyp.id;
          const filter_hochschulart = this.filterParams.parameter5 == null || this.filterParams.parameter5 == this.extractedData[i].data.hochschulart.id;
          
          if (filter_bundesland && filter_abschlussgrad && filter_studienform && filter_studientyp && filter_hochschulart) {
            this.listOfCourses.push(this.extractedData[i])
          }
        }
        if (this.listOfCourses.length == 0){
          this.noFilterResults = true
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
    

  mounted() {
    axios
    .get("http://localhost:8080/data").then(response => {
      this.daten = response.data;
      this.filterParams.parameter1 = this.daten[0].bundesland; 
    })
  }
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

.warning{
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: #F74E15;
  text-align: center;
  align-items: center;
  gap: 30px;
}
</style>
