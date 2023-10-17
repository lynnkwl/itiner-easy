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
  <table v-for="day in days">
    <tr>
      <th colspan = 3>Day {{ day }}</th>
    </tr>
    <th>Time</th>
    <th>Activity</th>
    <th>Route</th>
    <tr>
      <td>
        <div v-for="activity in activities">
          <label>
            {{ activity }}
          </label>
        </div>
      </td>
    </tr>
  </table>
</div>
<div>
  <button @click="checkempty">Generate Itinerary</button>

</div>
</template>



<script >
import axios from 'axios'; // Import Axios

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
      strongIndependentWoman: false, // To store the strongindependentwoman checkbox value
      places: [], // To store search results
      selectedPlaces: [], // To store selected places
      interestsresults: [],
      generatenow: false,
      days: 0,
      final_activities : [],
      activitiesandtime: [],
      suggested_activities: [],
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
        this.days = days;

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
            }

            resolve(weatherarray);
        } catch (error) {
            reject(error);
        }
    });
},
//getplaces
async searchBothAttractions(city) {
    var city = this.town;
    const request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

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
    const request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location'],
    };

    this.getinterests(city);

    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

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
    },




    async managetime(){
      this.activitiesandtime = [];
  for (var i = 0; i < this.days; i++) {
    let time = "0900";
    while (parseInt(time) < 2100) {
      var randomactivity = this.final_activities[Math.floor(Math.random() * this.final_activities.length)];
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
        time: time,
        endtime: (parseInt(time) + activitytime).toString(), // Ensure 'endtime' is a string
        address: randomactivity.formatted_address,
        transport: this.transport,
      };

      // Add the activity to 'activitiesandtime' and remove it from 'final_activities'
      this.activitiesandtime.push(activity);
      this.final_activities.splice(this.final_activities.indexOf(randomactivity), 1);

      // Update 'time'
      time = (parseInt(time) + activitytime).toString();
    }

    // If the loop ends and 'time' is still less than 2100, add the activity and break
    if (parseInt(time) < 2100) {
      this.activitiesandtime.push(activity);
      break;
    }
  }
  // Debugging: Log the contents of activitiesandtime
  console.log(this.activitiesandtime);
},




    

    //   to search for attractions in a city
    async searchIndoorAttractions(city) {
    var city = this.town;
    const request = {
        query: `Shopping malls and mueseums and aquariums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };


    const service = new google.maps.places.PlacesService(document.createElement('div'));
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
    const request = {
        query: `Outdoor Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };
    
    const service = new google.maps.places.PlacesService(document.createElement('div'));

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
    const request = {
        query: `Museums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };
    const service = new google.maps.places.PlacesService(document.createElement('div'));
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
    const request = {
        query: `Shopping malls in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };

    const service = new google.maps.places.PlacesService(document.createElement('div'));

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


    async  searchgardens(city) {
    var city = this.town;
    const request = {
        query: `Gardens and parks in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };

    const service = new google.maps.places.PlacesService(document.createElement('div'));

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
    )},
    callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          console.log(place);
          this.checkOpenStatus(place.place_id, '12:00 PM'); // Change the time as needed
        }
      }
    }
    ,
    async checkOpenStatus(placeId, checkTime) {
      var request = {
        placeId: placeId,
        fields: ['name', 'opening_hours'],
      };

      var service = new google.maps.places.PlacesService(map); // Assuming 'map' is accessible

      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var isOpenNow = false;

          if (place.opening_hours) {
            var checkDate = new Date('2023-10-16 ' + checkTime);

            var openingHours = place.opening_hours;
            openingHours.periods.forEach((period) => {
              if (
                checkDate >= new Date('2023-10-16 ' + period.open.time) &&
                checkDate <= new Date('2023-10-16 ' + period.close.time)
              ) {
                isOpenNow = true;
              }
            });
          }

          console.log(
            place.name + ' is open at ' + checkTime + ': ' + (isOpenNow ? 'Yes' : 'No')
          );
        }
      });
    },
    async initMap() {
      const city = this.town;
      const mapOptions = {
        center: { lat: 0, lng: 0 }, // Replace with the coordinates of your city
        zoom: 10, // Adjust the zoom level as needed
      };

      const map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Use Geocoding to get the coordinates for the city
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      })},
    

    
  async checkempty(){
    if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
("Please fill in all the fields!");
      }
    else{
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
        await this.getlist2();
    }
    },
},
  };

</script>