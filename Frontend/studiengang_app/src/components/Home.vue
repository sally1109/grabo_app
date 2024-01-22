<template>
  <header>
    <h1 class="headline_2">Startseite</h1>
    <img src="https://cdn.discordapp.com/attachments/1186652965105303582/1198972537053392979/StudiFinder_Logo_Orange.png?ex=65c0d930&is=65ae6430&hm=0e6e4cbe9dd420ff1fefb13ab53065c5f7c8c2b06a3ce5fa7ee397f432ffb008&">
  </header>
  <div class="container_pages">
    <SearchBar @filterChanged="updateFilter" @resetFilters="filterReset" @search="search" />
    <div v-if="extractedData.length != 0" show=false>
      <ListCourse v-for="(listedCourse, index) in listOfCourses" :key="index" :listedCourse="listedCourse"
        @favoriteAdded="addFavorite" @openInfo="openInfo"></ListCourse>
    </div>
    <div v-if="searchWordRequired == true && startSearch == false" class="warning">
      Bitte suche nach einem Studiengang, um eine Liste angezeigt zu bekommen.
      Auf deine Suche wird automatisch dein angegebenes Bundesland angewendet. Das kannst du im Filter ändern.
    </div>
    <div v-if="noFilterResults == true && startSearch == false" class="warning">
      Deine Filtereinstellungen haben keine Ergebnisse ergeben. Bitte passe diese an oder suche nach einem anderen
      Studiengang.
    </div>
    <div v-if="startSearch == true && extractedData.length == 0" class="warning">
      <v-progress-circular indeterminate :size="42"></v-progress-circular>
      Deine Suchergebnisse werden geladen.
    </div>
    <DetailsCourse v-model="dialogVisible" :selectedCourse="definedCourse" @closeInfo="closeInfo" />
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
      personalData: {},
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
    defineCourse: function (course) {
      this.definedCourse = course;
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
      if (this.listOfCourses.length = !0) {
        this.listOfCourses = []
      }
      if (this.filterParams.parameter1 == null && this.filterParams.parameter2 == null && this.filterParams.parameter3 == null && this.filterParams.parameter4 == null && this.filterParams.parameter5 == null) {
        this.listOfCourses = this.extractedData
        return;
      } else {
        console.log(this.extractedData.length)
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
        this.personalData = response.data;
        this.filterParams.parameter1 = this.personalData[0].bundesland;
      })
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warning {
  padding: 10px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  color: #F74E15;
  text-align: center;
  align-items: center;
  gap: 30px;
}
</style>
