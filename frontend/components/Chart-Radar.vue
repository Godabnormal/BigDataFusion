<script>
import { Radar } from "vue-chartjs";

export default {
  name: "ChartRadar",
  extends: Radar,
  props: {
    chartData1: {
      type: Array | Object,
      required: false,
    },
    chartData2: {
      type: Array | Object,
      required: false,
    },
    chartData3: {
      type: Array | Object,
      required: false,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem, data) {
              let dataset = data.datasets[tooltipItem.datasetIndex];
              let currentValue = dataset.data[tooltipItem.index];
              return (
                data.labels[tooltipItem.index] + " : " + currentValue + "%"
              );
            },
          },
        },
      },
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: "จำนวนวัตถุ (ร้อยละ)",
            // borderColor: '#249EBF',
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
            data: this.chartData1,
          },
          {
            label: "จำนวนยานพาหนะ (ร้อยละ)",
            // borderColor: '#249EBF',
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)",
            data: this.chartData2,
          },
          {
            label: "จำนวนบุคคล (ร้อยละ)",
            // borderColor: '#249EBF',
            fill: true,
            backgroundColor: "rgba(132, 154, 245, 0.2)",
            borderColor: "rgb(132, 154, 245,)",
            pointBackgroundColor: "rgb(132, 154, 245,)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(132, 154, 245,)",
            data: this.chartData3,
          },
        ],
      },
      this.options
    );
  },
};
</script>

<style>
</style>