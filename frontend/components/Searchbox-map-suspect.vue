<template>
  <b-card class="card-container">
    <b-row no-gutters>
      <b-col md="11">
        <div class="container-top">
          <b-row align-v="center">
            <b-col sm="auto">
              <span style="margin-left: 0vw">จังหวัด : </span>
              <select
                v-model="province"
                class="dropdown"
                @change="getDistrict()"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="(provinces, index) in d_province"
                  :key="index"
                  v-bind:value="provinces.province"
                >
                  {{ provinces.province }}
                </option>
              </select>
            </b-col>
            <b-col sm="auto">
              <span style="margin-left: 0.25vw">อำเภอ : </span>
              <select v-model="district" v-if="!province.length" class="dropdown">
                <option value="" selected>ทั้งหมด</option>
              </select>
              <select
                v-model="district"
                v-else-if="province.length"
                class="dropdown"
                @change="getSubDistrict()"
              >
                <option value="">ทั้งหมด</option>
                <option
                  v-for="(districts, index) in d_district"
                  :key="index"
                  v-bind:value="districts.district"
                >
                  {{ districts.district }}
                </option>
              </select>
            </b-col>
            <b-col sm="auto">
              <span style="margin-left: 0.25vw">ตำบล : </span>
              <select v-model="subdistrict" v-if="!district.length" class="dropdown">
                <option value="" selected>ทั้งหมด</option>
              </select>
              <select v-model="subdistrict" v-else-if="district.length" class="dropdown">
                <option value="">ทั้งหมด</option>
                <option
                  v-for="(subdistricts, index) in d_subdistrict"
                  :key="index"
                  v-bind:value="subdistricts.subdistrict"
                >
                  {{ subdistricts.subdistrict }}
                </option>
              </select>
            </b-col>
          </b-row>
          <b-row align-v="center">
            <b-col sm="auto">
              <span style="margin-left: 0.1vw">เริ่มต้น วันที่ : </span>
              <b-form-datepicker
                v-model="date_from"
                placeholder="โปรดเลือกวันที่"
                id="datepicker1"
                size="sm"
                locale="th"
                class="mb-1"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
              ></b-form-datepicker>
            </b-col>
            <b-col sm="auto">
              <span style="margin-left: 0.5vw"> เวลา : </span>
              <select v-model="starttime" class="dropdown">
                <option value="">ทั้งหมด</option>
                <option
                  v-for="(starttimes, index) in d_starttime"
                  :key="index"
                  v-bind:value="starttimes.start_time"
                >
                  {{ starttimes.start_time }}
                </option>
              </select>
            </b-col>
            <b-col sm="auto">
              <span style="margin-left: 0vw">สิ้นสุด วันที่ : </span>
              <b-form-datepicker
                v-model="date_until"
                placeholder="โปรดเลือกวันที่"
                id="datepicker2"
                size="sm"
                locale="th"
                class="mb-1"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
              ></b-form-datepicker>
            </b-col>
            <b-col sm="auto">
              <span style="margin-left: 0.5vw">เวลา : </span>
              <select v-model="endtime" class="dropdown">
                <option value="">ทั้งหมด</option>
                <option
                  v-for="(endtimes, index) in d_endtime"
                  :key="index"
                  v-bind:value="endtimes.end_time"
                >
                  {{ endtimes.end_time }}
                </option>
              </select>
            </b-col>
          </b-row>
          <!-- <b-row align-v="center">
            <b-col sm="4">
            <span style="margin-bottom: 0vw;">สถานะ : </span>
            <select v-model="status" class="dropdown">
              <option value="">ทั้งหมด</option>
              <option
                v-for="(statuses, index) in d_status"
                :key="index"
                v-bind:value="statuses.status"
              >
                {{ statuses.status }}
              </option>
            </select>
            </b-col>
          </b-row> -->
        </div>
      </b-col>
      <b-col md="1">
        <b-row align-v="center">
          <CButton
            class="btn btn-success"
            style="margin-top: 1.5vw; margin-left: 2.5vw; padding: 0.75vw"
            @click="Search()"
            >ค้นหา</CButton
          >
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "SearchBox-Suspect",
  data() {
    return {
      d_province: [],
      d_district: [],
      d_subdistrict: [],
      d_starttime: [],
      d_endtime: [],
      d_status: [],

      province: "",
      district: "",
      subdistrict: "",
      date_from: "",
      starttime: "",
      date_until: "",
      endtime: "",
      status: "",

      newtabledata:[],
      newlocation_g: [],
      newlocation_y: [],
      newlocation_o: [],
      newlocation_r: [],
      newdate_from: "",
      newdate_until: "",
      newstatus: "",
    };
  },
  methods: {
    getProvince() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getprovince")
        .then((res) => {
          this.d_province = res.provincedata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getDistrict() {
      if (this.province === "") {
        this.district = ""
        this.subdistrict = ""
      }
      else
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getdistrict", { province: this.province })
        .then((res) => {
          this.d_district = res.districtdata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSubDistrict() {
      if (this.district === "") {
        this.subdistrict = ""
      }
      else
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getsubdistrict", {
          province: this.province,
          district: this.district,
        })
        .then((res) => {
          this.d_subdistrict = res.subdistrictdata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getstarttime() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getstarttime")
        .then((res) => {
          this.d_starttime = res.starttimedata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getendtime() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getendtime")
        .then((res) => {
          this.d_endtime = res.endtimedata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // getstatus() {
    //   this.$axios
    //     .$post("http://datascience.mfu.ac.th/dfapi/getstatus")
    //     .then((res) => {
    //       this.d_status = res.statusdata;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    Search() {
      this.newisBusy = true;
      this.$emit("loadingdata",[this.newisBusy])
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getmapmarker/suspect", {
          province: this.province,
          district: this.district,
          subdistrict: this.subdistrict,
          date_from: this.date_from,
          time_from: this.starttime,
          date_until: this.date_until,
          time_until: this.endtime,
        })
        .then((res) => {
          this.loaded = true;
          this.newdate_from = res.date_from;
          this.newdate_until = res.date_until;
          this.status = res.status;
          console.log(res.mapdata)
          this.newtabledata = res.mapdata_table;
          this.newlocation_g = res.mapdata_green.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          this.newlocation_y = res.mapdata_yellow.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          this.newlocation_o = res.mapdata_orange.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          this.newlocation_r = res.mapdata_red.map((item) => ({
            position: { lat: parseFloat(item.lat), lng: parseFloat(item.lng) },
            infoText: `<div class="">
              <div>
                <div class="m-2">
                  <span style="font-weight: bold;"> ${item.row}. ${item.item}</span>
                </div>
              </div>
            </div>`,
          }));
          this.$emit("updatedata", [
            this.newlocation_g,
            this.newlocation_y,
            this.newlocation_o,
            this.newlocation_r,
            this.newtabledata,
            this.newdate_from,
            this.newdate_until,
            this.newstatus,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getdatepicker(){
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getdate")
        .then((res) => {
          this.date_from = res.date_fromdata;
          this.date_until = res.date_untildata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getProvince();
    this.getstarttime();
    this.getendtime();
    this.getdatepicker();
  },
};
</script>

<style scoped>
.container-top {
  margin-bottom: 0.8vw;
  /* background-color: brown; */
}
.container-top input {
  margin-left: 0.3vw;
}
.container-top span {
  font-size: 15px;
}
.card-container .dropdown {
  margin-left: 0.4vw;
  width: 9.6vw;
}
.b-form-datepicker {
  display: inline-flex;
}
select {
  border-color: black;
  border-style: groove;
  border-radius: 0.15vw;
}
</style>