<template>
  <div class="template">
    <Header />
    <div class="container">
      <div class="title-container">
        <b-row align-v="center">
          <img class="image" src="../assets/dashboard-icon.png" />
          <h4>เกี่ยวกับ</h4>
        </b-row>
      </div>
      <div class="content">
        <b-row class="justify-content-md-center">
          <b-card style="margin: 0vw">
            <b-row style="margin-left: 0.25vw; margin-bottom: 0.05vw;">
              <h5 style="font-weight: bold">
                ชื่อโครงการ:
              </h5>
              <p style="margin-left: 0.5vw; font-size: 1.1em;">การศึกษาความเป็นไปได้การพัฒนาระบบบูรณาการ ข้อมูล
                การข่าวขนาดใหญ่เพื่อการรักษาความปลอดภัย</p>
            </b-row>
            <br />
            <b-row style="margin-left: 0.25vw; margin-bottom: 0.05vw;">
              <h5 style="font-weight: bold">แหล่งทุน:</h5>
              <p style="margin-left: 0.5vw; font-size: 1.1em;">การศึกษาความเป็นไปได้การพัฒนาระบบบูรณาการ ข้อมูล
                การข่าวขนาดใหญ่เพื่อการรักษาความปลอดภัย</p>
            </b-row>
            <br />
            <b-row style="margin-left: 0.25vw;">
              <h5 style="font-weight: bold">วัตถุประสงค์โครงการ:</h5>
            </b-row>
            <b-row style="margin-left: 0.25vw; margin-bottom: 0.05vw;">
              <h6>
                1.พัฒนาต้นแบบระบบบูรณาการข้อมูลขนาดใหญ่เพื่อรองรับการรวบรวมและเชื่อมโยงการข่าวที่ได้จากระบบตรวจจับในมิติต่างๆอีกทั้งแสดงผลเชิงพื้นที่และเวลา
              </h6>
              <h6>
                2.สร้างเครือข่ายหน่วยงานผู้ใช้งานในพื้นที่สามจังหวัดใช้แดนภาคใต้เพื่อการใช้งานและพัฒนาที่ต่อเนื่องทั้งในเชิงปริมาณข้อมูลข่าวสารและคุณภาพการวิเคราะห์ข้อมูลโดยแบ่งปันข้อมูลเพื่อการวิจัยและนวัตกรรมได้ต่อไป
              </h6>
              <h6>
                3.พัฒนาเอกสารประกอบการอบรมการใช้งานระบบแก่เจ้าหน้าที่หน่วยงานผู้ใช้
              </h6>
              <h6>
                4.เผยแพร่ผลงานวิจัยในรูปแบบบทความวิจัยทั้งในวารสารวิชาการนานาชาติและในที่ประชุมวิชาการนานาชาติอีกทั้งพัฒนาเว็บไซต์เพื่อประชาสัมพันธ์ผลงานต่างๆของชุดโครงการวิจัยนี้
              </h6>
            </b-row>
            <b-row class="justify-content-md-center">
              <b-col>
                <h5 style="text-align: center; font-weight: bold">คณะวิจัยมหาวิทยาลัยแม่ฟ้าหลวง</h5>
              </b-col>
            </b-row>
            <b-card-group deck>
              <b-row class="justify-content-md-center">
                <b-col lg="3">
                  <b-card
                    img-src="../assets/aj_tos.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      รองศาสตราจารย์ นาวาอากาศโท ดร.ทศพล บุญเกิน
                      (หัวหน้าโครงการ)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/aj_oil.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      รองศาสตราจารย์ <br>ดร.ณัฐกานต์ เอี่ยมอ่อน<br>(ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/aj_pat.png"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      อาจารย์<br>ดร.ขวัญตา คีรีมาศทอง<br>(ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/aj_god.png"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      อาจารย์<br>ดร.สุรพล วรภัทราทร <br />(ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col lg="3">
                  <b-card
                    img-src="../assets/p_petch.png"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      ว่าที่ร้อยตรี ภาคภูมิ พรมมูล <br />(ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/tonkla.jpeg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      นาย ต้นกล้า มณีรัตน์ <br />(ผู้ช่วยนักวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/simon.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      นาย ซีโมน ยศบุญ <br />(ผู้ช่วยนักวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/tick.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      นาย บวร ยาแก้ว <br />(ผู้ช่วยนักวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </b-card-group>
            <b-row class="justify-content-md-center" style="margin-top: 1vw;">
              <b-col>
                <h5 style="text-align: center; font-weight: bold">คณะวิจัยโรงเรียนนายเรืออากาศนวมินทกษัตริยาธิราช</h5>
              </b-col>
            </b-row>
            <b-card-group deck>
              <b-row class="justify-content-md-center">
                <b-col lg="3">
                  <b-card
                    img-src="../assets/นาวาอากาศเอก บุญเลิศ อันดารา.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      นาวาอากาศเอก<br>บุญเลิศ อันดารา
                      <br>(ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/นาวาอากาศเอก ผู้ช่วยศาสตราจารย์ ภูมิพัฒน์ ดวงกลาง.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      นาวาอากาศเอก<br>ผู้ช่วยศาสตราจารย์ ภูมิพัฒน์ ดวงกลาง (ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/นาวาอากาศตรี ผู้ช่วยศาสตราจารย์ จีรศักดิ์ หมวดโพธิกลาง.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      นาวาอากาศตรี<br>ผู้ช่วยศาสตราจารย์ จีรศักดิ์ หมวดโพธิกลาง (ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col lg="3">
                  <b-card
                    img-src="../assets/นาวาอากาศเอก รองศาสตราจารย์ คมกริช แก้วฉาย.jpg"
                    img-alt="Card image"
                    img-bottom
                  >
                    <b-card-text class="card-text">
                      นาวาอากาศเอก รองศาสตราจารย์ คมกริช แก้วฉาย (ผู้ร่วมวิจัย)
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </b-card-group>
          </b-card>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
  },
  name: "About",
  middleware: "authen",
  data() {
    return {
      title: "About",
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
  },
  created() {
    this.getroute();
  },
};
</script>

<style scoped>
.template {
  background-color: grey;
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
  max-height: 87vh;
  border-radius: 0.5vw;
  overflow-y: scroll;
}
.title-container {
  margin-bottom: 0.5vw;
}
.title-container h5 {
  padding-top: 0vw;
}
.image {
  width: 2.5vw;
  margin-right: 0.5vw;
}
.card-text {
  text-align: center;
}
</style>