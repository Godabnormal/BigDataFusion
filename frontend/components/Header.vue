<template>
  <div class="header">
    <v-app-bar style="background-color: #189ab4" clipped-left fixed app>
      <v-app-bar-nav-icon
        style="margin-left: 0.2vw"
        @click.stop="drawer = !drawer"
      />
      <v-avatar :tile="true">
        <img class="image" src="../assets/web_logo.jpg" />
      </v-avatar>
      <v-toolbar-title style="color: white;">ระบบบูรณาการข้อมูลการข่าวขนาดใหญ่เพื่อการรักษาความปลอดภัย</v-toolbar-title>
      <v-spacer></v-spacer>
      <h5 style="color: white; margin-top: 0.2vw; margin-right: 0.5vw;">{{ user }}</h5>
      <b-button variant="primary" style="color:white;" @click="logout()">ออกจากระบบ</b-button>
    </v-app-bar>
    <v-navigation-drawer
      style="background-color: #05445e"
      v-if="role == 1"
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <div v-for="(link, i) in links1" :key="i">
          <v-list-item v-if="!link.subLinks" :to="link.to" class="v-list-item">
            <v-list-item-icon>
              <v-icon color="white" v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title
              style="color: white;"
              v-text="link.text"
            />
          </v-list-item>

          <v-list-group v-else :key="link.text" no-action :value="false" ripple color="white">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white" v-text="link.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title
                style="color: white;"
                >{{ link.text }}</v-list-item-title
              >
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-title style="color: white">{{
                sublink.text
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
      <div class="aie">
        <img
          src="../assets/aie-logo.png"
          style="width: 6vw; border-radius: 3vw; margin-bottom: 1vw"
        />
        <p>
          พัฒนาโดย <br />
          ศูนย์ความเป็นเลิศด้านปัญญาประดิษฐ์และเทคโนโลยีก่อกำเนิด
          สำนักวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่ฟ้าหลวง
        </p>
      </div>
    </v-navigation-drawer>
    <v-navigation-drawer
      style="background-color: #05445e"
      v-if="role == 2"
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list>
        <div v-for="(link, i) in links2" :key="i">
          <v-list-item v-if="!link.subLinks" :to="link.to" class="v-list-item">
            <v-list-item-icon>
              <v-icon color="white" v-text="link.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color: white" v-text="link.text" />
          </v-list-item>

          <v-list-group v-else :key="link.text" no-action :value="false" ripple color="white">
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white" v-text="link.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title style="color: white">{{
                link.text
              }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-title style="color: white">{{
                sublink.text
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
      <div class="aie">
        <img
          src="../assets/aie-logo.png"
          style="width: 3vw; border-radius: 3vw; margin-bottom: 1vw"
        />
        <img
          src="../assets/mfu_logo.png"
          style="width: 3vw; border-radius: 3vw; margin-bottom: 1vw"
        />
        <p>
          พัฒนาโดย <br />
          ศูนย์ความเป็นเลิศด้านปัญญาประดิษฐ์และเทคโนโลยีก่อกำเนิด
          สำนักวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยแม่ฟ้าหลวง
        </p>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: this.$store.state.user,
      role: this.$store.state.role,
      drawer: true,
      links1: [
        {
          text: "แผนภูมิ",
          icon: "mdi-chart-box-outline",
          subLinks: [
            {
              text: "ภาพรวม",
              to: "/dashboard",
            },
            {
              text: "วัตถุ",
              to: "/object",
            },
            {
              text: "ยานพาหนะ",
              to: "/vehicle",
            },
            {
              text: "บุคคล",
              to: "/person",
            },
          ],
        },
        {
          text: "แผนที่",
          icon: "mdi-map-legend",
          subLinks: [
            {
              text: "ทั้งหมด",
              to: "/map",
            },
            {
              text: "ต้องสงสัย",
              to: "/map-suspect",
            },
            {
              text: "วัตถุ",
              to: "/map-object",
            },
            {
              text: "ยานพาหนะ",
              to: "/map-vehicle",
            },
            {
              text: "บุคคล",
              to: "/map-person",
            },
          ],
        },
        {
          text: "รายงานสถิติ",
          icon: "mdi-file-chart-outline",
          subLinks: [
            {
              text: "ทั้งหมด",
              to: "/report",
            },
            {
              text: "วัตถุ",
              to: "/report-object",
            },
            {
              text: "ยานพาหนะ",
              to: "/report-vehicle",
            },
            {
              text: "บุคคล",
              to: "/report-person",
            },
          ],
        },
        {
          to: "/about",
          text: "เกี่ยวกับ",
          icon: "mdi-information-outline",
        },
      ],
      links2: [
        {
          text: "แผนภูมิ",
          icon: "mdi-chart-box-outline",
          subLinks: [
            {
              text: "ภาพรวม",
              to: "/dashboard",
            },
            {
              text: "วัตถุ",
              to: "/object",
            },
            {
              text: "ยานพาหนะ",
              to: "/vehicle",
            },
            {
              text: "บุคคล",
              to: "/person",
            },
          ],
        },
        {
          text: "แผนที่",
          icon: "mdi-map-legend",
          subLinks: [
            {
              text: "ทั้งหมด",
              to: "/map",
            },
            {
              text: "ต้องสงสัย",
              to: "/map-suspect",
            },
            {
              text: "วัตถุ",
              to: "/map-object",
            },
            {
              text: "ยานพาหนะ",
              to: "/map-vehicle",
            },
            {
              text: "บุคคล",
              to: "/map-person",
            },
          ],
        },
        {
          text: "รายงานสถิติ",
          icon: "mdi-file-chart-outline",
          subLinks: [
            {
              text: "ทั้งหมด",
              to: "/report",
            },
            {
              text: "วัตถุ",
              to: "/report-object",
            },
            {
              text: "ยานพาหนะ",
              to: "/report-vehicle",
            },
            {
              text: "บุคคล",
              to: "/report-person",
            },
          ],
        },
        {
          to: "/usermanagement",
          text: "ระบบจัดการผู้ใช้",
          icon: "mdi-account-box-multiple",
        },
        {
          to: "/about",
          text: "เกี่ยวกับ",
          icon: "mdi-information-outline",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.image {
  width: 3vw;
}
.aie {
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
}
.aie p {
  color: white;
  font-size: 12.5px;
}
</style>