<template>
  <v-app dark class="app">
    <v-main>
      <v-container>
        <Nuxt :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.app {
  background-color: grey;
  min-height: 47vw;
  max-height: 200vw;
  overflow-y: hidden;
  font-family: 'Avenir', 'Helvetica', 'Arial', 'sans-serif', 'Helvetica Neue', 'San Francisco';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
