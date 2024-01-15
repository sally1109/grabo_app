<template>
  <header>
    <h3 class="headline_1">Overview</h3>
    <h1 class="headline_2">Home</h1>
    <!-- <img src=> TODO Logo-->
  </header>
  <div class="container_pages">
    <Filter @filter-changed="updateFilter" @reset-filters="resetFilters" />
    <v-card class="container" id="ListHome" v-for="course in filteredCourses" :key="course.id">
      <div id="div_name">
        <v-card-title @click="showDetails(course)"> {{ course.sfa }} </v-card-title>
        <v-card-action> 
          <v-btn class="btn" id="add_btn" density="comfortable" variant="text" @click="addRemoveFavorite">
            <v-icon size="x-large"> {{ isClicked ? 'mdi-star' : 'mdi-star-outline' }} </v-icon>
          </v-btn>
        </v-card-action>
      </div>
      <div id="div_infos" @click="showDetails(course)">
        <v-icon icon="mdi-map-marker" size="small" ></v-icon>
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
  <v-dialog v-model="dialogVisible">
    <v-card>
      <v-card-title> {{ selectedCourse.sfa }}</v-card-title>
      <span>Studienfeld: {{ selectedCourse.sfe }}</span>
      <span>{{ selectedCourse.orte }}</span>

        <span v-if="selectedCourse.re === 'BW'">Baden-Württemberg</span>
        <span v-else-if="selectedCourse.re === 'BY'">Bayern</span>
        <span v-else-if="selectedCourse.re === 'BE'">Berlin</span>
        <span v-else-if="selectedCourse.re === 'BB'">Brandenburg</span>
        <span v-else-if="selectedCourse.re === 'HB'">Bremen</span>
        <span v-else-if="selectedCourse.re === 'HH'">Hamburg</span>
        <span v-else-if="selectedCourse.re === 'HE'">Hessen</span>
        <span v-else-if="selectedCourse.re === 'MV'">Mecklenburg-Vorpommern</span>
        <span v-else-if="selectedCourse.re === 'NI'">Niedersachsen</span>
        <span v-else-if="selectedCourse.re === 'NW'">Nordrhei-Westfalen</span>
        <span v-else-if="selectedCourse.re === 'RP'">Rheinland-Pfalz</span>
        <span v-else-if="selectedCourse.re === 'SL'">Saarland</span>
        <span v-else-if="selectedCourse.re === 'SN'">Sachsen</span>
        <span v-else-if="selectedCourse.re === 'ST'">Sachsen-Anhalt</span>
        <span v-else-if="selectedCourse.re === 'SH'">Schleswig-Holstein</span>
        <span v-else-if="selectedCourse.re === 'TH'">Thüringen</span>
        <span v-else-if="selectedCourse.re === 'iA'">Österreich</span>

        <span v-if="selectedCourse.sfo === '0'">Auf Anfrage</span>
        <span v-else-if="selectedCourse.sfo === '1'">Vollzeitstudium</span>
        <span v-else-if="selectedCourse.sfo === '2'">Teilzeitstudium</span>
        <span v-else-if="selectedCourse.sfo === '3'">Wochenendveranstaltung</span>
        <span v-else-if="selectedCourse.sfo === '4'">Fernstudium</span>
        <span v-else-if="selectedCourse.sfo === '5'">Selbststudium</span>
        <span v-else-if="selectedCourse.sfo === '6'">Blockstudium</span>

        <span v-if="selectedCourse.st === '0'">Studiengang grundständig</span>
        <span v-else-if="selectedCourse.st === '1'">Studiengang weiterführend</span>

        <span v-if="selectedCourse.smo === '1'">ausbildungsintegrierend</span>
        <span v-else-if="selectedCourse.smo === '2'">berufsintegrierend</span>
        <span v-else-if="selectedCourse.smo === '3'">berufsbegleitend</span>
        <span v-else-if="selectedCourse.smo === '4'">praxisintegrierend</span>
        <span v-else-if="selectedCourse.smo === '5'">Duales Studium allgemein</span>

        <span v-if="selectedCourse.abg === '0'">ohne Angabe</span>
        <span v-else-if="selectedCourse.abg === '1'">Abschlussprüfung</span>
        <span v-else-if="selectedCourse.abg === '2'">Bachelor</span>
        <span v-else-if="selectedCourse.abg === '3'">Diplom</span>
        <span v-else-if="selectedCourse.abg === '4'">Diplom(FH)</span>
        <span v-else-if="selectedCourse.abg === '10'">Master</span>
        <span v-else-if="selectedCourse.abg === '12'">Staatsexamen</span>

        <span v-if="selectedCourse.hsa === '101'">Berufsakademie/Duale Hochschule</span>
        <span v-else-if="selectedCourse.hsa === '106'">FH/FAW</span>
        <span v-else-if="selectedCourse.hsa === '107'">Kunst- und Musikhochschule</span>
        <span v-else-if="selectedCourse.hsa === '108'">Universität</span>
        <span v-else-if="selectedCourse.hsa === '113'">Private Hochschule</span>
        <span v-else-if="selectedCourse.hsa === '114'">Hochschule eigenen Typs</span>

        <button class="btn" id="btn_close" @click="closeDialog">Schließen</button>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from "axios";
import Filter from "./Filter.vue";



export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    Filter
  },
  data: function () {
    return {
      dialogVisible: false,
      selectedCourse: {},
      listOfCourses: [],

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
      showDetails(course) {
        this.selectedCourse = course;
        this.dialogVisible = true;
      },
      closeDialog() {
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
      }
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
