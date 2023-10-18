<template>
  <title>BillBuddy</title>

  <body>
    <div style="margin-left: 30px;">
      <h1>Current Trips</h1>
      <h7>No trips at the moment</h7>
      <br><br>
      <router-link to="/add-trip"> Add a Trip Now! </router-link>
    </div>

    <div>
      <!-- testing database using books -->

      <!-- <form class="add">
        <label for="title">Title:</label>
        <input type="text" name="title" required>
        <label for="author">Author:</label>
        <input type="text" name="author" required>

        <button>add a new book</button>
      </form>

      <form class="delete">
        <label for="id">Document id:</label>
        <input type="text" name="id" required>

        <button>delete a book</button>
      </form> -->

      <div class="books-test-add">
        <div class="form-group">
          <input type="text" placeholder="Title" v-model="book.title" class="form-control">
        </div>
        <div class="form-group">
          <input type="text" placeholder="Author" v-model="book.author" class="form-control">
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="addBook">Add Book</button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>

import { db, colRef } from '../main.js'
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
} from "firebase/firestore";

export default {
  name: "Books",
  props: {
    msg: String
  },
  data() {
    return {
      book: {
        title: null,
        author: null
      }
    }
  },
  methods: {
    addBook() {
      addDoc(colRef, this.book)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
  }
}
</script>