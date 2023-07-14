<template>
  <div class="template">
    <div class="header">
      <Header></Header>
    </div>
    <div class="container">
      <div class="title-container">
        <b-row>
          <img class="image" src="../assets/map-icon.png" />
          <h4>ข้อมูลตำแหน่งตามระดับความต้องสงสัย</h4>
          <h4 style="margin-left: 1vw">
            ข้อมูลตั้งแต่วันที่ {{ date_from }} ถึง
            {{ date_until }}
          </h4>
        </b-row>
      </div>
      <div>
        <SearchBoxMap @loadingdata="loadingdata($event)" @updatedata="updateMapdata($event)"></SearchBoxMap>
      </div>
      <div class="map-container">
        <b-row class="justify-content-md-center" style="margin-top: 0.75vw">
          <b-col sm="3" md="auto" align-self="center">
            <b-card class="pin-card" align="center" tag="article">
              <img
                class="pin"
                src="http://maps.google.com/mapfiles/kml/paddle/red-circle.png"
              />
              <h6>ต้องสงสัยมาก <br>(สิ่งต้องสงสัย 3 ประเภท)</h6>
            </b-card>
          </b-col>
          <b-col sm="3" md="auto" align-self="center">
            <b-card class="pin-card" align="center" tag="article">
              <img
                class="pin"
                src="http://maps.google.com/mapfiles/kml/paddle/orange-circle.png"
              />
              <h6>ต้องสงสัยกลาง <br>(สิ่งต้องสงสัย 2 ประเภท)</h6>
            </b-card>
          </b-col>
          <b-col sm="3" md="auto" align-self="center">
            <b-card class="pin-card" align="center" tag="article">
              <img
                class="pin"
                src="http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png"
              />
              <h6>ต้องสงสัยน้อย <br>(สิ่งต้องสงสัย 1 ประเภท)</h6>
            </b-card>
          </b-col>
          <b-col sm="3" md="auto" align-self="center">
            <b-card class="pin-card" align="center" tag="article">
              <img
                class="pin"
                src="http://maps.google.com/mapfiles/kml/paddle/grn-circle.png"
              />
              <h6>ปกติ หรือ ไม่ระบุ <br>(ไม่มีสิ่งต้องสงสัย)</h6>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col>
            <Gmap-map
              :center="center"
              :zoom="5"
              :options="{
                scaleControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                disableDefaultUi: false,
              }"
              map-type-id="hybrid"
              style="aspect-ratio: 16/9"
            >
              <Gmap-info-window
                :options="infoOptions"
                :position="infoWindowPos"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen = false"
              >
              </Gmap-info-window>

              <!-- Marker Green -->
              <Gmap-marker
                :key="i"
                v-for="(m, i) in location_g"
                :position="m.position"
                :clickable="true"
                :icon="green"
                @click="toggleInfoWindow(m, i)"
                :v-if="loaded"
              ></Gmap-marker>

              <!-- Marker Yellow -->
              <Gmap-marker
                :key="i"
                v-for="(m, i) in location_y"
                :position="m.position"
                :clickable="true"
                :icon="yellow"
                @click="toggleInfoWindow(m, i)"
                :v-if="loaded"
              ></Gmap-marker>

              <!-- Marker Orange -->
              <Gmap-marker
                :key="i"
                v-for="(m, i) in location_o"
                :position="m.position"
                :clickable="true"
                :icon="orange"
                @click="toggleInfoWindow(m, i)"
                :v-if="loaded"
              ></Gmap-marker>

              <!-- Marker Red -->
              <Gmap-marker
                :key="i"
                v-for="(m, i) in location_r"
                :position="m.position"
                :clickable="true"
                :icon="red"
                @click="toggleInfoWindow(m, i)"
                :v-if="loaded"
              ></Gmap-marker>
            </Gmap-map>
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
          <b-col cols="12" md="11">
            <div style="margin-top: 1vw; margin-bottom: 1vw">
              <b-row align-h="end">
                <b-col cols="2">
                  <Downloadexcel
                    class="btn btn-success"
                    :data="tabledata"
                    :fields="export_field"
                    worksheet="รายงานระดับความต้องสงสัย"
                    :header="
                      'รายงานระดับความต้องสงสัย' +
                      ' ข้อมูลตั้งแต่วันที่ ' +
                      date_from +
                      ' ถึง ' +
                      date_until
                    "
                    :name="'รายงานระดับความต้องสงสัย ' + date_from + ' - ' + date_until + '.xls'"
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
                <template #cell(ลำดับที่)="data">
                  {{ data.index + 1 }}
                </template>
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
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SearchBoxMap from "../components/Searchbox-map-suspect.vue";
import moment from "moment";
import Downloadexcel from "vue-json-excel";
export default {
  components: {
    Header,
    SearchBoxMap,
    Downloadexcel,
  },
  name: "Map-Suspect",
  middleware: "authen",
  data() {
    return {
      title: "Map-Suspect",
      selected: "",
      isBusy: true,
      location_g: [],
      location_y: [],
      location_o: [],
      location_r: [],
      tabledata: [],
      red: "http://maps.google.com/mapfiles/kml/paddle/red-circle.png",
      orange: "http://maps.google.com/mapfiles/kml/paddle/orange-circle.png",
      yellow: "http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png",
      green: "http://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
      loaded: false,
      date_from: "",
      date_until: "",
      status: "",
      center: { lat: 13.7563, lng: 100.5018 },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      MarkerOptions: {
        zIndex: 999999,
        opacity: 0.2,
      },
      infoOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      export_field: {
        ลำดับที่: "row",
        จังหวัด: "Province",
        อำเภอ: "District",
        ตำบล: "Subdistrict",
        วันที่เริ่มต้น: "min_date",
        วันที่สิ้นสุด: "max_date",
        จำนวนวัตถุ: "obj_num",
        จำนวนยานพาหนะ: "vehicle_num",
        จำนวนบุคคล: "person_num",
        ระดับความต้องสงสัย: "suspect_text"
      },
      fields: [
        {
          key: "row",
          label: "ลำดับที่",
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
          key: "Subdistrict",
          label: "ตำบล",
          sortable: true,
        },
        {
          key: "min_date",
          label: "วันที่ เริ่มต้น",
          sortable: true,
        },
        {
          key: "max_date",
          label: "วันที่ สิ้นสุด",
          sortable: true,
        },
        {
          key: "obj_num",
          label: "จำนวนวัตถุ",
          sortable: true,
        },
        {
          key: "vehicle_num",
          label: "จำนวนยานพาหนะ",
          sortable: true,
        },
        {
          key: "person_num",
          label: "จำนวนบุคคล",
          sortable: true,
        },
        {
          key: "suspect_text",
          label: "ระดับความต้องสงสัย",
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
    getMarker() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getmapmarker/suspect")
        .then((res) => {
          this.tabledata = res.mapdata_table;
          this.isBusy = false;
          this.loaded = true;
          this.date_from = moment(res.date_from).add(543, "year").format("ll");
          this.date_until = moment(res.date_until)
            .add(543, "year")
            .format("ll");
          this.status = res.status;
          this.location_g = res.mapdata_green.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          this.location_y = res.mapdata_yellow.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          this.location_o = res.mapdata_orange.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          this.location_r = res.mapdata_red.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          console.log(res.mapdata_green);
          console.log(this.location_g);
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
    updateMapdata([
      newlocation_g,
      newlocation_y,
      newlocation_o,
      newlocation_r,
      newtabledata,
      newdate_from,
      newdate_until,
      newstatus,
    ]) {
      this.location_g = newlocation_g;
      this.location_y = newlocation_y;
      this.location_o = newlocation_o;
      this.location_r = newlocation_r;
      this.tabledata = newtabledata;
      this.date_from = moment(newdate_from).add(543, "year").format("ll");
      this.date_until = moment(newdate_until).add(543, "year").format("ll");
      this.status = newstatus;
      this.loaded = true;
      this.isBusy = !this.isBusy
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
  },
  created() {
    this.getMarker();
    this.getroute();
  },
};
</script>

<style scoped>
.template {
  background-color: grey;
  padding-bottom: 0.7vw;
}
.container {
  margin-top: 0.7vw;
  margin-left: 0vw;
  padding-bottom: 1vw;
  background-color: white;
  padding: 1.5em;
  width: 79vw;
  box-sizing: border-box;
  min-height: 90vh;
  border-radius: 0.5vw;
}
.title-container {
  margin-bottom: 0.5vw;
}
.title-container h4 {
  padding-top: 0.3vw;
}
.image {
  width: 2vw;
  height: 1.5vw;
  margin-right: 0.5vw;
}

.pin {
  width: 2vw;
  height: 2vw;
}

.pin-card {
  aspect-ratio: 16/9
}

.table {
  text-align: center;
  overflow-y: scroll;
  max-height: 44vh;
}
</style>