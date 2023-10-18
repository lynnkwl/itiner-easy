<template>
    <div>
        <h1>Add Trip</h1>
        <form @submit.prevent="submitForm">
            <label for="destination">Destination:</label>
            <input type="text" id="destination" v-model="destination" required>
            <br><br>
            <label for="start-date">Start Date:</label>
            <input type="date" id="start-date" v-model="startDate" required>
            <br><br>
            <label for="end-date">End Date:</label>
            <input type="date" id="end-date" v-model="endDate" required>
            <br><br>
            <h2>Expenses:</h2>
            <div v-for="(expense, index) in expenses" :key="index">
                <label>Expense {{ index + 1 }}:</label>
                &nbsp;
                <input type="text" placeholder="Expense Name" v-model="expense.name" required>
                &nbsp;
                <input type="number" placeholder="Amount Spent" v-model="expense.amount" required>
                &nbsp;                
                <button type="button" @click="removeExpense(index)">Remove</button>
            </div>
            <button type="button" @click="addExpense">Add Expense</button>
            <br><br>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            destination: '',
            startDate: '',
            endDate: '',
            expenses: [{ name: '', amount: '' }]
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
            const trip = {
                destination: this.destination,
                startDate: this.startDate,
                endDate: this.endDate,
                expenses: this.expenses
            }
            console.log(trip) // replace with your own logic to submit the form data
        }
    }
}
</script>
<style>
body {
  background-color: #05c8f7;
}
</style>