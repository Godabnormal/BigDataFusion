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
          <b-row align-v="center">
            <b-col sm="4">
            <span>ชื่อวัตถุ : </span>
            <select v-model="objectname" class="dropdown">
              <option value="">ทั้งหมด</option>
              <option
                v-for="(objectnames, index) in d_objectname"
                :key="index"
                v-bind:value="objectnames.name"
              >
                {{ objectnames.name }}
              </option>
            </select>
            </b-col>
            <b-col sm="4">
            <span style="margin-left: 0.5vw">สถานะ : </span>
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
          </b-row>
        </div>
      </b-col>
      <b-col md="1">
        <b-row>
          <CButton
            class="btn btn-success"
            style="margin-top: 1.5vw; padding: 0.75vw"
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
  name: "SearchBoxObject",
  data() {
    return {
      d_objectname: [],
      d_status: [],
      d_province: [],
      d_district: [],
      d_subdistrict: [],
      d_starttime: [],
      d_endtime: [],

      objectname: "",
      status: "",
      province: "",
      district: "",
      subdistrict: "",
      date_from: "",
      starttime: "",
      date_until: "",
      endtime: "",

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
      newdate_from: "",
      newdate_until: "",
      newdata_status: "",
    };
  },
  methods: {
    getObjectname() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getobjectname")
        .then((res) => {
          this.d_objectname = res.objectnamedata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getObjectstatus() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getobjectstatus")
        .then((res) => {
          this.d_status = res.objectstatusdata;
        })
        .catch((error) => {
          console.error(error);
        });
    },
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
    Search() {
      this.loaded1 = false;
      this.loaded2 = false;
      this.loaded3 = false;
      this.loaded4 = false;
      this.$emit("loadingdata", [
        this.loaded1,
        this.loaded2,
        this.loaded3,
        this.loaded4,
      ]);
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getchartdata/object", {
          objectname: this.objectname,
          status: this.status,
          province: this.province,
          district: this.district,
          subdistrict: this.subdistrict,
          date_from: this.date_from,
          time_from: this.starttime,
          date_until: this.date_until,
          time_until: this.endtime,
        })
        .then((res) => {
          this.counts_1 = res.chartdata_name.map((item) => item.sum_object);
          this.labels_1 = res.chartdata_name.map((item) => item.name);
          this.loaded1 = true;

          this.counts_2 = res.chartdata_time.map((item) => item.sum_object);
          this.labels_2 = res.chartdata_time.map((item) => item.chktime);
          this.loaded2 = true;

          this.counts_3 = res.chartdata_status.map((item) => item.sum_object);
          this.labels_3 = res.chartdata_status.map((item) => item.status);
          this.loaded3 = true;

          this.counts_4 = res.chartdata_location.map((item) => item.sum_object);
          this.labels_4 = res.chartdata_location.map((item) => item.location);
          this.loaded4 = true;

          this.newdate_from = res.date_from;
          this.newdate_until = res.date_until;

          this.newdata_status = res.status;
          this.$emit("updatedata", [
            this.counts_1,
            this.labels_1,
            this.loaded1,
            this.counts_2,
            this.labels_2,
            this.loaded2,
            this.counts_3,
            this.labels_3,
            this.loaded3,
            this.counts_4,
            this.labels_4,
            this.loaded4,
            this.newdate_from,
            this.newdate_until,
            this.newdata_status,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getObjectname();
    this.getObjectstatus();
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