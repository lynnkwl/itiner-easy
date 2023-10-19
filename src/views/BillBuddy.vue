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

      <div class="expense-add">
        <div class="form-group">
          <input type="text" placeholder="Expense Name" v-model="expense.expenseName" class="form-control">
        </div>
        <div class="form-group">
          <input type="text" placeholder="Expense Amount" v-model="expense.expenseAmount" class="form-control">
        </div>
        <div class="form-group">
          <input type="text" placeholder="Person Owed" v-model="expense.personOwedName" class="form-control">
        </div>
        <div class="form-group">
          <input type="text" placeholder="Who Owes Money (Type and press Enter)" v-model="inputValue" class="form-control"
            @keyup.enter="addToList">
        </div>
        <ul>
          <li v-for="(item, index) in list" :key="index">
            {{ item }}
            <button @click="removeFromList(index)">Remove</button>
          </li>
        </ul>
        <div class="form-group">
          <button class="btn btn-primary" @click="addExpense">Add Expense</button>
        </div>
        <h3>Expense Table</h3>
        <table>
          <thead>
            <tr>
              <th>expenseName</th>
              <th>expenseAmount</th>
              <th>peopleOwingNames</th>
              <th>peopleOwingAmount</th>
              <th>personOwedName</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="expense in expenses">
              <td>{{ expense.expenseName }}</td>
              <td>{{ expense.expenseAmount }}</td>
              <td>
                <td v-for="name in expense.peopleOwingNames">{{ name }}</td>
              </td>
              <td>{{ expense.peopleOwingAmount }}</td>
              <td>{{ expense.personOwedName }}</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </body>
</template>

<script>
// Importing the functions we need from firebase
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc
} from "firebase/firestore";

// Declaring the database data points we need
const db = getFirestore();
const tripsRef = collection(db, 'trips',);
const europeRef = collection(tripsRef, 'cj8jL4yrzvKTAMaY4RWp', 'europe')
const expensesRef = collection(europeRef, 'd52Dh6oAGG6sXBbRV2Dp', 'expenses');
const whoOwesWhoRef = collection(europeRef, 'd52Dh6oAGG6sXBbRV2Dp', 'whoOwesWho');

// Exporting the data to firebase
export default {
  data() {
    return {
      // Objects of data we want to add to firebase
      book: {
        title: null,
        author: null
      },
      expense: {
        expenseName: null,
        expenseAmount: null,
        peopleOwingNames: null,
        personOwedName: null,
        peopleOwingAmount: null
      },
      expenses: [],
      // This is for the list of people who owe money
      inputValue: '',
      list: []
    }
  },
  // Methods for adding data to firebase
  methods: {
    // This function retrieves user input and adds it to the database. (Both in expenses and whoOwesWho)
    addExpense() {
      // Assigns the value of list to the peopleOwingNames object
      this.expense.peopleOwingNames = this.list;

      // Assigns the amount owed to peopleOwingAmount object
      var peopleOwingAmount = Number((this.expense.expenseAmount / this.expense.peopleOwingNames.length).toFixed(2));
      this.expense.peopleOwingAmount = peopleOwingAmount;

      // Adds the expense to the database
      addDoc(expensesRef, this.expense)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      // Adding the expense to the whoOwesWho collection
      // TODO

    },
    // Supporting function for addExpense()
    addToList() {
      this.list.push(this.inputValue);
      this.inputValue = '';
    },
    // Supporting function for addExpense()
    removeFromList(index) {
      this.list.splice(index, 1);
    },
  },
  async created() {
    const querySnapshot = await getDocs(expensesRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.expenses.push(doc.data());
    });
  }
}

getDocs(tripsRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message)
  })

getDocs(europeRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message)
  })

getDocs(expensesRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message)
  })

getDocs(whoOwesWhoRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message)
  })
</script>