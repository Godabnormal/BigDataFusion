<template>
  <div class="template">
    <div class="header">
      <Header></Header>
    </div>
    <div class="container">
      <div class="title-container">
        <b-row>
          <img class="image" src="../assets/map-icon.png" />
          <h4>ข้อมูลตำแหน่ง: วัตถุ</h4>
          <h4 style="margin-left: 1vw;"> สถานะ: {{status}} ข้อมูลตั้งแต่วันที่ {{date_from}} ถึง  {{date_until}}</h4>
        </b-row>
      </div>
      <div style='margin-top:0.2vw'>
          <SearchBoxMap  @updatedata="updateMapdata($event)"></SearchBoxMap>
      </div>
      <div class="map-container">
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
              style="
                aspect-ratio: 16/9;
                margin-top: 1vw;
              "
            >
              <Gmap-info-window
                :options="infoOptions"
                :position="infoWindowPos"
                :opened="infoWinOpen"
                @closeclick="infoWinOpen = false"
              >
              </Gmap-info-window>

              <Gmap-marker
                :key="i"
                v-for="(m, i) in location"
                :position="m.position"
                :clickable="true"
                @click="toggleInfoWindow(m, i)"
                :v-if="loaded"
              ></Gmap-marker>
            </Gmap-map>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SearchBoxMap from "../components/Searchbox-map-object.vue";
import moment from "moment";
export default {
  components: {
    Header,
    SearchBoxMap,
  },
  name: "Map_object",
  middleware: "authen",
  data() {
    return {
      title: "Map: Object",
      selected: "",
      location: [],
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
    };
  },
  head(){
    return {
      title: this.title
    }
  },
  methods: {
    getMarker() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getmapmarker/object")
        .then((res) => {
          this.loaded = true
          this.date_from = moment(res.date_from).add(543, 'year').format('ll')
          this.date_until = moment(res.date_until).add(543, 'year').format('ll')
          this.status = res.status
          this.location = res.mapobjectdata.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: 
            `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;">${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
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
    updateMapdata([newdata, newdate_from , newdate_until, newstatus]) {
      this.location = newdata
      this.date_from = moment(newdate_from).add(543, 'year').format('ll')
      this.date_until = moment(newdate_until).add(543, 'year').format('ll')
      this.status = newstatus
      this.loaded = true
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
}
.container {
  margin-top: 0vw;
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
  padding-top: 0vw;
}
.image {
  width: 2vw;
  height: 1.5vw;
  margin-right: 0.5vw;
}
</style>