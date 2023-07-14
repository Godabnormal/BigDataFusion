<script>
import { Doughnut } from "vue-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels'


export default {
  name: "Chart",
  extends: Doughnut,
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
              "#FF6D59",
              "#7CF3A0",
              "#FCE168",
              "#FFAEBC",
              "#887BB0",
              "#EC8FD0"
            ],
            data: this.chartData,
          },
        ],
      },
      this.options
      )
    }
  }
  
};
</script>

<style>
</style>