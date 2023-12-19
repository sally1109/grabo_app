<template>
  <header>
    <h3 class="headline_1">Overview</h3>
    <h1 class="headline_2">Home</h1>
    <img src="https://cdn.discordapp.com/attachments/1057666656320618587/1063508132757778512/waage_9.png">
  </header>
  <div class="container_pages">
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
    </div>
  </div>
</template>

<script>
import AddWeight from "./AddWeight.vue";
import WeightChart from "./WeightChart.vue";
import BMI from "./BMI.vue";
import CurrentWeight from "./CurrentWeight.vue";
import axios from "axios";

export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    AddWeight,
    WeightChart,
    BMI,
    CurrentWeight
  },
  data: function () {
    return {
      weightData: [],
      heightData: [],
      isweek: true,
      chartDataPrep: [],
      label: []
    };
  },
  methods: {
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
</style>
