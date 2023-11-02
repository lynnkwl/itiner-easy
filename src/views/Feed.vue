<template>
  <div name="before-selecting-trip" v-if="!selected">
    <div>
      <Header></Header>
    </div>
    <!-- title -->
    <div class="mt-7 mb-4 ml-7">
      <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">{{ displayName }}'s</a> current trips <router-link
          to="/add-trip">
          <button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add a new trip</button>
        </router-link></h1>
    </div>
    <!-- trips carousell cards -->
    <section class="flex ml-2 flex-nowrap gap-5 px-5 overflow-x-auto snap-x snap-mandatory pb-7 no-scrollbar">
      <div class="bg-white p-5 snap-always snap-center text-center rounded flex-none shadow-lg" v-for="trip in trips">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl m-2">{{ trip }}</h2>
        <h3 class="text-base">A _ day trip to Tokyo</h3>
        <button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          @click="goToTrip(trip)">Go
          to Trip</button>
        <button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
          @click="deleteTrip(trip)">Delete Trip</button>
      </div>
    </section>
    <div class="ml-7 mb-4">
      <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">Ralph's</a> shared trips</h1>
    </div>

    <section class="flex ml-2 flex-nowrap gap-5 px-5 overflow-x-auto snap-x snap-mandatory pb-7 no-scrollbar">
      <div class="bg-white p-5 snap-always snap-center text-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl m-2">Tokyo</h2>
        <h3 class="text-base">John, Robert, Carrie</h3>
      </div>
      <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl">Taiwan</h2>
      </div>
      <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl">Malaysia</h2>
      </div>
      <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl">Singapore</h2>
      </div>
    </section>

    <div class="mb-4">
      <h1 class="text-2xl ml-7 md:text-3xl">Toolkit</h1>
      <h4 class="ml-7 italic">Travelling has never been easier.</h4>
      <div class="mt-2 ml-7 mr-7 ">
        <!-- tools -->
        <div class="flex flex-wrap">
          <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
              <li class="-mb-px w-1/4 mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                  v-on:click="toggleTabs(1)"
                  v-bind:class="{ 'text-blue-900 bg-white': openTab !== 1, 'text-white bg-blue-900': openTab === 1 }">
                  Translator
                </a>
              </li>
              <li class="-mb-px mr-2 w-1/4 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                  v-on:click="toggleTabs(2)"
                  v-bind:class="{ 'text-blue-900 bg-white': openTab !== 2, 'text-white bg-blue-900': openTab === 2 }">
                  Currency converter
                </a>
              </li>
            </ul>
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div class="px-4 py-5 flex-auto">
                <div class="tab-content tab-space">
                  <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                    <Translator></Translator>
                  </div>
                  <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                    <Currency></Currency>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div name="after-selecting-trip" v-if="selected">
    <div>
      <button class="btn btn-primary" @click="backToTrips">Back to Feed</button>
    </div>
    <div class="text-3xl m-7 font-bold">
      <h2>{{ selectedTrip }} expenses</h2>
    </div>
    

    <div class="expense-add">
      <div class="form-group">
        <p>Expense Name:</p>
        <input type="text" placeholder="Expense Name" v-model="expense.expenseName" class="form-control" required>
      </div>
      <div class="form-group">
        <p>Expense Amount:</p>
        <input type="number" placeholder="Expense Amount" v-model="expense.expenseAmount" class="form-control" required>
      </div>
      <div class="form-group">
        <p>Person Owed:</p>
        <select v-model="expense.personOwedName" class="form-control" required>
          <option v-for="name in personNames" :key="name" :value="name" selected>
            {{ name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <p>Who Owes Money:</p>
        <label v-for="name in personNames">
          <input type="checkbox" :name="name" :value="name" v-model="inputValue">{{ name }}<br>
        </label>
      </div>
      <div>
        <p>Which Currency Are We Using?</p>
        <input name="currency" type="radio" id="tripCurrency" v-model="expense.currency">
        <label for="tripCurrency">{{ tripCurrency }}</label><br>
        <input name="currency" type="radio" id="homeCurrency" v-model="expense.currency">
        <label for="homeCurrency">{{ homeCurrency }}</label><br>
      </div>

      <div class="form-group">
        How are we splitting this?
        <select id="splitmethod" v-model="splitmethod">
          <option value="evenly">Split Evenly</option>
          <option value="percentage">Split by percentage</option>
          <option value="shares">Split by Shares</option>
          <option value="custom">Custom Split</option>
        </select>
      </div>
      <div v-if="splitmethod == 'percentage'">
        <h3>Split By Percentage</h3>
        <div class="form-group">
          <h4 v-for="(name, index) in list ">
            {{ name }} <input type="number" placeholder="Percentage" v-model="percentages[index]" class="form-control"
              @keyup.enter="computeexpense">
          </h4>
          <ul>
            <li v-for="(amt, index) in quicksettleamount" :key="index">
              {{ this.list[index] }} pays {{ amt }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="splitmethod == 'shares'">
        <h3>Split By Shares</h3>
        <div class="form-group">
          <h4 v-for="(name, index) in list ">
            {{ name }} <input type="number" placeholder="Shares" v-model="shares[index]" class="form-control"
              @keyup.enter="computeexpense">
          </h4>
          <ul>
            <li v-for="(amt, index) in quicksettleamount" :key="index">
              {{ this.list[index] }} pays {{ amt }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="splitmethod == 'custom'">
        <h3>Have it your way!</h3>
        <div class="form-group">
          <h4 v-for="(name, index) in list ">
            {{ name }} <input type="number" placeholder="custom" v-model="custom[index]" class="form-control"
              @keyup.enter="computeexpense">
          </h4>
          <ul>
            <li v-for="(amt, index) in quicksettleamount" :key="index">
              {{ list[index] }} pays {{ amt }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="splitmethod == 'evenly'">
        <h3>Split Evenly</h3>
        <div class="form-group">
          <h4 v-for="name in list ">
            {{ name }} pays {{ expense.expenseAmount / list.length }}
          </h4>
        </div>
      </div>

      <ul>
        <li v-for="(item, index) in list" :key="index">

          <button class="btn btn-primary" @click="removeFromList(index)">Remove</button> {{ item }}
        </li>
      </ul>
      <div class="form-group">
        <button class="btn btn-primary" @click="checkempty">Add Expense</button>
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
            <th>Amount Owed</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="key in Object.keys(whoOwesWho)">
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

<div class="grid grid-cols-1 md:grid-cols-2">
      <!-- expensecards -->
      <div class="rightcol">
      <div class="expensecards">
        <expensecards 
        v-for="(expense, index) in expenses"
        :itemDesc="expense.expenseName"
        :price="expense.expenseAmount"
        :TransfereeName="expense.personOwedName"
        @button-clicked="deleteExpense(index,docId)">
      </expensecards>

      <button class="btn mt-4 ml-3 btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      Add an expense
      </button>


      </div>
      </div>

      <!-- splittercards
      <div class="splittercards">
        <splittercards
        :v-for="key in Object.keys(whoOwesWho)"
        :Name1="key">
      </splittercards>
      </div> -->


</div>





</template>


<script setup>
import Header from "../components/header.vue"
import Translator from "../components/Tools/translator.vue"
import Currency from "../components/Tools/currencyconverter.vue"
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot, getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import expensecards from "../components/expensecards.vue"
import splittercards from "../components/splittercards.vue"
</script>


<script>
export default {
  name: "lightBlue-tabs",
  data() {
    return {
      openTab: 1,
      expense: {
        expenseName: null,
        expenseAmount: null,
        peopleOwingNames: null,
        personOwedName: null,
        peopleOwingAmount: null,
        currency: null,
      },
      expenses: [],
      docId: [],
      displayName: null,
      whoOwesWho: {},
      // This is for the list of people who owe money
      inputValue: [],
      list: [],
      splitmethod: null,
      trips: [],
      trip: null,
      quicksettleamount: [],
      percentages: [],
      shares: [],
      custom: [],
      selected: false,
      db: null,
      auth: null,
      tripsRef: null,
      uid: null,
      currencyList: [],
      tripCurrency: null,
      homeCurrency: null,
      personNames: [],
    }
  },
  mounted() {
    console.log('Component mounted.')
    this.db = getFirestore();
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('User is signed in', user.uid + " " + user.email)
        this.uid = user.uid;
        console.log(user.displayName)
        this.displayName = user.displayName;
        console.log(this.uid);
        this.tripsRef = collection(this.db, 'users', this.uid, 'trips');
      } else {
        console.log('User is signed out')
      }
    });
  },
  computed: {
    selectedTrip() {
      return this.trip;
    }
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },

    goToTrip(trip) {
      console.log(trip);
      this.trip = trip;
      this.selected = true;

      getDocs(collection(this.tripsRef, this.trip, 'expenses')).then((querySnapshot) => {
        if (this.expenses.length > 0) {
          this.expenses = [];
        }
        if (this.docId.length > 0) {
          this.docId = [];
        }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.docId.push(doc.id);
          this.expenses.push(doc.data());
        });
      });

      // Gets whoOwesWho, personNames and currencies used from database
      getDoc(doc(this.tripsRef, this.trip)).then(doc => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          this.whoOwesWho = doc.data().whoOwesWho;
          this.tripCurrency = doc.data().tripCurrency;
          this.homeCurrency = doc.data().homeCurrency;
          this.personNames = doc.data().personNames;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      const querySnapshot1 = getDocs(doc(this.tripsRef, this.trip));
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.whoOwesWho = doc.data();
        console.log(this.whoOwesWho)
      });
    },

    backToTrips() {
      // this.selected = false;
      window.location.reload();
    },

    // This function retrieves user input and adds it to the database. (Both in expenses and whoOwesWho)
    async addExpense() {
      this.addToList();
      // Assigns the value of list to the peopleOwingNames object
      this.expense.peopleOwingNames = this.list;
      console.log(this.expense.peopleOwingNames);
      // Assigns the amount owed to peopleOwingAmount object
      var peopleOwingAmount = Number((this.expense.expenseAmount / this.expense.peopleOwingNames.length).toFixed(2));
      this.expense.peopleOwingAmount = peopleOwingAmount;


      // Adds the expense to the database
      addDoc(collection(this.tripsRef, this.trip, 'expenses'), this.expense)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      // Adding the expense to the whoOwesWho collection
      // 1. Check if the personOwedName is already in the whoOwesWho collection
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
      updateDoc(doc(this.tripsRef, this.trip), {
        whoOwesWho: this.whoOwesWho
      })
        .then(() => {
          console.log("whoOwesWho successfully updated!");
          console.log(this.whoOwesWho)
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      // Reset the values of the expense object
      this.expense.expenseName = null;
      this.expense.expenseAmount = null;
      this.expense.peopleOwingNames = null;
      this.expense.personOwedName = null;
      this.expense.peopleOwingAmount = null;
      this.list = [];
    },
    // Supporting function for addExpense()
    addToList() {
      this.list = this.inputValue;
      console.log(this.list)
      this.inputValue = [];
      this.list = this.list.sort();
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
              } else if (this.whoOwesWho[key] != 0) {
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
      console.log(docId)
      console.log(index)
      deleteDoc(doc(this.tripsRef, this.trip, 'expenses', docId[index]))
        .then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    // Update expense in database
    async updateExpense(index, docId) {
      updateDoc(collection(this.tripsRef, this.trip, 'expenses'), docId[index]), {
        expenseName: "Updated Expense Name",
        expenseAmount: 100,
        peopleOwingNames: ["Updated Name 1", "Updated Name 2"],
        peopleOwingAmount: 50,
        personOwedName: "Updated Person Owed Name"
      }
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },

    // Delete trip from database
    async deleteTrip(trip) {
      deleteDoc(doc(this.tripsRef, trip))
        .then(() => {
          console.log("Document successfully deleted!");
          window.location.reload();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    // Function to convert currency while adding expense
    async convertCurrency() {
      var url = 'https://currency-converter5.p.rapidapi.com/currency/convert';
      var XRapidAPIKey = '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
      var XRapidAPIHost = 'currency-converter5.p.rapidapi.com';
      var amount = document.getElementById("moneymoneyahhhhh").value;
      var from = document.getElementById("currencylist").value;
      var to = document.getElementById("currencylisttoconvert").value;
      console.log(from);
      console.log(to);
      axios.get(url, {
        headers: {
          'x-rapidapi-key': XRapidAPIKey,
          'x-rapidapi-host': XRapidAPIHost
        },
        params: {
          amount: amount,
          from: from,
          to: to
        }
      })
        .then(function (response) {
          console.log(response.data);
          var convertedmoney = response.data.rates[to].rate_for_amount;
          var convertedmoneydiv = document.getElementById("convertedmoney");
          var html = "<h7>" + convertedmoney + "</h7>";
          convertedmoneydiv.innerHTML = html;
        })
    },

    // Function to validate expense is not empty
    checkempty() {
      if (this.expense.currency == null || this.expense.expenseName == null || this.expense.expenseAmount == null || this.expense.personOwedName == null || this.inputValue == '') {
        alert("Please fill in all fields")
      } else {
        this.addExpense();
      }
    },

    // Function to get list of currencies to calculate expense
    async getCurrencyList() {
      try {
        const response = await axios.get('https://currency-converter5.p.rapidapi.com/currency/list', {
          headers: {
            'x-rapidapi-key': '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0',
            'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
          },
        });
        console.log(response.data);
        for (var key in response.data.currencies) {
          var value = response.data.currencies[key];
          this.currencyList.push({ key, value });
        }
        //sort currency list by alphabet
        this.currencyList.sort(function (a, b) {
          if (a.value < b.value) { return -1; }
          if (a.value > b.value) { return 1; }
          return 0;
        })

      } catch (error) {
        console.log(error);
      }
    },

    // Function to compute different ways of splitting expense
    computeexpense() {
      this.quicksettleamount = [];
      let amount = this.expense.expenseAmount;
      if (this.custom.length > 0) {
        let sum = 0
        for (let i = 0; i < this.custom.length; i++) {
          sum += this.custom[i];
        }
        if (sum != this.expense.expenseAmount) {
          alert("Please make sure the percentages add up to the amount owed!")
        }
        else {
          for (let i = 0; i < this.custom.length; i++) {
            this.quicksettleamount.push(this.custom[i]);
          }
        }
      }
      if (this.shares.length > 0) {
        let totalshares = 0;
        for (let i = 0; i < this.shares.length; i++) {
          totalshares += this.shares[i];
        }
        for (let i = 0; i < this.shares.length; i++) {
          this.quicksettleamount.push(this.shares[i] * amount / totalshares);
        }
      }
      if (this.percentages.length > 0) {
        let totalpercentage = 0;
        for (let i = 0; i < this.percentages.length; i++) {
          totalpercentage += this.percentages[i];
        }
        if (totalpercentage != 100) {
          alert("Please make sure the percentages add up to 100!")
        }
        else {
          for (let i = 0; i < this.percentages.length; i++) {
            this.quicksettleamount.push(this.percentages[i] * amount / 100);
          }
        }
      }
    }
  },

  // Function to get list of trips and whoOwesWho from database
  async created() {
    // Getting list of trips from database
    setTimeout(() => {
      getDocs(this.tripsRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.trips.push(doc.id);
        });
      });
    }, 800);

    // Getting whoOwesWho from database
    const querySnapshot1 = await getDocs(doc(this.tripsRef, this.trip, 'whoOwesWho'));
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.whoOwesWho = doc.data();
      console.log(this.whoOwesWho)
    });
  },

  // Function to show updated list of expenses on trip page
  async updated() {
    onSnapshot(collection(this.tripsRef, this.trip, 'expenses'), (querySnapshot) => {
      if (this.expenses.length > 0) {
        this.expenses = [];
      }
      querySnapshot.docs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.docId.push(doc.id);
        this.expenses.push(doc.data());
      });
    });
  },
  components:{
    expensecards,splittercards
  }
}
</script>