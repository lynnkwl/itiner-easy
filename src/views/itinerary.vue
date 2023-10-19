<style>
    .slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 23px;
  height: 24px;
  border: 0;
  background: url('contrasticon.png');
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 23px;
  height: 25px;
  border: 0;
  background: url('contrasticon.png');
  cursor: pointer;
}
.Mainbody{
    text-align: center;
    margin-left: 30px;
    margin-top: 30px;
    background-color: #d9d9d9 ;
}
#sliderVal{
    margin-left: 10px;
    margin-right: 10px;
}
#selectplaces{
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
    background-color: #d9d9d9 ;
}
#map-container{
    margin-top: 30px;
    margin-left: 30px;
    margin-right: 30px;
    background-color: #d9d9d9 ;
}
#map{
    height: 400px;
    width: 100%;
}

</style>


<template>
    <!-- <nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #05c8f7;"
    aria-label="Second navbar example">
    <div class="container-fluid">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02"
        aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-black" href="Tools/Toolpage.html">Tools</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active text-white" aria-current="page" href="billbuddy.html">BillBuddy</a>
          </li>
        </ul>
        <div class="position-absolute top-0 start-50 translate-middle-x">
          <a href="#"><img src="../components/logo/itiner-easy.svg"  style="width: 100px; height: 100px; margin-top: -15px;"
            alt="itiner-easy logo"></a>
        </div>
        <ul class="navbar-nav pull-right">
          <li class="nav-item">
            <a class="nav-link rounded"
              style="background-color: white; color: #05c8f7; padding-left: 20px; padding-right: 20px;"
              href="#">Profile</a>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->


<div class="Mainbody">


    Which City do you want to go to?<input type="text" id="country" name="City"  v-model="town"  class="form-control input-sm" placeholder="Where are you going?" required>"
    <div class="slidecontainer">
        For many days?
        <div>
    <input type="range" min="1" max="3" step="1" v-model="sliderValue" @input="sliderChange" required />
    <p>Days: {{ sliderValue }}</p>
        </div> 
    
    </div>



    What kind of person are you?<br>
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
    <button @click="checkempty2" name="strongindependentwoman">I want to choose where I can go!</button><br>
</div>

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
                {{ act.formatted_address }}
              </td>
              <td>
                <input type="checkbox" :value="act.name" v-model="selectedPlaces" />
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</div>

<div v-if="final_activities.length>0">
  <!-- getmap -->
    <div id="map-container">
      <div id="map"></div>
  </div>
  <!-- create table each day -->
  <div v-for="(day, index) in activitiesandtime" :key="index">
    <table>
      <tr>
        <th colspan="4">Day {{ index + 1 }} Date: {{ day.date }}</th>
      </tr>
      <tr>
        <th>Activity</th>
        <th>Time</th>
        <th>Address</th>
        <th>Transport</th>
      </tr>
      <tbody>
        <tr v-for="activity in day.activities" :key="activity.name">
          <td>
            <label>
              {{ activity.name }}
            </label>
          </td>
          <td>
            {{ activity.time }} - {{ activity.endtime }}
          </td>

          <td>
            {{ activity.address }}
          </td>
          <td>
            <a href="#" @click="showLocation(activity)">Show on Map</a>
          </td> 
          <td>
            {{ activity.transport }}
          </td>
        </tr>
      </tbody>
    </table>
</div>
</div>
<div>
  <button @click="checkempty">Generate Itinerary</button>

</div>
</template>



<script >
import axios from 'axios'; // Import Axios
import { initMap } from '../main.js';
// import { Loader, Map } from "google-maps";

// const loader = new Loader({
//   apiKey: "YOUR_API_KEY",
//   version: "weekly",
// });
// loader.load().then(() => {
//   const map = new Map(document.getElementById("map"), {
//     center: { lat: 37.7749, lng: -122.4194 },
//     zoom: 12,
//   });
// });

export default {
  mounted(){
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrtlMuj3mZnI5NGVkgw5ME1hZL-XEtRzI&libraries=places&callback=initMap';
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
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
      activitiesandtime: [],
      suggested_activities: [],
      isOpenNow: false,
      twelvehrtime: "",
      dates: [],
      citycoords: {},
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
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry'],
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


//   async getlist() {
//     try {
//   var weather = await this.getweather(); // Wait for getweather to finish
//   console.log(weather);
//   var preferences = this.outgoing;
//   this.city = this.town;
//   this.days = this.sliderValue;

//   for (var i = 0; i < weather.length; i++) {
//     if (weather[i].indexOf("Rain") >= 0 || weather[i].indexOf("hazy") >= 0) {
//       await this.searchIndoorAttractions(); // Wait for searchIndoorAttractions() to finish
//     } else if (preferences == "Indoor") {
//       await this.searchIndoorAttractions(); // Wait for searchIndoorAttractions() to finish
//     } else if (preferences == "Both") {
//       await this.searchBothAttractions(); // Wait for searchBothAttractions() to finish
//     } else {
//       await this.searchOutdoorAttractions(); // Wait for searchOutdoorAttractions() to finish
//     }
//   }

// } catch (error) {
//   console.error(error);
// }
// },


  async getactivitieslist(){
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
            this.final_activities = this.final_activities.concat(this.interestsresults);
            this.final_activities = this.final_activities.concat(this.places);
        }
    }

    this.final_activities = [...new Set(this.final_activities)];
    console.log(this.final_activities);
    await this.managetime();
    await this.getLatLng();
    await initMap(this.citycoords);
    },


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
    var day = {};
    day.activities = [];
    day.day = i + 1;
    day.date = this.dates[i];
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
        console.log(randomactivity);
        console.log(randomactivity.place_id);
        console.log(timeint);
        console.log(this.dates[i]);
        await this.checkOpenStatus(randomactivity.place_id, timeint, this.dates[i]);
        console.log(this.isOpenNow);
        while (this.isOpenNow == false) {
          randomIndex = Math.floor(Math.random() * this.final_activities.length);
          randomactivity = this.final_activities[randomIndex];
          await this.checkOpenStatus(randomactivity.place_id, timeint, this.dates[i]);
        }
        
        var activitytime = 0;

        // Adjust activity time calculation as needed
        if (randomactivity.types.includes("park") || randomactivity.types.includes("zoo") || randomactivity.types.includes("amusement_park")) {
          activitytime = 200;
        } else {
          activitytime = 300;
        }

        // Create the activity object
        var activity = {
          name: randomactivity.name,
          time: await this.formatTime(timeint), // Format time as a string
          endtime: await this.formatTime(timeint + activitytime), // Format endtime as a string
          address: randomactivity.formatted_address,
          transport: this.transport,
          location: randomactivity.geometry,
        };    
        //store activities in each day

        day.activities.push(activity);

        // Update 'timeint' for the next activity
        timeint = timeint + activitytime;

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
    this.interestsresults = [];
    var checkboxes = document.getElementsByName("interests");
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
    
    async getEateriesNearby() {
      var geocoder = new google.maps.Geocoder();
      var postalCode = this.postalCode;

      geocoder.geocode({ address: postalCode }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          var location = results[0].geometry.location;
          var request = {
            location: location,
            radius: '500',
            type: ['restaurant'],
            componentRestrictions: { country: "sg" }
          };

          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, this.callback);
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      },
    )}
    ,

async checkOpenStatus(placeId, checkTime, date) {
  var request = {
    placeId: placeId,
    fields: ['name', 'opening_hours'],
  };

  var service = new google.maps.places.PlacesService(document.createElement('div')); // Assuming 'map' is accessible

  return new Promise((resolve, reject) => {
  service.getDetails(request, (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.isOpenNow = false;
      console.log(place);
      var openingHours = place.opening_hours;
      if (openingHours.periods && openingHours.periods[day]) {
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
        } else {
          this.isOpenNow = false;
        }
      }
      else{
        this.isOpenNow = true;
      }
      console.log(
        place.name + ' is open at ' + checkTime + ': ' + (this.isOpenNow ? 'Yes' : 'No')
      );
      resolve(this.isOpenNow); // Resolve the promise with the isOpenNow value
    } else {
      console.error(`Error: ${status}`);
      reject(status); // Reject the promise with the error status
    }
  });
});
},

async showLocation(place){
  var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: place.geometry.location,
      });
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
}
      );
      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address + '</div>');
      infowindow.open(map, marker);
},




    

    
  async checkempty(){
    if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
("Please fill in all the fields!");
      }
    else{
        await this.getweather();
        await this.getactivitieslist();
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
},
  };

</script>