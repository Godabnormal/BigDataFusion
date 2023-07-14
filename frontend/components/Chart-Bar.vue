<script>
import { Bar } from "vue-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels'

export default {
  name: "Chart",
  extends: Bar,
  props: [
    'chartData',
    'chartLabels',
    'options'
  ],
  mounted() {
    this.render();
  },
  watch: {
    'chartData' (to,from) {
      this.render()
    }
  },
  methods: {
    render() {
      this.addPlugin(ChartDataLabels);
      this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: "จำนวน",
            // borderColor: '#249EBF',
            borderWidth: 1,
            backgroundColor: [
              "#C26DBC",
              "#E56997",
              "#66D2D6",
              "#3CACAE",
              "#EEB5EB",
              "rgb(255, 205, 86)",
              "rgb(54, 66, 185)",
              "#B4FEE7"
            ],
            data: this.chartData,
          },
        ],
      },
      this.options
      )
    }
  },
};
</script>

<style>
</style>