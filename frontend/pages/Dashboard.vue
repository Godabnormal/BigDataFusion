<template>
  <div class="template">
    <Header></Header>
    <div class="container">
      <div class="title-container">
        <b-row>
          <img class="image" src="../assets/dashboard-icon.png" />
          <h4 style="margin-top: 0.5vw">แผนภูมิ</h4>
          <h4 style="margin-left: 1vw; margin-top: 0.5vw">
            สถานะ: {{ status }} ข้อมูลตั้งแต่วันที่ {{ date_from }} ถึง
            {{ date_until }}
          </h4>
        </b-row>
      </div>
      <div style="margin-top: 1vw">
        <SearchBoxChart
          @loadingdata="loadingdata($event)"
          @updatedata="updateChartdata($event)"
        ></SearchBoxChart>
      </div>
      <div class="chart-container">
        <b-row class="justify-content-md-center">
          <b-col lg="6">
            <b-card tag="article" class="card-chart-bottom-nopointer">
              <div class="chart4">
                <h4>สถิติรวมแบ่งตามช่วงเวลา</h4>
                <h7
                  v-if="loaded4 == true && counts_4.length || counts_5.length || counts_6.length"
                  style="color: grey"
                  >*หมายเหตุ : ข้อมูลจำนวนสถิติรวมในแต่ละช่วงเวลาเป็นหน่วย
                  ร้อยละ</h7
                >
                <template class="loading" v-if="loaded4 == false">
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template
                  class="nodata"
                  v-else-if="
                    loaded4 == true && !counts_4.length && !counts_5.length && !counts_6.length"
                >
                  <div
                    class="text-center text-danger my-2"
                    style="padding-top: 1.5vw"
                  >
                    <strong>ไม่พบข้อมูล</strong>
                  </div>
                </template>
                <ChartRadar
                  v-else-if="
                    loaded4 == true && counts_4.length || counts_5.length || counts_6.length"
                  :chart-data1="counts_4"
                  :chart-data2="counts_5"
                  :chart-data3="counts_6"
                  :chart-labels="labels_4"
                ></ChartRadar>
              </div>
            </b-card>
          </b-col>
          <b-col lg="6">
            <b-card tag="article" class="card-chart-bottom-nopointer">
              <div class="chart4">
                <h4>สถิติรวมแบ่งตามสถานะ</h4>
                <h7
                  v-if="loaded7 == true && counts_7.length && labels_7.length"
                  style="color: grey"
                  >*หมายเหตุ : ข้อมูลจำนวนสถิติรวมในแต่ละสถานะเป็นหน่วย ร้อยละ
                </h7>
                <template class="loading" v-if="loaded7 == false">
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template
                  class="nodata"
                  v-else-if="
                    loaded7 == true && !counts_7.length && !labels_7.length
                  "
                >
                  <div
                    class="text-center text-danger my-2"
                    style="padding-top: 1.5vw"
                  >
                    <strong>ไม่พบข้อมูล</strong>
                  </div>
                </template>
                <Chart
                  v-else-if="
                    loaded7 == true && counts_7.length && labels_7.length
                  "
                  :chart-data="counts_7"
                  :chart-labels="labels_7"
                  :options="options4"
                ></Chart>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col>
            <b-card tag="article" class="card-chart" @click="objectpage()">
              <div class="chart1">
                <h4>จำนวนวัตถุแบ่งตามประเภทของวัตถุ</h4>
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
                  <div
                    class="text-center text-danger my-2"
                    style="padding-top: 1.5vw"
                  >
                    <strong>ไม่พบข้อมูล</strong>
                  </div>
                </template>
                <BChart
                  v-else-if="
                    loaded1 == true && counts_1.length && labels_1.length
                  "
                  :chart-data="counts_1"
                  :chart-labels="labels_1"
                  :options="options1"
                ></BChart>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col lg="6">
            <b-card tag="article" class="card-chart" @click="vehiclepage()">
              <div class="chart2">
                <h4>จำนวนยานพาหนะแบ่งตามประเภทของยานพาหนะ</h4>
                <template class="loading" v-if="loaded2 == false">
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template
                  class="nodata"
                  v-else-if="
                    loaded1 == true && !counts_2.length && !labels_2.length
                  "
                >
                  <div
                    class="text-center text-danger my-2"
                    style="padding-top: 1.5vw"
                  >
                    <strong>ไม่พบข้อมูล</strong>
                  </div>
                </template>
                <Chart
                  v-else-if="
                    loaded1 == true && counts_2.length && labels_2.length
                  "
                  :chart-data="counts_2"
                  :chart-labels="labels_2"
                  :options="options2"
                ></Chart>
              </div>
            </b-card>
          </b-col>
          <b-col lg="6">
            <b-card
              tag="article"
              class="card-chart-bottom"
              @click="personpage()"
            >
              <div class="chart3">
                <h4>จำนวนบุคคลแบ่งตามช่วงเวลา</h4>
                <template class="loading" v-if="loaded3 == false">
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
                <template
                  class="nodata"
                  v-else-if="
                    loaded1 == true && !counts_3.length && !labels_3.length
                  "
                >
                  <div
                    class="text-center text-danger my-2"
                    style="padding-top: 1.5vw"
                  >
                    <strong>ไม่พบข้อมูล</strong>
                  </div>
                </template>
                <Chart
                  v-else-if="
                    loaded1 == true && counts_3.length && labels_3.length
                  "
                  :chart-data="counts_3"
                  :chart-labels="labels_3"
                  :options="options3"
                ></Chart>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Chart from "../components/Chart-Doughnut.vue";
import ChartRadar from "../components/Chart-Radar.vue";
import BChart from "../components/Chart-Bar.vue";
import SearchBoxChart from "../components/ChartDashboardSearch.vue";
import moment from "moment";

export default {
  components: {
    Header,
    Chart,
    BChart,
    ChartRadar,
    SearchBoxChart,
  },
  middleware: "authen",
  name: "Dashboard",
  data() {
    return {
      title: "Dashboard",
      loaded1: false,
      loaded2: false,
      loaded3: false,
      loaded4: false,
      loaded7: false,
      date_from: "",
      date_until: "",
      status: "",
      counts_1: [],
      labels_1: [],
      counts_2: [],
      labels_2: [],
      counts_3: [],
      labels_3: [],

      labels_4: [],
      counts_4: [],
      counts_5: [],
      counts_6: [],

      counts_7: [],
      labels_7: [],

      options1: {
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
                labelString: "จำนวน (ชิ้น)",
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
                labelString: "ชื่อวัตถุ",
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
              return value + " ชิ้น";
            },
            font: {
              weight: "bold",
              size: 20,
            },
            anchor: "end",
            align: "bottom",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              return (
                tooltipItems.xLabel + " : " + tooltipItems.yLabel + " ชิ้น"
              );
            },
          },
        },
      },
      options2: {
        legend: {
          display: true,
        },
        plugins: {
          datalabels: {
            color: "#2c3e50",
            font: {
              weight: "bold",
              size: 20,
            },
            anchor: "end",
            align: "bottom",
          },
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
      options3: {
        legend: {
          display: true,
        },
        plugins: {
          datalabels: {
            color: "#2c3e50",
            formatter: function (value) {
              return value + " คน";
            },
            font: {
              weight: "bold",
              size: 20,
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
                data.labels[tooltipItem.index] + " : " + currentValue + " คน"
              );
            },
          },
        },
      },
      options4: {
        legend: {
          display: true,
        },
        plugins: {
          datalabels: {
            color: "#2c3e50",
            formatter: function (value) {
              return value + "%";
            },
            font: {
              weight: "bold",
              size: 20,
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
                data.labels[tooltipItem.index] + " : " + currentValue + "%"
              );
            },
          },
        },
      },
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    getlabel() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/gettimelabel")
        .then((res) => {
          this.labels_4 = res.labeldata.map((item) => item.time);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getChartData() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getdashboardchartdata")
        .then((res) => {
          this.counts_1 = res.chartdata_name.map((item) => item.sum_object);
          this.labels_1 = res.chartdata_name.map((item) => item.name);
          this.loaded1 = true;

          this.counts_2 = res.chartdata_type.map((item) => item.sum_vehicle);
          this.labels_2 = res.chartdata_type.map((item) => item.vehicle_type);
          this.loaded2 = true;

          this.counts_3 = res.chartdata_time.map((item) => item.sum_person);
          this.labels_3 = res.chartdata_time.map((item) => item.time);
          this.loaded3 = true;

          this.counts_4 = res.radarchartdata_obj.map((item) => item.sum_object);
          this.counts_5 = res.radarchartdata_veh.map(
            (item) => item.sum_vehicle
          );
          this.counts_6 = res.radarchartdata_per.map((item) => item.sum_person);
          this.loaded4 = true;

          this.counts_7 = res.piechartdata.map((item) => item.sum_all);
          this.labels_7 = res.piechartdata.map((item) => item.status);
          this.loaded7 = true;

          this.date_from = moment(res.date_from).add(543, "year").format("ll");
          this.date_until = moment(res.date_until)
            .add(543, "year")
            .format("ll");
          this.status = res.status;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    objectpage() {
      this.$router.push("/object");
    },
    vehiclepage() {
      this.$router.push("/vehicle");
    },
    personpage() {
      this.$router.push("/person");
    },
    loadingdata([loaded1, loaded2, loaded3, loaded4, loaded7]) {
      this.loaded1 = loaded1;
      this.loaded2 = loaded2;
      this.loaded3 = loaded3;
      this.loaded4 = loaded4;
      this.loaded7 = loaded7;
    },
    getroute() {
      let path = this.$route.fullPath;
      this.$store.dispatch("route", { path })
        .then(() => console.log('success'))
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
      counts_5,
      counts_6,
      loaded4,
      counts_7,
      labels_7,
      loaded7,
      newdate_from,
      newdate_until,
      newdata_status,
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
      this.counts_5 = counts_5;
      this.counts_6 = counts_6;
      this.loaded4 = loaded4;

      this.counts_7 = counts_7;
      this.labels_7 = labels_7;
      this.loaded7 = loaded7;

      this.status = newdata_status;

      this.date_from = moment(newdate_from).add(543, "year").format("ll");
      this.date_until = moment(newdate_until).add(543, "year").format("ll");
    },
  },
  created() {
    this.getlabel();
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
}

/* .title-container {
  display: flex;
  height: 2.4vw;
} */
.title-container h4 {
  padding-top: 0vw;
}
.image {
  width: 2.5vw;
  margin-right: 0.5vw;
}
.container {
  text-align: center;
  margin-top: 0vw;
  margin-left: 0vw;
  padding-bottom: 1vw;
  background-color: white;
  padding: 1.5em;
  width: 79vw;
  box-sizing: border-box;
  min-height: 87vh;
  max-height: 87vh;
  border-radius: 0.5vw;
  overflow-y: scroll;
}

.chart-container {
  margin-top: 1vw;
}

.card-chart {
  margin-top: 0.5vw;
  cursor: pointer;
}

.card-chart-bottom {
  margin-top: 0.5vw;
  cursor: pointer;
}

.card-chart-bottom-nopointer {
  margin-top: 0.5vw;
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
