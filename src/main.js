import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router";
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
//popupwindow
import Vuetify from 'vuetify';

createApp.use(Vuetify);

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const analytics = getAnalytics(firebaseApp);

const app = createApp(App);

app.use(router);

app.mount('#app');


// init services
const db = getFirestore();
export { db };

// collection ref
const colRef = collection(db, 'books');
export { colRef };

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({...doc.data(), id: doc.id })
    })
    console.log(books);
})
.catch((err) => {
  console.log(err.message)
})

// adding documents
//  const addBookForm = document.querySelector('.add')
//  addBookForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     addDoc(colRef, {
//       title: addBookForm.title.value,
//       author: addBookForm.author.value,
//  })
//  .then(() => {
  // addBookForm.reset()
//  })
// })

//  deleting documents
// const deleteBookForm = document.querySelector('.delete')
// deleteBookForm.addEventListener('submit', (e) => {
//   e.preventDefault();
// })