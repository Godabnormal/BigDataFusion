import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD2paiUTKFlXpI_THcDD_pkFvHuQ-ME8Qg',
    libraries: 'places',
    language: 'th',
  },
  installComponents: true
});