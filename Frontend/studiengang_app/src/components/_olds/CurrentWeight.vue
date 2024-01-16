<template>
  <div class="container" id="weight">
    <h4>Weight</h4>
    <h2 @click="calculateWeightLoss"> {{ weightCurrent.weight }} kg</h2>
    <span :style="{ 'color': color }"> {{ result }} kg</span>
  </div>
</template>
  
<script>
export default {
  name: "BMI",
  props: {
    weightCurrent: {
      type: Object,
      required: true,
      default: {}
    },
    weightOld: {
      type: Object,
      required: true,
      default: {}
    },
  },
  data: function () {
    return {
      result: 'result',
      weightLoss: 0,
      color: ''
    };
  },
  mounted: function () {
    this.calculateWeightLoss();
  },
  updated: function () {
    this.calculateWeightLoss();
  },
  methods: {
    calculateWeightLoss() {
      this.weightLoss = this.weightCurrent.weight - this.weightOld.weight
      if (this.weightCurrent.weight === '' || this.weightOld.weight === '') {
        this.result = 'No Data'
      }
      if (this.weightLoss <= 0) {
        this.color = 'green',
          this.result = this.weightLoss.toFixed(1)
      } else if (this.weightLoss > 0) {
        this.color = 'red'
        this.result = '+' + this.weightLoss.toFixed(1)
      }
    }
  }
};
</script>

<style scoped>
#weight {
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