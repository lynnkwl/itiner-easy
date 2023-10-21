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
              <th>Expense Name</th>
              <th>Expense Amount</th>
              <th>People Owing Names</th>
              <th>People Owing Amount</th>
              <th>Person Owed Name</th>
              <th>Delete Expense</th>
              <th>Update Expense</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(expense, index) in expenses" :key="index">
              <td>{{ expense.expenseName }}</td>
              <td>{{ expense.expenseAmount }}</td>
              <td>
              <td v-for="name in expense.peopleOwingNames">{{ name }} &nbsp;</td>
              </td>
              <td>{{ expense.peopleOwingAmount }}</td>
              <td>{{ expense.personOwedName }}</td>
              <td><button @click="deleteExpense(index, docId)">Delete Expense</button></td>
              <td><button @click="updateExpense(index, docId)">Update Expense</button></td>
            </tr>
          </tbody>
        </table>
        <h3>whoOwesWho Table</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="key in Object.keys(whoOwesWho)" :key="index">
              <td>{{ key }}</td>
              <td>{{ whoOwesWho[key] }}</td>
            </tr>
          </tbody>
        </table>
        <div class="form-group">
          <button class="btn btn-primary" @click="breakeven">Breakeven</button>
        </div>
        <div id="amountToPay"></div>
      </div>
    </div>
  </body>
</template>

<script>
// Importing the functions we need from firebase
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query
} from "firebase/firestore";

// Declaring the database data points we need
const db = getFirestore();
const tripsRef = collection(db, 'trips',);
const europeRef = collection(tripsRef, 'cj8jL4yrzvKTAMaY4RWp', 'europe');
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
      docId: [],
      whoOwesWho: {},
      // This is for the list of people who owe money
      inputValue: '',
      list: [],
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
      // 1. Check if the personOwedName is already in the whoOwesWho collection
      console.log(this.expense)
      console.log(this.expense.personOwedName)
      console.log(this.expense.peopleOwingNames)
      console.log(this.whoOwesWho)
      if (this.expense.personOwedName in this.whoOwesWho) {
        console.log("Person already in whoOwesWho")
        // 2. If it is, add the expenseAmount to the existing amount
        this.whoOwesWho[this.expense.personOwedName] -= this.expense.expenseAmount;
      } else {
        console.log("Person not in whoOwesWho")
        // 3. If it isn't, add the personOwedName and peopleOwingAmount to the whoOwesWho collection
        this.whoOwesWho[this.expense.personOwedName] = Number(-this.expense.expenseAmount);
      }
      // 1. Check if the peopleOwingNames is already in the whoOwesWho collection
      for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
        console.log(this.expense.peopleOwingNames[i]);
        if (this.expense.peopleOwingNames[i] in this.whoOwesWho) {
          console.log("Person already in whoOwesWho")
          // 2. If it is, add the peopleOwingAmount to the existing amount
          this.whoOwesWho[this.expense.peopleOwingNames[i]] += this.expense.peopleOwingAmount;
        } else {
          console.log("Person not in whoOwesWho")
          // 3. If it isn't, add the personOwedName and peopleOwingAmount to the whoOwesWho collection
          this.whoOwesWho[this.expense.peopleOwingNames[i]] = this.expense.peopleOwingAmount;
        }
      }
      // Update the whoOwesWho collection in firebase
      updateDoc(doc(whoOwesWhoRef, 'BVTPIgEat4pbUPsNPx7i'), this.whoOwesWho)
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
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

    // Function to breakeven expenses
    breakeven() {
      console.log(this.whoOwesWho)
      for (let key in this.whoOwesWho) {
        if (this.whoOwesWho[key] > 0) {
          console.log(key + " owes " + this.whoOwesWho[key]);
        } else if (this.whoOwesWho[key] < -0.011) {
          console.log(key + " is owed " + -this.whoOwesWho[key]);
        } else {
          console.log(key + " is breakeven");
        }
        console.log(key)
        while (this.whoOwesWho[key] > 0) {
          for (let key2 in this.whoOwesWho) {
            if (this.whoOwesWho[key2] < 0) {
              if (this.whoOwesWho[key] > -this.whoOwesWho[key2]) {
                console.log(key + " pays " + -this.whoOwesWho[key2] + " to " + key2);
                document.getElementById("amountToPay").innerHTML += key + " pays " + -this.whoOwesWho[key2] + " to " + key2 + "<br>";
                this.whoOwesWho[key] += this.whoOwesWho[key2];
                this.whoOwesWho[key2] = 0;
              } else if (this.whoOwesWho[key] != 0){
                console.log(key + " pays " + this.whoOwesWho[key] + " to " + key2);
                document.getElementById("amountToPay").innerHTML += key + " pays " + this.whoOwesWho[key] + " to " + key2 + "<br>";
                this.whoOwesWho[key2] += this.whoOwesWho[key];
                this.whoOwesWho[key] = 0;
              }
            }
          }
        }

      }

    },

    // Delete expense from database
    async deleteExpense(index, docId) {
      deleteDoc(doc(expensesRef, docId[index]))
        .then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    // Update expense in database
    async updateExpense(index, docId) {
      updateDoc(doc(expensesRef, docId[index]), {
        expenseName: "Updated Expense Name",
        expenseAmount: 100,
        peopleOwingNames: ["Updated Name 1", "Updated Name 2"],
        peopleOwingAmount: 50,
        personOwedName: "Updated Person Owed Name"
      })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  },
  async created() {
    const querySnapshot = await getDocs(expensesRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.docId.push(doc.id);
      this.expenses.push(doc.data());
    });

    const querySnapshot1 = await getDocs(whoOwesWhoRef);
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.whoOwesWho = doc.data();
      console.log(this.whoOwesWho)
    });
  },
}

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