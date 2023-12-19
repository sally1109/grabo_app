<template>
  <div>
    <Line :data="chartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'WeightChart',
  components: { Line },
  props: {
    label: {
      type: Array,
      required: true,
      default: []
    },
    isweek: {
      type: Boolean,
      required: true,
      default: true
    },
    weightData: {
      type: Array,
      required: true,
      default: []
    },
  },
  data() {
    return {
      chartData: {
        labels: this.label,
        datasets: [{
          data: [...this.weightData],
          borderColor: '#6D60FF'
        }]
      },
      label: `${this.isweek ? '7 Days' : '14 Days'}`,
    }
  },
  mounted() {
    this.updateChart();
  },
  updated() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      this.chartData = {
        labels: this.label,
        datasets: [{
          data: [...this.weightData],
          label: `${this.isweek ? '7 Days' : '14 Days'}`,
          borderColor: '#6D60FF',
          pointStyle: 'circle',
          pointRadius: 5
        }]
      };
    }
  }
};
</script>

