<template>
      <div class="col-4 pad" style="margin-left: 15px; margin-top: 15px;">
        <div class="card">

          <h3>Currency Converter</h3>
          <br>
                    <label for="currencylist">Which currency are you using?</label>
                    <br><br>
                        <select name="currencylist" id="currencylist" @change="convertit">
                            <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                                {{ currency.value }} </option>
                        </select>
                    <br><br>
                    <label for="text">Amount</label>
                    <br>
                    <input type="number" id="moneymoneyahhhhh" @change="convertCurrency">
                    <br>
                    <br>
                    <h7>Which Currency do you want to convert to?</h7>
                    <br><br>
                    <select name="currencylisttoconvert" id="currencylisttoconvert" @change="convertCurrency">
                        <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                                {{ currency.value }} </option>
                    </select>
                    <h6>Converted amount</h6>
                    <br>
                    <div id="convertedmoney" class="background">
                    <h3>{{ convertedAmount }}</h3>
                    <h3 v-if="convertedAmount == ''">Please key in a value!</h3>
                    </div>
                    <br>
                    <button @click="convertCurrency" class="btn-primary">Convert</button>
                    </div>
                    </div>
</template>
<script>
import axios from 'axios'; // Import Axios
export default {
  mounted() {
    this.getCurrencyList();
  },
  data() {
    return {
      currencyList: [],
      selectedCurrency: '',
      amountToConvert: '',
      selectedCurrencyToConvert: '',
      convertedAmount: '',
    };
  },
  methods: {
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
  } catch (error) {
    console.log(error);
  }
},

      async convertCurrency() {
  var url= 'https://currency-converter5.p.rapidapi.com/currency/convert';
  var XRapidAPIKey= '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
  var XRapidAPIHost= 'currency-converter5.p.rapidapi.com';
  var amount = document.getElementById("moneymoneyahhhhh").value;
  var from = document.getElementById("currencylist").value;
  var to = document.getElementById("currencylisttoconvert").value;
  console.log(from);
  console.log(to);
  try {
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': XRapidAPIKey,
        'x-rapidapi-host': XRapidAPIHost
      },
      params: {
        amount: amount,
        from: from,
        to: to
      }
    });
    console.log(response.data);
    this.convertedAmount = response.data.amount; // Set the convertedAmount property
  } catch (error) {
    console.log(error);
  }
},
}};

</script>


