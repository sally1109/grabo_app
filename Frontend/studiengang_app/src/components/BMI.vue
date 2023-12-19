<template>
  <div class="container" id="bmi">
    <h4>BMI</h4>
    <h2> {{ bmi }} </h2>
    <span :style="{ 'color': color }"> {{ result }} </span>
  </div>
</template>
  
<script>
export default {
  name: "BMI",
  props: {
    weight: {
      type: Object,
      required: true,
      default: {}
    },
    height: {
      type: Object,
      required: true,
      default: {}
    },
  },
  data: function () {
    return {
      result: 'result',
      bmi: 0,
      color: ''
    };
  },
  mounted: function () {
    this.calculateBmi();
  },
  updated: function () {
    this.calculateBmi();
  },
  methods: {
    calculateBmi() {
      this.bmi = Math.round((this.weight.weight / Math.pow((this.height.height), 2)) * 100) / 100
      if (this.weight.weight === '' || this.height.height === '') {
        this.result = 'No Data'
      }

      if (this.bmi <= 18.5 && this.bmi > 0) {
        this.result = 'Underweight'
        this.color = 'red'
      } else if (this.bmi >= 18.5 && this.bmi < 24.9) {
        this.result = 'Normalweight'
        this.color = 'green'
      } else if (this.bmi >= 24.9 && this.bmi < 29.9) {
        this.result = 'Overweight'
        this.color = 'orange'
      } else if (this.bmi >= 29.9) {
        this.result = 'Obesity'
        this.color = 'red'
      }
    }
  }
};
</script>

<style scoped>
#bmi {
  display: flex;
  flex-direction: column;
  height: 158px;
  width: 100%;
  padding: 20px;
}

h4 {
  font-size: 20px;
  font-weight: 600;
}

h2 {
  font-size: 30px;
  font-weight: 500;
  color: #6D60FF;
  margin-top: 22px;
  margin-bottom: -2px;
}

span {
  font-style: italic;
}
</style>