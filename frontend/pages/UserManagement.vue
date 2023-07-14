<template>
  <div class="template">
    <Header />
    <div class="container">
      <div class="title-container">
        <b-row align-v="center">
        <img class="image" src="../assets/dashboard-icon.png" />
        <h4>ระบบจัดการผู้ใช้</h4>
        </b-row>
      </div>
      <div style="float: right; margin-bottom: 1vw">
        <b-button v-b-modal.modal-add variant="primary" style="color: white"
          >เพิ่มผู้ใช้</b-button
        >
      </div>
      <div class="table" style="overflow-y: scroll; max-height: 32vw">
        <b-table striped :items="tabledata" :fields="fields">
          <template #cell(ลำดับที่)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(จัดการ)="data1">
            <b-button
              @click="info(data1.item, $event.target)"
              variant="warning"
              style="color: white"
              >แก้ไข</b-button
            >
            <b-button
              @click="del(data1.item, $event.target)"
              variant="danger"
              style="color: white"
              >ลบ</b-button
            >
          </template>
        </b-table>
        <b-modal class="delete-modal" ref="modal"
          :id="delModal.id"
          :title="delModal.title"
          ok-only
          @hide="resetModal()"
          hide-footer>
          <div class="group" style="text-align: center;">
            <h4 style="margin-bottom: 1.5vw">ต้องการลบผู้ใช้ {{old_username}} หรือไม่</h4>
            <b-button
              @click="deleted()"
              variant="danger"
              style="color: white; text-align: center"
              >ลบ</b-button
            >
            <b-button
              @click="hideModal()"
              variant="dark"
              style="color: white; text-align: center"
              >ยกเลิก</b-button
            >
          </div>
        </b-modal>
        <b-modal
          class="edit-modal"
          ref="modal"
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetModal()"
          hide-footer
        >
          <form
            class="edit-form"
            style="text-align: center"
            @submit.prevent="edit()"
          >
            <div class="form-group">
              <label id="username" for="username">ชื่อผู้ใช้ : </label>
              <input
                id="username"
                type="text"
                placeholder=" Username"
                v-model="edit_username"
              />
              <br />
              <label id="new-password" for="new-password">รหัสผ่านใหม่ : </label>
              <input
                id="password"
                placeholder=" Password"
                type="password"
                v-model="edit_password"
                style="margin-right: 0.5vw"
              />
              <br />
              <label id="firstname" for="firstname">ชื่อ : </label>
              <input
                id="firstname"
                type="text"
                placeholder=" First Name"
                v-model="edit_firstname"
              />
              <br />
              <label id="lastname" for="lastname">สกุล : </label>
              <input
                id="lastname"
                type="text"
                placeholder=" Last Name"
                v-model="edit_lastname"
              />
              <br />
            </div>
            <!-- <button type="submit" class="btn btn-primary">Login</button> -->
            <b-button
              type="submit"
              variant="warning"
              style="color: white; text-align: center"
              >แก้ไข</b-button
            >
            <b-button
              @click="hideModal()"
              variant="dark"
              style="color: white; text-align: center"
              >ยกเลิก</b-button
            >
          </form>
        </b-modal>
        <b-modal class="add-modal" ref="modal" id="modal-add" hide-footer title="เพิ่มผู้ใช้" @hide="resetModal()">
          <form
            class="add-form"
            style="text-align: center"
            @submit.prevent="add()"
          >
            <div class="form-group">
              <label id="username" for="username">ชื่อผู้ใช้ : </label>
              <input
                id="username"
                type="text"
                placeholder=" Username"
                v-model="d_username"
              />
              <br />
              <label id="password" for="password">รหัสผ่าน : </label>
              <input
                id="password"
                placeholder=" Password"
                type="password"
                v-model="d_password"
                style="margin-right: 0.5vw"
              />
              <br />
              <label id="firstname" for="firstname">ชื่อ : </label>
              <input
                id="firstname"
                type="text"
                placeholder=" First Name"
                v-model="d_firstname"
              />
              <br />
              <label id="lastname" for="lastname">สกุล : </label>
              <input
                id="lastname"
                type="text"
                placeholder=" Last Name"
                v-model="d_lastname"
              />
              <br />
            </div>
            <!-- <button type="submit" class="btn btn-primary">Login</button> -->
            <b-button
              type="submit"
              class="btn btn-success"
              style="color: white; text-align: center"
              >เพิ่มผู้ใช้</b-button
            >
            <b-button
              @click="hideModal()"
              variant="dark"
              style="color: white; text-align: center"
              >ยกเลิก</b-button
            >
          </form>
        </b-modal>
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

  name: "User-management",
  middleware: "authen",
  data() {
    return {
      title: "User Management",
      tabledata: [],
      d_username: "",
      d_firstname: "",
      d_lastname: "",
      infoModal: 
      {
          id: 'info-modal',
          title: '',
          content: ''
      },
      delModal: 
      {
          id: 'del-modal',
          title: '',
          content: ''
      },
      old_username: "",
      edit_username: "",
      edit_password: "",
      edit_firstname: "",
      edit_lastname: "",
      loaded: false,
      fields: [
        "ลำดับที่",
        {
          key: "username",
          label: "ชื่อผู้ใช้",
          sortable: true,
        },
        {
          key: "firstname",
          label: "ชื่อ",
          sortable: true,
        },
        {
          key: "lastname",
          label: "สกุล",
          sortable: true,
        },
        {
          key: "role",
          label: "บทบาทผู้ใช้",
          sortable: true,
        },
        "จัดการ",
      ],
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
    getTableUserdata() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/getuser")
        .then((res) => {
          this.tabledata = res.tabledata;
          this.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    add() {
      this.$axios
        .$post("http://datascience.mfu.ac.th/dfapi/adduser", {
          username: this.d_username,
          password: this.d_password,
          firstname: this.d_firstname,
          lastname: this.d_lastname,
        })
        .then((res) => {
          console.log(res.status)
          this.d_username = ""
          this.d_password = ""
          this.d_firstname = ""
          this.d_lastname = ""
          this.getTableUserdata();
          this.$refs["modal"].hide();
        })
        .catch((error) => {
          alert(error.response.data)
        });
    },
    edit() {
      this.$axios.$post("http://datascience.mfu.ac.th/dfapi/edituser", {
        old_username: this.old_username,
        new_username: this.edit_username,
        new_password: this.edit_password,
        new_firstname: this.edit_firstname,
        new_lastname: this.edit_lastname,
      })
      .then((res) => {
        this.old_username = ""
        this.edit_username = ""
        this.edit_password = ""
        this.edit_firstname = ""
        this.edit_lastname = ""
        this.getTableUserdata();
        this.$refs["modal"].hide();
      })
      .catch((error) => {
          alert(error.response.data)
      });
    },
    deleted() {
      this.$axios.$post("http://datascience.mfu.ac.th/dfapi/deleteuser", {
        username: this.old_username,
      })
      .then((res) => {
        console.log(res.status)
        this.old_username = ""
        this.getTableUserdata();
        this.$refs["modal"].hide();
      })
      .catch((error) => {
          alert(error.response.data)
      });
    },
    info(item, button) {
      this.infoModal.title = `แก้ไขผู้ใช้: ${item.username}`
      this.old_username = item.username
      this.edit_username = item.username
      this.edit_firstname = item.firstname
      this.edit_lastname = item.lastname
      this.infoModal.content = JSON.stringify(item)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    del(item, button) {
      this.delModal.title = `ลบผู้ใช้: ${item.username}`
      this.old_username = item.username
      this.delModal.content = JSON.stringify(item)
      this.$root.$emit('bv::show::modal', this.delModal.id, button)
    },
    resetModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
      this.d_username = ""
      this.d_firstname = ""
      this.d_lastname = ""
      this.old_password = ""
      this.edit_username = ""
      this.edit_password = ""
      this.edit_firstname = ""
      this.edit_lastname = ""
    },
    hideModal() {
      this.d_username = ""
      this.d_firstname = ""
      this.d_lastname = ""
      this.old_password = ""
      this.edit_username = ""
      this.edit_password = ""
      this.edit_firstname = ""
      this.edit_lastname = ""
      this.$refs["modal"].hide();
    },
  },
  created() {
    this.getTableUserdata();
    this.getroute();
  },
};
</script>

<style scoped>
.template {
  background-color: grey;
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
  overflow-y: hidden;
}
.title-container {
  margin-bottom: 0.5vw;
}
.title-container h4 {
  padding-top: 0vw;
}
.image {
  width: 2.5vw;
  margin-right: 0.5vw;
}
</style>