<style>
  #map{
    /* height: 100%; */
    width: 100%;  
  }

</style>
<!-- OLD FORM -->
<!-- <div class="rounded-lg border-blue bg-blue-100 mx-5"> -->
    <!-- user input box: start -->
    <!-- <div class="flex flex-col content-start">
        <div class="flex justify-center items-center "> 
            <label class="" for="country">Where are you headed to?</label>
            &nbsp;
            &nbsp;
            <div class="pb-4">
              <input type="text" id="country" name="City"  v-model="town" class="placeholder-white mt-4 w-80 form-control input-sm rounded bg-blue-400 text-white " placeholder="Enter destination" required>
            </div> 
        </div>
        
        <div class="slidecontainer flex justify-center items-center">
            <label class="object-left">For how many days?</label>
            &nbsp;
            &nbsp;
            <div>
              <input class="w-full" type="range" min="1" max="3" step="1" v-model="sliderValue" @input="sliderChange" required />
            </div>
            &nbsp;
            &nbsp;
            <p>Days: {{ sliderValue }}</p>
        </div>
    </div> -->

<template>
  <h1 class="text-3xl text-center text-blue-400 mt-5">Let's plan your next trip!</h1>
  <div class="flex justify-center"> 
    <FormKit type="form"
          :actions="false"
          >
              <FormKit type="multi-step"
              tab-style="progress"
              :allow-incomplete="false"   
              >
              <!-- Destination: start -->
                  <FormKit type="step" name="Destination">
                  <!-- collect name, email, and company info -->
                      <FormKit 
                          v-model="town"
                          type="text" 
                          label="Destination" 
                          validation="required"
                      />
                      <FormKit 
                          v-model="sliderValue"
                          type="range" 
                          label="Duration" 
                          validation="required"
                          value=""
                          min="1"
                          max="3" 
                      />
                    <!-- reformat to change day/days based on value -->
                      <p>Days: {{ sliderValue }}</p>
                      
                  </FormKit>
              <!-- Destination: end -->
            

              <!-- preferences: start -->
                  <FormKit type="step" name="Preferences">
                  <!-- Get talk title, brief, and track -->
                  <FormKit 
                      type="radio" 
                      label="Outdoors or Indoors?" 
                      help="Which type of setting do you prefer?" 
                      validation="required"
                      v-model="outgoing"
                      :options="[
                          'Outdoors',
                          'Indoors',
                          'I\'m fine with either',
                      ]"
                  />
                  <FormKit 
                      v-model= "interestsoptions"
                      type="checkbox"
                      label="Places of Interest (optional)"
                      help="Any specific places you'd like to visit?" 
                      :options="[
                          'Museums',
                          'Shopping Malls',
                          'Gardens',
                      ]"
                  />
                  <FormKit 
                      v-model="transport"
                      type="radio" 
                      label="Mode of Transportation"
                      help="How will you be getting around?"
                      :options="[{label:'Car', value:`DRIVING`}, {label: 'Public Transport', value: `TRANSIT`}, {label:'Bicycle', value:`BICYCLING`}, {value:'WALKING' , label:'Walking'}]"
                  />
                  </FormKit>
              <!-- preferences: end -->

              <!-- Generate: start -->
                <FormKit type="step" name="Let's go!">
                  <!-- Ask the user to share how they heard about us -->
                  <div class="text-center">
                    <h1>Great! Now that we've gathered all the information we need...</h1>
                  </div>
                  <br>
                  <br>
                  <h2 class="text-center">Are you ready?</h2>
                  <br>
                  <br>
                  <template #stepNext>    
                    <FormKit type="button"
                    @click="checkempty"
                    label="Generate an Itinerary for me!"
                    />

                  
                    <!-- <FormKit type="button" 
                     style="background-color: #4CAF50; /* Green */; position: relative; left: 50%; transform: translate(-50%, 0%);"
                      @click="checkempty2"
                      label="I'll decide myself!"/> -->

                  </template>
              <!-- Generate: end -->
              </FormKit>
            </FormKit>
          </FormKit>      
    </div>
  
<!-- </div>  -->
  <!-- user input box: end -->
          
          <!-- What kind of person are you?<br>
              <input type="radio" id="Indoor" value="Indoor" v-model="outgoing" required>
              <label for="Indoor">Indoor</label>
              <input type="radio" id="Outdoor"  value="Outdoor" v-model="outgoing" required>
              <label for="Outdoor">Outdoor</label>
              <input type="radio" id="Both"  value="Both" v-model="outgoing" required >
              <label for="Both">I'm fine with either!</label>
                <br>
                    Are there any places you would prefer to visit?(optional)
                <br>
              <input type="checkbox" id="Museums" name="interests" value="Museums">
              <label for="Museums">Museums</label>
              <input type="checkbox" id="Shopping Malls" name="interests" value="Shopping Malls">
              <label for="Shopping Malls">Shopping Malls</label>
              <input type="checkbox" id="Gardens" name="interests" value="Gardens">
              <label for="Gardens">Gardens</label>
                <br>
          How will you be getting around?<br>
          <input type="radio" id="car" value="DRIVING" v-model="transport" required>
          <label for="car">Car</label>
          <input type="radio" id="Public Transport" value="TRANSIT"  v-model="transport" required>
          <label for="Public Transport">Public Transport</label>
          <input type="radio" id="Cycling" value = "BICYCLING"  v-model="transport" required>
          <label for="Cycling">Bicycle</label>
          <input type="radio" id="walking" value="WALKING"  v-model="transport" required>
          <label for="walking">Walking</label>
                <br>
                <br>
                <br>
              <button @click="checkempty2" name="strongindependentwoman">I want to choose where I can go!</button><br> -->

<div id="selectplaces">
  <div v-if="strongIndependentWoman">
    
    <h3> Choose where you want to go!</h3>
    <table>
      <tr>
        <th>Place</th>
        <th>Address</th>
        <th>Select</th>
      </tr>
      <tbody>
            <tr v-for="act in suggested_activities" :key="act.name">
              <td>
                <label>
                  {{ act.name }}
                </label>
              </td>
              <td>
                <!-- add photo -->
                <img :src="act.photo" alt="Activity photo" style="width: 100px; height: 100px;">
              </td>
              <td>
                {{ act.formatted_address }}
              </td>
              <td>
                <input type="checkbox" :value="act" v-model="selectedPlaces">
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</div>

<div v-if="final_activities.length>0">
  <div class="m-5">
      <!-- getmap -->
      <!-- create table each day -->
        <div v-for="(day, index) in activitiesandtime" :key="index">
            <div class="flex pb-5 sticky top-0 z-10">
              <div class="w-80 border p-3 rounded-md bg-blue-300">
                <h1>Day {{ index + 1 }}</h1>
                <h3 class="text-gray-500">Date: {{ day.date }}</h3>
              
              <!-- Weather reminder -->
                <div>
                  <div class="font-bold">Weather: {{ day.weather }}
                    <span v-if="day.weather.includes('sunny')">☀️</span>
                    <span v-if="day.weather.includes('hazy')">💨</span>
                    <span v-if="day.weather.includes('rain')">🌧️</span>
                  </div>
                  <div v-if="day.weather.includes('sunny')">Bring sunscreen!!</div>
                  <div v-if="day.weather.includes('hazy')">Bring a mask!!</div>
                  <div v-if="day.weather.includes('rain')">Bring an umbrella!! ☂️</div>
                </div>
              </div>

              <div v-if="index == 0" class="w-full flex justify-end">
                 <button class="btn mt-7 mr-5" @click="saveItinerary">Save Itinerary</button>
              </div>
            </div>

            <div class="flex">   
              <div>
                <!-- loop through activities: start-->
                <div v-for="activity in day.activities" :key="activity.name">
                  <!-- display activities -->
                  <div v-if="activity.formatted_address !== 'Travel'" class="pr-5">
                    <div class="card flex max-w-sm rounded overflow-hidden shadow-lg bg-blue-100 justify-center">
                      <img class="w-2/3 h-32 self-center rounded-md" :src="activity.photo" alt="image of attraction">
                        <div class="px-6 py-4">
                          <h3 class="text-gray-400">{{ activity.name }}</h3>
                          <p class="text-gray-700 text-base">
                            {{ activity.time }} - {{ activity.endtime }}
                          </p>
                          <p class="text-gray-700 text-base">
                            {{ activity.formatted_address}}
                          </p>
                        </div>
                      <div>
                        <input class="mb-2 rounded border-none" placeholder="Add notes here" type="text" v-model="activity.remarks"><br>
                        <span class="text-black text-sm">Cost: </span><input class="placeholder-gray-400 rounded border-none" placeholder="Add an expense here" type="number" v-model="activity.expense"><br>
                      </div>
                      <div class="flex flex-col px-6 pt-4 pb-2 items-center">
                          <button class="btn mb-2 w-2/3" href="#" @click="showLocation(activity)">Show on Map</button>
                          <button class="btn w-2/3" href="#" @click="geteateriesnearby(activity)">Where to eat?</button>
                      </div>
                    </div>
                  </div>
                    <!-- loop through activities: end-->

                    <!-- loop through travel: start-->
                  <div v-else class="pr-5">
                    <div class="ml-8 max-w-sm max-h-xs rounded overflow-hidden border-l-4 border-dashed border-gray-700">
                      <!-- <img class="w-full h-20" src="../components/logo/itiner-easy.svg" alt="travel"> -->
                      <div class="px-6 py-4">
                        <div class="font-bold text-sm mb-2">{{ activity.name }}</div>
                        <p class="text-gray-700 text-base">
                          {{ activity.time }} - {{ activity.endtime }}
                        </p>
                      </div>
                        <button class="btn w-max self-center ml-5 mb-5" href="#" @click="displaydirectionsonmap(day.activities[day.activities.indexOf(activity) - 1].geometry.location, day.activities[day.activities.indexOf(activity) + 1].geometry.location)">The way there!</button>
                    </div>
                  </div>
                  
                </div>
              </div>
        
        <div id="map" class="sticky top-0 rounded"></div>
      </div>
  </div>
</div>
        <!-- <td v-if="activity.name.includes('Travel')"></td>
          <td v-else>
            <input placeholder="Add notes here" class="rounded " type="text" v-model="activity.remarks"><br>
            Expenses: <input type="number" v-model="activity.expense"><br>
            My Rating: 1<input type="range" min="1" max="5" v-model="activity.rating">5
          </td> -->
        <!-- card: end -->

          <!-- <td>
            <label>
              {{ activity.name }}
            </label>
          </td>
          <td>
            {{ activity.time }} - {{ activity.endtime }}
          </td>
          <td>
            <img :src="activity.photo" v-if="activity.formatted_address !== 'Travel'" style="width: 100px; height: 100px;">
            <img v-else src ="https://i.pinimg.com/originals/c0/c2/5a/c0c25a5a71939b968e67deb530854641.png" alt="../components/logo/itiner-easy.svg" style="width: 100px; height: 100px;">
          </td>
          <td>
            {{ activity.formatted_address}}
          </td>
          <td>
            <a href="#" v-if="activity.formatted_address !== 'Travel'"  @click="showLocation(activity)">Show on Map</a>
            <a href="#" v-else></a>
          </td> 
          <td>
            if its a travel display route
            <a v-if="activity.name.includes('Travel')" href="#" @click="displaydirectionsonmap(day.activities[day.activities.indexOf(activity) - 1].geometry.location, day.activities[day.activities.indexOf(activity) + 1].geometry.location)">The way there!</a>
            if its not a travel display eateries
            <a v-else href="#" @click="geteateriesnearby(activity)">Where to eat!</a>
          </td> -->


      
      <br>
    <table v-if="eateries.length>0">
      <tr colspan = "3"><th>Eateries</th></tr>
      <tr><th>Name</th><th>Address</th><th>Photo</th><th>Price Level</th><th>Rating</th><th>Map Details</th><th>How to get there!</th><th>Remarks</th></tr>
      <tbody>
        <tr v-for="eatery in eateries" :key="eatery.name">
          <td>
            <label>
              {{ eatery.name }}
            </label>
          </td>
          <td>
            {{ eatery.vicinity}}
          </td>
          <td>
            <img :src="eatery.photo" style="width: 100px; height: 100px;">
          </td>
          <td>
            {{ eatery.price_level }}
          </td>
          <td>
            {{ eatery.rating }}
          </td>
          <td>
            <a href="#" @click="showLocation(eatery,eatery)">Show on Map</a>
          </td>
          <td>
            <a href="#" @click="displaydirectionsonmap(eatery.origin, eatery.geometry.location)">Show Route</a>
          </td>
          <td v-if="eatery.formatted_address !== 'Travel'">
            Remarks: <input type="text" v-model="eatery.remarks"><br>
            Expenses: <input type="number" v-model="eatery.expense"><br>
            My Rating: 1<input type="slider" min="1" max="5" v-model="eatery.rating">5
          </td>
          <!-- <td>
            I want to eat here<input name = "eateries{{ index }}" type="radio" :value="eatery" @click="addeaterytotrip(eatery,)" v-model="selectedEateries">
          </td> -->
          
        </tr>
      </tbody>
    </table>

  </div>
<div>
  <!-- <h3>Please input a city and Click on Generate Itinerary to get started!</h3> -->
</div>
<!-- <div>
  <button @click="checkempty">Generate Itinerary</button>

</div> -->
<div v-if="customactivitiesandtime">

</div>

</template>



<script >
import axios from 'axios'; // Import Axios
import { initMap } from "../main.js"
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import itineraryRouter from "../router/index.js";
const auth = getAuth();
const db = getFirestore();
const tripsRef = collection(db, 'trips');

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in', user.uid + " " + user.email)
    const uid = user.uid;
  } else {
    console.log('User is signed out')
  }
});

export default {
  mounted(){
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrtlMuj3mZnI5NGVkgw5ME1hZL-XEtRzI&libraries=places&callback=initMap';
    script.defer = true;
    script.async = true;
    //add main.js
    document.head.appendChild(script);
    window.history.scrollRestoration = "manual";

  },
  data() {
    return {
      sliderValue: 1,
      selectedOption: null, // Initially no option is selected
      town: "",
      outgoing: "",
      transport: "",
      strongIndependentWoman: false,
      places: [], // To store search results
      selectedPlaces: [], // To store selected places
      interestsresults: [],
      generatenow: false,
      map: null,
      days: 0,
      final_activities : [],
      eateries: [],
      activitiesandtime: [],
      photoUrl: "",
      weatherData: [],
      suggested_activities: [],
      isOpenNow: false,
      twelvehrtime: "",
      dates: [],
      citycoords: {},
      interestsoptions:[],
      customactivitiesandtime: [],
      possiblephotos: [],
    };
  },
    methods: {
        sliderChange(event) {
        this.sliderValue = event.target.value;
        },

        
//weather api

async getweather() {
    return new Promise(async (resolve, reject) => {
        var city = this.town;
        var days = this.sliderValue;
        this.dates = [];

        try {
            var weatherkey ="cfb27632a44746f6aaf01356231409";
            const response = await axios.get(
                'http://api.weatherapi.com/v1/forecast.json?key=' + weatherkey + '&q=' + city + '&days=' + days
            );
            console.log(response.data);
            var weather = response.data.forecast.forecastday;
            var weatherarray = [];
  

            for (var i = 0; i < weather.length; i++) {
                var weatherobj = {};
                weatherarray.push(weather[i].day.condition.text);
                this.weatherData = weatherarray;
                this.dates.push(weather[i].date);
            }
            console.log(this.dates);

            resolve(weatherarray);
        } catch (error) {
            reject(error);
        }
    });
},
//getplaces
async searchBothAttractions(city) {
    var city = this.town;
    var request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };



    var service = new google.maps.places.PlacesService(document.createElement('div'));


    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.places = this.places.concat(results);
        console.log(this.places);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},
  async getlist2(city) {
    var city = this.town;

    this.suggested_activities = [];
    var request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id', 'photo'],
    };
    
    this.getinterests(city);

    var service = new google.maps.places.PlacesService(document.createElement('div'));


    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (const place of results) {

            console.log(place);
        }
        //place results in checkbox
        this.suggested_activities = results;
        //add museums, gardens and malls if checked
        if(this.interestsresults != null){
          this.suggested_activities = this.suggested_activities.concat(this.interestsresults);
        }
        //remove any duplicates in suggest_activities
        this.suggested_activities = [...new Set(this.suggested_activities)];
        console.log(this.suggested_activities);
        console.log(this.strongIndependentWoman);
      }
      
         else {
        console.error(`Error: ${status}`);
        }
    });
    },

  async getactivitieslist(){
    console.log(this.selectedPlaces[0]);
    this.final_activities = [];
    this.places = [];
    if(this.outgoing == "Indoor"){
      await this.searchIndoorAttractions();
    }
    else if(this.outgoing == "Outdoor"){
      await this.searchOutdoorAttractions();
    }
    else{
      await this.searchBothAttractions();
    }
    //get interests from museums, shopping malls and parks if ticked and add to this.places
    await this.getinterests();
    if(this.selectedPlaces.length === 0){
      if(this.interestsresults != null){
        this.final_activities = this.final_activities.concat(this.interestsresults);
        this.final_activities = this.final_activities.concat(this.places);
    }
      else{
        this.final_activities = this.final_activities.concat(this.places);
      }
    }


    else{
        this.final_activities = this.final_activities.concat(this.selectedPlaces);
        if(this.final_activities< 5 * this.days){
            //fill up with other activities from interestsresults or this.places  until 5 activities per day
            while(this.final_activities.length < 5 * this.days){
                var combinedact = this.places.concat(this.interestsresults);
                var randomIndex = Math.floor(Math.random() * combinedact.length);
                var randomactivity = combinedact[randomIndex];
                this.final_activities.push(randomactivity);
            }
        }
    }

    this.final_activities = [...new Set(this.final_activities)];
    console.log(this.final_activities);
    await this.managetime();
    await this.getLatLng();
    initMap(this.citycoords);
    },
    async converttime(time, act){
  // time = 940; //goal is to convert this to 1110

    let addhour = Math.floor(act/60);
    let addmin = act%60;
    let formattime = time + addhour*100 + addmin;
    while(formattime % 100 > 59){
      formattime = formattime + (Math.floor(formattime/100))%60;
    }
    return formattime;
    }
    ,
    initMap(coords) {
  const mapDiv = document.getElementById("map");
  const mapOptions = {
    center: coords,
    zoom: 15,
  };
  const map = new google.maps.Map(mapDiv, mapOptions);
}
    ,


    async getLatLng (){
      var city = this.town;
      this.citycoords = {};
      var request = {
        query: `${city}`,
        fields: ['name', 'geometry'],
      };
      var service = new google.maps.places.PlacesService(document.createElement('div'));
      return new Promise((resolve, reject) => {
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.citycoords = results[0].geometry.location;
          console.log(this.citycoords);
          resolve(results); // Resolve the promise with the search results
        } else {
          console.error(`Error: ${status}`);
          reject(status); // Reject the promise with the error status
        }
      })});
    },

  async managetime() {
  this.days = this.sliderValue;
  this.activitiesandtime = [];
  for (var i = 0; i < this.days; i++) {
    let timeint = 900;
    let maxtimeint = 2100;
    var actorder = 0;
    var day = {};
    day.activities = [];
    day.day = i + 1;
    day.date = this.dates[i];
    day.weather = this.weatherData[i];
    while (timeint < maxtimeint) {
      if (this.final_activities.length === 0) {
        console.log("No more activities to add.");
        break;
      } 
      else {
        //convert timeint to string with pm or am     
        //checkopenstatus if business is open at that time if closed find another place
        var randomIndex = Math.floor(Math.random() * this.final_activities.length);
        var randomactivity = this.final_activities[randomIndex];
        await this.checkOpenStatus(randomactivity, timeint, this.dates[i]);
        console.log(this.isOpenNow);
        while (this.isOpenNow == false) {
          randomIndex = Math.floor(Math.random() * this.final_activities.length);
          randomactivity = this.final_activities[randomIndex];
          await this.checkOpenStatus(randomactivity, timeint, this.dates[i]);
        }
        
        var activitytime = 0;
        // Adjust activity time calculation as needed
        if (randomactivity.types.includes("park") || randomactivity.types.includes("zoo") || randomactivity.types.includes("amusement_park")) {
          activitytime = 120;
        } else {
          activitytime = 180;
        }
        //gettraveltime
        var traveltime = 0;
        if(day.activities.length > 0){
          var lastactivity = day.activities[day.activities.length - 1];
          var lastactivitycoords = lastactivity.geometry.location;
          var randomactivitycoords = randomactivity.geometry.location;
          var request = {
            origin: lastactivitycoords,
            destination: randomactivitycoords,
            travelMode: this.transport,
          };
          console.log(lastactivity);
          var service = new google.maps.DirectionsService();
          //use promise
          await new Promise((resolve, reject) => {
            service.route(request, (result, status) => {
              if (status == 'OK') {
                traveltime = result.routes[0].legs[0].duration.value;
                traveltime = Math.round(traveltime / 60);
                resolve(result);
              }
              else{
                reject(status);
              }
            });
          });
        }
        // Add travel time to 'timeint'
        //if result resolved
        if(traveltime !=0){
        var endtime = await this.converttime(timeint, traveltime);
        if(endtime > 2100){
          endtime = 2200;
        }
        var travelactivity = {
          name: "Travel from " + lastactivity.name + " to " + randomactivity.name,
          time: await this.formatTime(timeint),
          endtime: await this.formatTime(endtime),
          formatted_address: "Travel",
          transport: this.transport,
          order : actorder,
          // geometry: randomactivity.geometry,
        };
        actorder = actorder + 1;
        day.activities.push(travelactivity);
        timeint = endtime;
        }
        // Create the activity object
        var endtime = await this.converttime(timeint, activitytime);
        var photo = "";
        photo = await this.getphoto(randomactivity.place_id);

        var activity = {
          order : actorder,
          day : i,
          name: randomactivity.name,
          time: await this.formatTime(timeint), // Format time as a string
          endtime: await this.formatTime(endtime), // Format endtime as a string
          formatted_address: randomactivity.formatted_address,
          transport: this.transport,
          geometry: randomactivity.geometry,
          photo: photo,
          remarks: "",
          expense: 0,
          rating: 3,
          url: "'https://www.google.com/search?q=" + randomactivity.name + "&rlz=1C1CHBF_enSG941SG941&oq=google&aqs=chrome..69i57j69i59j69i60l3j69i65l2.1001j0j7&sourceid=chrome&ie=UTF-8'",
        }; 
        //store activities in each day
        actorder = actorder + 1;
        day.activities.push(activity);
        // Update 'timeint' for the next activity
        timeint = endtime;
        // Add the activity to 'activitiesandtime' and remove it from 'final_activities'

        this.final_activities.splice(randomIndex, 1);

        console.log("Added activity:", activity);
      }
    }
    this.activitiesandtime.push(day);

  }

  // Debugging: Log the contents of activitiesandtime
  console.log("Final activitiesandtime:", this.activitiesandtime);
}
,
async displaydirectionsonmap(origin, destination){
  event.preventDefault();
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: { lat: 41.85, lng: -87.65 }
  });
  directionsRenderer.setMap(map);
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: this.transport,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
},
async formatTime(minutes) {
  const hours = Math.floor(minutes / 100);
  const mins = minutes % 100;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  return `${formattedHours}:${formattedMins}`;
},


async formattimestrfrom24hourto12hour(input) {
  const strTime = input.toString().padStart(4, '0'); // Pad with leading zeros
  const hours = strTime.substring(0, 2); // Extract hours
  const minutes = strTime.substring(2); // Extract minutes

  // Convert to a format like "09:00 AM" or "09:00 PM"
  //if first string no 0 then add 0
  if (hours.substring(0, 1) != 0) {
    this.twelvehrtime = `${hours}:${minutes}`
  }
  else{
  this.twelvehrtime = `0${hours % 12}:${minutes}`
}},

    

    //   to search for attractions in a city
    async searchIndoorAttractions(city) {
    var city = this.town;
    var request = {
        query: `Shopping malls and mueseums and aquariums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };


    var service = new google.maps.places.PlacesService(document.createElement('div'));
    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.places = this.places.concat(results);
        console.log(this.places);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},

async titlephotogenerator() {
  // get photos of town using Google Place Photos API
  let townsearched = this.town;
  let request = {
    query: townsearched,
    fields: ['photos'],
  };
  let service = new google.maps.places.PlacesService(document.createElement('div'));

  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let place = results[0];
      let photos = place.photos;
      if (!photos) {
        return;
      }
      let photoUrls = photos.map(photo => photo.getUrl({ maxWidth: 1280, maxHeight: 853 }));
      this.possiblephotos = photoUrls;
    }
  });
},


    async searchOutdoorAttractions(city) {
    var city = document.getElementById("country").value;
    var request = {
        query: `Outdoor Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };
    
    var service = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.places = this.places.concat(results);
        console.log(this.places);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},
    async getinterests(){
    var interests = [];
    var checkboxes = this.interestsoptions
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            interests.push(checkboxes[i].value);
        }
    }
    for (var i = 0; i < interests.length; i++) {
        if (interests[i] == "Museums") {
          await  this.SearchMuseums();
        } else if (interests[i] == "Shopping Malls") {
          await this.searchShoppingMalls();
        } else if (interests[i] == "Gardens") {
          await this.searchgardens();
        }
    }
  },
  async SearchMuseums(city) {
    var city = this.town;
    var request = {
        query: `Museums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // getphoto using place id
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.interestsresults = this.interestsresults.concat(results);
        console.log(this.interestsresults);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},

    async searchShoppingMalls(city) {
      var city = this.town;
      var request = {
        query: `Shopping malls in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };

    var service = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.interestsresults = this.interestsresults.concat(results);
        console.log(this.interestsresults);
        console.log(this.suggested_activities);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},



    async  searchgardens(city) {
    var city = this.town;
    var request = {
        query: `Gardens and parks in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours.periods', 'website', 'place_id'],
    };

    var service = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.interestsresults = this.interestsresults.concat(results);
        console.log(this.interestsresults);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},
    
    async geteateriesnearby(activity){
    event.preventDefault();
    this.eateries = [];
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: activity.geometry.location,
      });
    var geometry = activity.geometry;
    var request = {
      location: geometry.location,
      radius: '500',
      type: ['restaurant'],
    };
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place);
        place.origin = geometry.location;
        place.order = activity.order;
        place.url = "'https://www.google.com/search?q=" + place.name + "&rlz=1C1CHBF_enSG941SG941&oq=google&aqs=chrome..69i57j69i59j69i60l3j69i65l2.1001j0j7&sourceid=chrome&ie=UTF-8'";
        place.formatted_address = place.vicinity;
        this.eateries.push(place);
      }
      this.geteateryphotos();
    }
  })},
  async geteateryphotos() {
  const promises = this.eateries.map(async (eatery) => {
    eatery.remarks = "";
    eatery.expense = 0;
    eatery.rating = 3;
    try {
      eatery.photo = await this.getphoto(eatery.place_id);
    } catch (error) {
      console.error(`Failed to get photo for eatery ${eatery.name}: ${error}`);
      eatery.photo = "";
    }
  });
  await Promise.all(promises);
  console.log(this.eateries);
},
  //get link of photo of place with place id
  async getphoto(placeid){
    var request = {
      placeId: placeid,
      fields: ['photos'],
    };
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    return new Promise((resolve, reject) => {
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (place.photos && place.photos.length > 0) {
          let photoUrl = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
          resolve(photoUrl);

      resolve(photo); // Resolve the promise with the search results

    } else {
      console.error('No photos found for this place.');
      reject('No photos found'); // Reject the promise with an error message
    }
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
  }
    ,
    async loadPhoto(placeid) {
    try {
      this.photoUrl = await this.getphoto(placeid);
    } catch (error) {
      console.error(error);
    }
  }
    ,

    async checkOpenStatus(place, checkTime, date) {
  return new Promise((resolve, reject) => {
    var request = {
      placeId: place.place_id,
      fields: ["opening_hours"]
    };
    var service = new google.maps.places.PlacesService(document.createElement('div')); // Assuming 'map' is accessible
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.isOpenNow = false;
        console.log(place);
        var openingHours = place.opening_hours;
        if (openingHours && openingHours.periods != null && openingHours.periods[day] != null) {
          // Convert checkTime to a Date object for the specific date you want to check
          var checkDate = new Date(date);
          var day = checkDate.getDay();
          let openTime = openingHours.periods[day].open.time;
          openTime = parseInt(openTime);
          checkTime = parseInt(checkTime);
          let closeTime = openingHours.periods[day].close.time;
          closeTime = parseInt(closeTime);        
          if (openTime <= checkTime && (closeTime >= checkTime || closeTime <= openTime)) {
            this.isOpenNow = true;
            //add url into place
          } else {
            this.isOpenNow = false;
          }
        }
        else{
          this.isOpenNow = true;
          place.url = place.url + "&output=embed";
        }
        resolve(); // Resolve the promise with no parameter
      } else {
        reject(status); // Reject the promise with the status parameter
      }
    });
  });
},

async showLocation(place,eatery){
  event.preventDefault();
  if(this.eateries.length > 0 && eatery == null){
    this.eateries = [];
  }
  var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: place.geometry.location,
      });
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
}
      );
      var infowindow = new google.maps.InfoWindow({
        // content: "Name:" + place.name + "<br>" + "Address:" + place.formatted_address,
        content: `<div><img style="width: auto; height: 150px;" src=`+place.photo+`></div>`+`<div style="color:black"><strong>`+
          "Name:" + place.name + "<br>" + "Address:" + place.formatted_address
          + "<br><a target=`_blank` href=" + place.url + "></strong>Click here for more information</a>"
          +`</div>`,
      });
      // infowindow is blank
      marker.addListener("click", () => {
        infowindow.open({anchor: marker, map});
      });
      
      
      

},


async loadingpage(){

},    

    
async checkempty(){
  console.log(this.town);
    if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
("Please fill in all the fields!");
      }
    else{
        await this.getweather();
        await this.getactivitieslist();
    }
    },
  async addeaterytotrip(){
    var radio = document.getElementsByName("eateries");
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            let neworder = radio[i].value.order;
            let neweatery = radio[i].value;
            neweatery.day = radio[i].value.day;
            neweatery.time = formatTime(radio[i].value.time);
            neweatery.endtime = formatTime(radio[i].value.endtime);
            this.activitiesandtime[neweatery.day].activities.splice(neworder, 0, neweatery);
        }

    }
  },

 
async checkempty2(){
    if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
("Please fill in all the fields!");
      }
    else{
      this.strongIndependentWoman = true;
      await this.getweather();
      await this.getlist2();

    }
    },


async saveItinerary() {
  console.log(this.town);
  console.log(this.activitiesandtime);
  // console.log(this.activitiesandtime[0]);
  // console.log(this.activitiesandtime[0].activities);
  // console.log(this.activitiesandtime[0].activities[0]);
  // console.log(this.activitiesandtime[0].activities[0].name);
  var activitiesandtime = this.activitiesandtime;
  var json = JSON.stringify(activitiesandtime);
  console.log(json);
  
  const docSnap = await getDoc(doc(tripsRef, this.town));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    updateDoc(doc(tripsRef, this.town), {activitiesandtime: json});
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    setDoc(doc(tripsRef, this.town), {activitiesandtime: json, whoOwesWho: {}});
  }
}
    
},
  };

</script>