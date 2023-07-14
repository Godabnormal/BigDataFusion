<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="login">
        <img
          src="../assets/web_logo.jpg"
          style="margin-top: 1vw; width: 22vw;"
        />
        <h4>ระบบบูรณาการข้อมูลการข่าวขนาดใหญ่เพื่อการรักษาความปลอดภัย</h4>
        <form class="login-form" @submit.prevent="login()">
          <div class="form-group">
            <b-row align-h="center" align-v="center">
            <label id="username" for="username" style="margin-left: 0.3vw;">ชื่อผู้ใช้ : </label>
            <input
              id="username"
              type="text"
              placeholder=" Username"
              v-model="username"
              style="margin-left: 0.25vw"
            />
            </b-row>
            <b-row align-h="center" align-v="center">
            <label id="password" for="password">รหัสผ่าน : </label>
            <input
              id="password"
              placeholder=" Password"
              type="password"
              v-model="password"
              style="margin-left: 0.25vw"
            />
            </b-row>
          </div>
          <!-- <button type="submit" class="btn btn-primary">Login</button> -->
          <b-button type="submit" class="btn btn-success" style="color:white;">ลงชื่อเข้าใช้</b-button>
        </form>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      title: "Login",
      username: "",
      password: "",
    };
  },
  head(){
    return {
      title: this.title
    }
  },
  mounted() {
    let path = this.$store.state.route
    if(this.$store.state.token !== null) {
      console.log(path)
      this.$router.push(path)
    }
  },
  methods: {
    login() {
      let user = this.username;
      let pass = this.password;
      this.$store.dispatch("login", { user, pass })
        .then(() => this.$router.push("/dashboard"))
        .catch((error) => alert(error.response.data));
    },
  }
};
</script>

<style scoped>
h4 {
  padding-top: 10px;
  color: white;
}

.form-group label {
  color: white;
}

.login-form {
  padding: 7.5px;
}

input {
  width: 15vw;
  background-color: white;
}

.login {
  background-color: #189ab4;
  width: 40vw;
  margin: auto;
  margin-top: 6vw;
  border-radius: 10px;
  text-align: center;
}

</style>
