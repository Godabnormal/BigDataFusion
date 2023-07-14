<template>
  <div class="template">
    <div class="header">
      <Header></Header>
    </div>
    <div class="container">
      <div class="title-container">
        <b-row>
        <img class="image" src="../assets/report-icon.png" />
        <h4>รายงาน : ยานพาหนะ</h4>
        <h4 style="margin-left: 1vw">
          สถานะ: {{ status }} ข้อมูลตั้งแต่วันที่ {{ date_from }} ถึง
          {{ date_until }}
        </h4>
        </b-row>
      </div>
      <div>
        <SearchBoxVehicle
          @loadingdata="loadingdata($event)"
          @updatedata="updateTabledata($event)"
        ></SearchBoxVehicle>
      </div>
      <div style="margin-top: 1vw; margin-bottom: 1vw">
        <b-row align-h="end">
          <b-col cols="2">
            <Downloadexcel
              class="btn btn-success"
              :data="tabledata"
              :fields="export_field"
              worksheet="รายงานยานพาหนะ"
              :header="
                'รายงาน : ยานพาหนะ สถานะ: ' +
                status +
                ' ข้อมูลตั้งแต่วันที่ ' +
                date_from +
                ' ถึง ' +
                date_until
              "
              :name="'รายงานสถิติของยานพาหนะ ' + date_from + ' - ' + date_until + '.xls'"
            >
              ดาวน์โหลดไฟล์
            </Downloadexcel>
          </b-col>
        </b-row>
      </div>
      <div class="table">
        <b-table
          striped
          :items="tabledata"
          :busy="isBusy"
          :fields="fields"
          show-empty
        >
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template #empty>
            <div class="text-center text-danger my-2">
              <strong>ไม่พบข้อมูล</strong>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SearchBoxVehicle from "../components/Searchbox-vehicle.vue";
import moment from "moment";
import Downloadexcel from "vue-json-excel";
export default {
  components: {
    Header,
    SearchBoxVehicle,
    Downloadexcel,
  },
  name: "Report_vehicle",
  middleware: "authen",
  data() {
    return {
      isBusy: true,
      title: "Report : Vehicle",
      date: moment().format("DD-MM-YYYY"),
      tabledata: [],
      date_from: "",
      date_until: "",
      status: "",
      loaded: false,
      export_field: {
        ลำดับที่: "row",
        ประเภทยานพาหนะ: "vehicle_type",
        ยี่ห้อของยานพาหนะ: "vehicle_brand",
        รุ่นของยานพาหนะ: "vehicle_model",
        สีของยานพาหนะ: "vehicle_color",
        "วันที่ - เวลา": "date_th",
        จังหวัด: "Province",
        อำเภอ: "District",
        ตำบล: "SubDistrict",
        สถานะ: "vehicle_status",
        จำนวน: "vehicle_sum",
      },
      fields: [
        {
          key: "row",
          label: "ลำดับที่",
          sortable: true,
        },
        {
          key: "vehicle_type",
          label: "ประเภทยานพาหนะ",
          sortable: true,
        },
        {
          key: "vehicle_brand",
          label: "ยี่ห้อของยานพาหนะ",
          sortable: true,
        },
        {
          key: "vehicle_model",
          label: "รุ่นของยานพาหนะ",
          sortable: true,
        },
        {
          key: "vehicle_color",
          label: "สีของยานพาหนะ",
          sortable: true,
        },
        {
          key: "date_th",
          label: "วันที่ - เวลา",
          sortable: true,
        },
        {
          key: "Province",
          label: "จังหวัด",
          sortable: true,
        },
        {
          key: "District",
          label: "อำเภอ",
          sortable: true,
        },
        {
          key: "SubDistrict",
          label: "ตำบล",
          sortable: true,
        },
        {
          key: "vehicle_status",
          label: "สถานะของยานพาหนะ",
          sortable: true,
        },
        {
          key: "vehicle_sum",
          label: "จำนวน",
          sortable: true,
        },
      ],
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    getTabledata() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/gettabledata/vehicle")
        .then((res) => {
          this.tabledata = res.tablevehicledata;
          this.date_from = moment(res.date_from).add(543, 'year').format('ll');
          this.date_until =  moment(res.date_until).add(543, 'year').format('ll');
          this.status = res.status;
          this.loaded = true;
          this.isBusy = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getroute() {
      let path = this.$route.fullPath;
      this.$store.dispatch("route", { path })
        .then(() => console.log('success'))
    },
    loadingdata([newisBusy]){
      this.isBusy = newisBusy
    },
    updateTabledata([newdata, newdate_from, newdate_until, newstatus]) {
      this.tabledata = newdata;
      this.date_from = moment(newdate_from).add(543, 'year').format('ll');
      this.date_until = moment(newdate_until).add(543, 'year').format('ll');
      this.status = newstatus;
      this.loaded = true;
      this.isBusy = !this.isBusy
    },
  },
  created() {
    this.getTabledata();
    this.getroute();
  },
};
</script>

<style scoped>
.template {
  background-color: grey;
}

.title-container {
  margin-bottom: 0.5vw;
}
.title-container h4 {
  padding-top: 0.3vw;
}
.title-container .btn-download {
  margin-left: 52vw;
}
.image {
  width: 2vw;
  height: 1.5vw;
  margin-right: 0.5vw;
}
.container {
  margin-top: 0vw;
  margin-left: 0vw;
  padding-bottom: 1vw;
  background-color: white;
  padding: 1.5em;
  width: 79vw;
  box-sizing: border-box;
  min-height: 86vh;
  max-height: 200vh;
  border-radius: 0.5vw;
}
.table {
  text-align: center;
  overflow-y: scroll;
  max-height: 37vh;
}
</style>