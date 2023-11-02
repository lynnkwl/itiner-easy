<template>
    <div>
        <router-link to="/billbuddy">
            <button class="btn btn-primary">Back to Trips</button>
        </router-link>
        <h1>Add Trip</h1>
        <form @submit.prevent="submitForm">
            <label for="destination">Destination:</label>
            <input type="text" id="destination" v-model="destination" required>
            Which Currency do you use normally!
            <br>
            <select class="w-9/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="currencylist" id="currencylist" @change="convertit">
                    <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                        {{ currency.value }} </option>
            </select>
            <!-- <br><br> -->
            <!-- <label for="start-date">Start Date:</label>
            <input type="date" id="start-date" v-model="startDate" required>
            <br><br>
            <label for="end-date">End Date:</label>
            <input type="date" id="end-date" v-model="endDate" required>
            <br><br> -->
            <!-- <h2>Expenses:</h2>
            <div v-for="(expense, index) in expenses" :key="index">
                <label>Expense {{ index + 1 }}:</label>
                &nbsp;
                <input type="text" placeholder="Expense Name" v-model="expense.name" required>
                &nbsp;
                <input type="number" placeholder="Amount Spent" v-model="expense.amount" required>
                &nbsp;                
                <button type="button" @click="removeExpense(index)">Remove</button>
            </div>
            <button type="button" @click="addExpense">Add Expense</button> -->
            <br><br>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    data() {
        return {
            destination: '',
            // startDate: '',
            // endDate: '',
            // expenses: [{ name: '', amount: '' }]
            db: null,
            auth: null,
            tripsRef: null,
            uid: null,
            currencyList: [],

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
        addExpense() {
            this.expenses.push({ name: '', amount: '' })
        },
        removeExpense(index) {
            this.expenses.splice(index, 1)
        },
        submitForm() {
            setDoc(doc(this.tripsRef, this.destination), {
                whoOwesWho: {}
            })
            console.log(this.destination)
            console.log(this.tripsRef)
        },
        async getCurrencyList() {
  try {
    const response = await axios.get('https://currency-converter5.p.rapidapi.com/currency/list', {
      headers: {
        'x-rapidapi-key': '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0',
        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
      },
    });
    console.log(response.data);
    for(var key in response.data.currencies) {
      var value = response.data.currencies[key];
      this.currencyList.push({key, value});
    }
    //sort currency list by alphabet
    this.currencyList.sort(function(a, b){
      if(a.value < b.value) { return -1; }
      if(a.value > b.value) { return 1; }
      return 0;
    })
    
  } catch (error) {
    console.log(error);
  }
},
    }
}
</script>
<style>
body {
    background-color: #05c8f7;
}
</style>