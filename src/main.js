import { createApp } from 'vue';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import './style.css';
import App from './App.vue';
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Formkit
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import { createMultiStepPlugin } from '@formkit/addons'
import '@formkit/themes/genesis'
import '@formkit/addons/css/multistep'

// TODO: Add SDKs for Firebase products that you want to use
//popupwindow
// import Buefy from 'buefy';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWqyaqlZm5M3eaTVxCQsy-o2iw-qmxOdY",
  authDomain: "itiner-easy.firebaseapp.com",
  projectId: "itiner-easy",
  storageBucket: "itiner-easy.appspot.com",
  messagingSenderId: "396066188905",
  appId: "1:396066188905:web:ba749c0e78930a57c77cf8",
  measurementId: "G-SZVP36N6L4"
};
export function initMap(coords){
  if (typeof google === 'object' && typeof google.maps === 'object') {
    var options = {
      zoom: 8,
      center: coords
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
    this.map = map;
  } else {
    // The Google Maps JavaScript API is not loaded
    // You can display an error message or try to load the API again
    console.error('Error: Google Maps JavaScript API is not loaded');
  }

}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const analytics = getAnalytics(firebaseApp);

const app = createApp(App)
  .use(formKitPlugin, defaultConfig({
    plugins: [createMultiStepPlugin()]
}));

app.use(BootstrapIconsPlugin);
app.use(router);

app.mount('#app');





