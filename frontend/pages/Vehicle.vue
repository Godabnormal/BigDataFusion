<template>
  <div class="template">
    <div class="header">
      <Header></Header>
    </div>
    <div class="sidebar-menu">
      <Sidebar></Sidebar>
    </div>
    <div class="container">
      <div class="title-container">
        <b-row>
        <img class="image" src="../assets/dashboard-icon.png" />
        <h4>แผนภูมิ : ยานพาหนะ</h4>
        <h4 style="margin-left: 1vw">
          สถานะ: {{ data_status }} ข้อมูลตั้งแต่วันที่ {{ date_from }} ถึง
          {{ date_until }}
        </h4>
        </b-row>
      </div>
      <div class="search-box">
        <SearchBoxChart @loadingdata="loadingdata($event)" @updatedata="updateChartdata($event)"></SearchBoxChart>
      </div>
      <div class="chart-container">
        <div class="chart-container-top">
          <b-row class="justify-content-md-center">
            <div class="chart1">
              <h5 style="text-align: center">
                จำนวนยานพาหนะ<br>แบ่งตามประเภทยานพาหนะ
              </h5>
              <template class="loading" v-if="loaded1 == false">
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template
                class="nodata"
                v-else-if="
                  loaded1 == true && !counts_1.length && !labels_1.length
                "
              >
                <div class="text-center text-danger my-2">
                  <strong>ไม่พบข้อมูล</strong>
                </div>
              </template>
              <Chart
                v-else-if="
                  loaded1 == true && counts_1.length && labels_1.length
                "
                :width="350"
                :height="350"
                :chart-data="counts_1"
                :chart-labels="labels_1"
                :options="options_donut"
              ></Chart>
            </div>
            <div class="chart2">
              <h5 style="text-align: center">จำนวนยานพาหนะแบ่งตามช่วงเวลา</h5>
              <template class="loading" v-if="loaded2 == false">
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template
                class="nodata"
                v-else-if="
                  loaded2 == true && !counts_2.length && !labels_2.length
                "
              >
                <div class="text-center text-danger my-2">
                  <strong>ไม่พบข้อมูล</strong>
                </div>
              </template>
              <Chart
                v-else-if="
                  loaded2 == true && counts_2.length && labels_2.length
                "
                :width="350"
                :height="350"
                :chart-data="counts_2"
                :chart-labels="labels_2"
                :options="options_donut"
              ></Chart>
            </div>
            <div class="chart3">
              <h5 style="text-align: center">จำนวนยานพาหนะแบ่งตามสถานะ</h5>
              <template class="loading" v-if="loaded3 == false">
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template
                class="nodata"
                v-else-if="
                  loaded3 == true && !counts_3.length && !labels_3.length
                "
              >
                <div class="text-center text-danger my-2">
                  <strong>ไม่พบข้อมูล</strong>
                </div>
              </template>
              <Chart
                v-else-if="
                  loaded3 == true && counts_3.length && labels_3.length
                "
                :width="350"
                :height="350"
                :chart-data="counts_3"
                :chart-labels="labels_3"
                :options="options_donut"
              ></Chart>
            </div>
          </b-row>
        </div>
        <div class="chart-container-bottom">
          <div class="chart4">
            <h5 style="text-align: center">จำนวนยานพาหนะแบ่งตามสถานที่</h5>
            <template class="loading" v-if="loaded4 == false">
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template
              class="nodata"
              v-else-if="
                loaded4 == true && !counts_4.length && !labels_4.length
              "
            >
              <div class="text-center text-danger my-2">
                <strong>ไม่พบข้อมูล</strong>
              </div>
            </template>
            <BChart
              v-else-if="loaded4 == true && counts_4.length && labels_4.length"
              :width="350"
              :height="350"
              :chart-data="counts_4"
              :chart-labels="labels_4"
              :options="options_bar"
            ></BChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

import Chart from "../components/Chart-Doughnut.vue";
import BChart from "../components/Chart-Bar.vue";
import SearchBoxChart from "../components/ChartVehicleSearch.vue";
import moment from "moment";
export default {
  components: {
    Header,

    Chart,
    BChart,
    SearchBoxChart,
  },
  name: "Vehicle",
  middleware: "authen",
  data() {
    return {
      title: "Vehicle",
      loaded1: false,
      loaded2: false,
      loaded3: false,
      loaded4: false,
      counts_1: [],
      labels_1: [],
      counts_2: [],
      labels_2: [],
      counts_3: [],
      labels_3: [],
      counts_4: [],
      labels_4: [],
      data_status: "",

      options_donut: {
        legend: {
          display: true,
        },
        plugins: {
          datalabels: {
            color: "#2c3e50",
            formatter: function (value) {
              return value + " คัน";
            },
            font: {
              weight: "bold",
              size: 16,
            },
            anchor: "center",
            align: "center",
          },
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
                data.labels[tooltipItem.index] + " : " + currentValue + " คัน"
              );
            },
          },
        },
      },

      options_bar: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
              scaleLabel: {
                display: true,
                labelString: "จำนวน (คัน)",
                fontSize: 18,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: "สถานที่",
                fontSize: 18,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        plugins: {
          datalabels: {
            color: "#2c3e50",
            formatter: function (value) {
              return value + " คัน";
            },
            font: {
              weight: "bold",
              size: 20,
            },
            anchor: "end",
            align: "bottom",
          },
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              return tooltipItems.xLabel + " : " + tooltipItems.yLabel + " คัน";
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    getroute() {
      let path = this.$route.fullPath;
      this.$store.dispatch("route", { path })
        .then(() => console.log('success'))
    },
    getChartData() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getchartdata/vehicle")
        .then((res) => {
          this.counts_1 = res.chartdata_type.map((item) => item.sum_vehicle);
          this.labels_1 = res.chartdata_type.map((item) => item.vehicle_type);
          this.loaded1 = true;

          this.counts_2 = res.chartdata_time.map((item) => item.sum_vehicle);
          this.labels_2 = res.chartdata_time.map((item) => item.time);
          this.loaded2 = true;

          this.counts_3 = res.chartdata_status.map((item) => item.sum_vehicle);
          this.labels_3 = res.chartdata_status.map((item) => item.status);
          this.loaded3 = true;

          this.counts_4 = res.chartdata_location.map(
            (item) => item.sum_vehicle
          );
          this.labels_4 = res.chartdata_location.map((item) => item.location);
          this.loaded4 = true;

          this.date_from = moment(res.date_from).add(543, 'year').format('ll')
          this.date_until = moment(res.date_until).add(543, 'year').format('ll')

          this.data_status = res.status;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadingdata([loaded1,loaded2,loaded3,loaded4]){
      this.loaded1 = loaded1;
      this.loaded2 = loaded2;
      this.loaded3 = loaded3;
      this.loaded4 = loaded4;
    },
    updateChartdata([
      counts_1,
      labels_1,
      loaded1,
      counts_2,
      labels_2,
      loaded2,
      counts_3,
      labels_3,
      loaded3,
      counts_4,
      labels_4,
      loaded4,
      newdate_from,
      newdate_until,
      data_status,
    ]) {
      this.counts_1 = counts_1;
      this.labels_1 = labels_1;
      this.loaded1 = loaded1;

      this.counts_2 = counts_2;
      this.labels_2 = labels_2;
      this.loaded2 = loaded2;

      this.counts_3 = counts_3;
      this.labels_3 = labels_3;
      this.loaded3 = loaded3;

      this.counts_4 = counts_4;
      this.labels_4 = labels_4;
      this.loaded4 = loaded4;

      this.date_from = moment(newdate_from).add(543, 'year').format('ll')
      this.date_until = moment(newdate_until).add(543, 'year').format('ll')

      this.data_status = data_status;
    },
  },
  created() {
    this.getChartData();
    this.getroute();
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* CSS for component */
.template {
  background-color: grey;
  padding-bottom: 1vw;
}

.title-container {
  margin-bottom: 0.5vw;
}
.title-container h4 {
  padding-top: 0.2vw;
}
.image {
  width: 2vw;
  height: 1.5vw;
  margin-right: 0.5vw;
}
.container {
  /* text-align: center; */
  margin-top: 0vw;
  margin-left: 0vw;
  padding-bottom: 1vw;
  background-color: white;
  padding: 1.5em;
  width: 79vw;
  box-sizing: border-box;
  min-height: 87vh;
  max-height: 200vh;
  border-radius: 0.5vw;
}

.chart-container {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 50vh;
  max-width: 170vh;
  margin-top: 0.2vw;
  margin-left: 1vw;
}

.chart-container-top {
  margin-top: 1vw;
}

.chart-container-bottom {
  margin-top: 3vw;
  min-width: 70vw;
  max-width: 70vw;
  max-height: 79vh;
}

.chart1 {
  margin-top: 0.1vw;
  max-height: 60vw;
  min-width: 22vw;
  margin-right: 1vw;
}
.chart2 {
  margin-top: 0.1vw;
  max-height: 60vw;
  min-width: 22vw;
  margin-left: 1vw;
  margin-right: 1vw;
}
.chart3 {
  margin-top: 0.1vw;
  max-height: 60vw;
  min-width: 22vw;
  margin-left: 1vw;
}
.chart4 {
  margin-top: 0.1vw;
  max-height: 72vh;
  margin-left: 5vw;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  margin-bottom: 10px;
}
</style>
