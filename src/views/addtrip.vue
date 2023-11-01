<template>
    <div>
        <router-link to="/billbuddy">
            <button class="btn btn-primary">Back to Trips</button>
        </router-link>
        <h1>Add Trip</h1>
        <form @submit.prevent="submitForm">
            <label for="destination">Destination:</label>
            <input type="text" id="destination" v-model="destination" required>
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
        }
    }
}
</script>
<style>
body {
    background-color: #05c8f7;
}
</style>