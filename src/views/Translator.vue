<template>
<div class="bg-white">
  <div class="col-4 pad" style="margin-left: 15px; margin-top: 15px;">
        <div class="card">
          <h3>Language Translator</h3>
          <h7>What language are you typing?</h7>
                    <select name="inputlanguage" id="inputlanguage">
                    <option v-for="language in languages" :key="language.language" :value="language.language">
                        {{ language.name }} </option>
                    </select>
                    <br>
                    <label for="text">Text to translate:</label>
                    <br>
                    <textarea class="form-control" id="text" name="text" rows="3" cols="30" @change="translateText"></textarea>
                    <br><br>
                    <h7>Which language do you want to translate to?</h7>
                          <select name="language" id="outputlanguage">
                          <option v-for="language in languages" :key="language.language" :value="language.language">
                              {{ language.name }} </option>
                          </select>
                    <br>
                        <div v-if="output_text != ''">
                            <h7>Translated Text:</h7>
                            <br>
                              {{ output_text  }}

                        </div>
                    <br>
                    <button @click="translateText">Translate</button>

      </div>
      </div>
</div>
</template>

<script>
import axios from 'axios'; // Import Axios
export default {
  mounted() {
    this.getLanguages();
  },
  data() {
    return {
      country: '',
      weatherData: [],
      inputLanguage: '',
      outputLanguage: '',
      textToTranslate: '',
      translatedText: '',
      currencyList: [],
      languages: [],
      selectedCurrency: '',
      amountToConvert: '',
      selectedCurrencyToConvert: '',
      convertedAmount: '',
      output_text: '',
    };
  },
  methods: {

  async getLanguages() {
      // Move your Axios code for fetching languages here
      const key ="AIzaSyCjKtOTNCtEK5MYtW-GrP5QUiCj72PCT9Q";
      axios.get('https://translation.googleapis.com/language/translate/v2/languages?key='+key+'&target=en')
        .then(function(response) {
            console.log(response.data);
            var languages = response.data.data.languages;
            var languagesdiv = document.getElementById("inputlanguage");
            var languagesdiv2 = document.getElementById("outputlanguage");
            var html = "";
            for(var i=0;i<languages.length;i++){
                html += "<option value="+languages[i].language+">"+languages[i].name+"</option>";
            }
            languagesdiv.innerHTML = "<option value=detect> Detect Language</option>" + html;
            languagesdiv2.innerHTML = html;

        })
        .catch(function(error){
            console.log(error);
        })
    },
    async translateText() {
  // Move your Axios code for text translation here
  var text = document.getElementById("text").value;
  var inputlang = document.getElementById("inputlanguage").value;
  var language = document.getElementById("outputlanguage").value;
  console.log(text);
  console.log(language);
  var key ="AIzaSyCjKtOTNCtEK5MYtW-GrP5QUiCj72PCT9Q";
  if(inputlang === "detect"){
    axios.get('https://translation.googleapis.com/language/translate/v2?key='+key+'&q='+text+'&target='+language)
      .then(response => {
        console.log(response.data);
        var translatedtext = response.data.data.translations[0].translatedText;
        console.log(translatedtext);
        this.$data.output_text = translatedtext; // Set the output_text property using this.$data
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    var inputlang = document.getElementById("inputlanguage").value;
    axios.get('https://translation.googleapis.com/language/translate/v2?key='+key+'&q='+text+'&target='+language+'&source='+inputlang)
      .then(response => {
        console.log(response.data);
        var translatedtext = response.data.data.translations[0].translatedText;
        console.log(translatedtext);
        this.$data.output_text = translatedtext; // Set the output_text property using this.$data
      })
      .catch(error => {
        console.log(error);
      });
  }
},
    

  created() {
    this.getLanguages();
    // this.getCurrencyList();
  },
}
};


</script>