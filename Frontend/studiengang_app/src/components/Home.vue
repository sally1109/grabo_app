<template>
  <header>
    <h3 class="headline_1">Overview</h3>
    <h1 class="headline_2">Home</h1>
    <img src="https://cdn.discordapp.com/attachments/1057666656320618587/1063508132757778512/waage_9.png">
  </header>
  <div class="container_pages">
    <div>
      <Filter @filter-changed="updateFilter" @reset-filters="resetFilters" />
    </div>


    <div id="ListCourse" v-for="course in filteredCourses" :key="course.id" @click="showDetails(course)">
      <v-card>
        <v-card-title>{{ course.sfa }}</v-card-title>
        <div id="ListDetails">
          <span v-if="course.abg === '0'">ohne Angabe </span>
          <span v-else-if="course.abg === '1'">Abschlussprüfung</span>
          <span v-else-if="course.abg === '2'">Bachelor</span>
          <span v-else-if="course.abg === '3'">Diplom</span>
          <span v-else-if="course.abg === '4'">Diplom(FH)</span>
          <span v-else-if="course.abg === '10'">Master</span>
          <span v-else-if="course.abg === '12'">Staatsexamen</span>
          <span>{{ course.orte }}</span>
        </div>

      </v-card>
    </div>
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

        <v-btn @click="closeDialog">Schließen</v-btn>
      </v-card>
    </v-dialog>



    <!--
    <div id="bmi_weight">
      <CurrentWeight v-if="weightData.length > 0 && heightData.length > 0" :weightCurrent=weightData[weightData.length-1]
        :weightOld=weightData[weightData.length-2]>
      </CurrentWeight>
      <div id="space"></div>
      <BMI v-if="weightData.length > 0 && heightData.length > 0" :weight=weightData[weightData.length-1]
        :height=heightData[0]>
      </BMI>
    </div>
    <div class="container" id="weight_chart">
      <div id="chart">
        <h4>Statistics</h4>
        <div id="chart_btn">
          <button class="btn" id="btn_week" @click="isweek = true, changeDays()">7 Days</button>
          <button class="btn" id="btn_2weeks" @click="isweek = false, changeDays()">14 Days</button>
        </div>
      </div>
      <WeightChart :isweek="isweek" :label="label" :weightData="chartDataPrep">
      </WeightChart>
    </div>
    <div>
      <AddWeight @weightAdded="addWeight"> </AddWeight>
    </div>-->
  </div>
</template>

<script>

import AddWeight from "./AddWeight.vue";
import WeightChart from "./WeightChart.vue";
import BMI from "./BMI.vue";
import CurrentWeight from "./CurrentWeight.vue";
import axios from "axios";
import Filter from "./Filter.vue";



export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    AddWeight,
    WeightChart,
    BMI,
    CurrentWeight,
    Filter,

  },
  data: function () {
    return {
      weightData: [],
      heightData: [],
      isweek: true,
      chartDataPrep: [],
      label: [],

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
      }
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


      addWeight: function (e) {
        axios
          .post("http://localhost:8080/weight/", {
            weight: e.weight,
            date: e.date
          })
          .then(response => {
            this.weightData = response.data;
            this.changeDays();
          });
      },
      changeDays() {
        let self = this;
        let chartData = [];
        let labels = [];
        for (let i = this.weightData.length - (this.isweek ? 7 : 14); i <= this.weightData.length - 1; i++) {
          labels.push(this.weightData[i].date);
          chartData.push(this.weightData[i].weight);
        }
        self.chartDataPrep = chartData;
        self.label = labels;
      },
    },



    mounted() {
      axios
        .get("http://localhost:8080/weight/").then(response => {
          this.weightData = response.data;
          this.changeDays()
        });
      axios
        .get("http://localhost:8080/data/").then(response => {
          this.heightData = response.data;
        });
      axios
        .get("http://localhost:8080/course/").then(response => {
          this.listOfCourses = response.data;
        });
    },
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bmi_weight {
  display: flex;
  flex-direction: row;
}

#space {
  margin-left: 28px;
}

#weight_chart {
  padding: 20px;
}

h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 45px;
  margin-left: -1px;
}

#chart {
  display: flex;
  flex-direction: row;
}

#chart_btn {
  position: absolute;
  right: 0;
  margin-right: 48px;
}

#btn_week {
  font-size: 16px;
  background-color: #A3A5B5;
  border-radius: 10px 0 0 10px;
  padding: 6px 12px;
}

#btn_2weeks {
  font-size: 16px;
  background-color: #A3A5B5;
  border-radius: 0 10px 10px 0;
  padding: 6px 12px;
}

#btn_2weeks:focus,
#btn_week:focus {
  background-color: #6D60FF;
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
</style>
