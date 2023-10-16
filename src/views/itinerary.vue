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


    <h7>Which City do you want to go to?</h7><input type="text" id="country" name="City"  v-model="town"  class="form-control input-sm" placeholder="Where are you going?" required>"
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
    <button @click="checkempty">Generate Itinerary</button>

</div>
<div >

</div>
<div id ="results">

</div>

</template>

<script>
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      sliderValue: 1,
      selectedOption: null, // Initially no option is selected
      town: "",
      outgoing: "",
      transport: "",
    };
  },
    methods: {
        sliderChange(event) {
        this.sliderValue = event.target.value;
        },


async getweather() {
    return new Promise(async (resolve, reject) => {
        var city = this.town;
        var days = this.sliderValue;

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

 searchBothAttractions(city) {
    var city = this.town;

    const request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            result = [];
        for (const place of results) {

            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
            console.log(`Types: ${place.types}`);
            console.log(`Business Status: ${place.business_status}`);
            console.log(`Location: ${place.geometry.location}`);
            console.log('---');
            result.push(place.name);
        }
        //place results in checkbox
        for (var i = 0; i < result.length; i++) {
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.value = "value";
            checkbox.id = "id";

            var label = document.createElement('label')
            label.htmlFor = "id";
            label.appendChild(document.createTextNode(result[i]));

            document.getElementById('selectplaces').appendChild(checkbox);
            document.getElementById('selectplaces').appendChild(label);
            document.getElementById('selectplaces').appendChild(document.createElement("br"));
        }
        }
         else {
        console.error(`Error: ${status}`);
        }
    });
    },


  async generateitinerary() {
    try {
        var weather = await this.getweather(); // Wait for getweather to finish
        console.log(weather);
        var preferences = this.outgoing;
        var transport = this.transport;
        var usedattractions = [];
        var itinerary = [];
        var city = this.town;
        var days = this.sliderValue;

        for (var i = 0; i < weather.length; i++) {
            if (weather[i].indexOf("Rain") >= 0 || weather[i].indexOf("hazy") >= 0) {
                var all_attractions = this.searchIndoorAttractions();
                var possibleattractions = [];
                //go through used attractions and if it is not in the all attractions list, add it to the possible attractions list
                for (var j = 0; j < all_attractions.length; j++) {
                    if (usedattractions.indexOf(all_attractions[j]) < 0) {
                        possibleattractions.push(all_attractions[j]);
                    }
                }
                var randomattraction = possibleattractions[Math.floor(Math.random() * possibleattractions.length)];
                itinerary.push(randomattraction);
                
                
            } else if (preferences == "Indoor") {
                this.searchIndoorAttractions();
            } else if (preferences == "Both") {
                this.searchBothAttractions();
            } else {
                this.searchOutdoorAttractions();
            }
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
},





    //   to search for attractions in a city
    SearchIndoorAttractions(city) {
    var city = document.getElementById("country").value;

    const request = {
        query: `Shopping malls and mueseums and aquariums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
            console.log(`Types: ${place.types}`);
            console.log(`Business Status: ${place.business_status}`);
            console.log(`Location: ${place.geometry.location}`);
            console.log(`Opening Hours: ${place.opening_hours}`);
            console.log(`Website: ${place.website}`);
            console.log('---');
        }
        } else {
        console.error(`Error: ${status}`);
        }
    });
    },

      searchAttractions(city) {
    var city = this.town;

    const request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
            console.log(`Types: ${place.types}`);
            console.log(`Business Status: ${place.business_status}`);
            console.log(`Location: ${place.geometry.location}`);
            console.log(`Opening Hours: ${place.opening_hours}`);
            console.log(`Website: ${place.website}`);
            console.log('---');
        }
        } else {
        console.error(`Error: ${status}`);
        }
    });
    },


      searchOutdoorAttractions(city) {
    var city = document.getElementById("country").value;

    const request = {
        query: `Outdoor Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
            console.log(`Types: ${place.types}`);
            console.log(`Business Status: ${place.business_status}`);
            console.log(`Location: ${place.geometry.location}`);
            console.log(`Opening Hours: ${place.opening_hours}`);
            console.log(`Website: ${place.website}`);
            console.log('---');
        }
        } else {
        console.error(`Error: ${status}`);
        }
    });
    },
  SearchMuseums(city) {
    var city = document.getElementById("country").value;

    const request = {
        query: `Museums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
            console.log(`Types: ${place.types}`);
            console.log(`Business Status: ${place.business_status}`);
            console.log(`Location: ${place.geometry.location}`);
            console.log(`Opening Hours: ${place.opening_hours}`);
            console.log(`Website: ${place.website}`);
            console.log('---');
        }
        } else {
        console.error(`Error: ${status}`);
        }
    });
    },

    searchShoppingMalls(city) {
    var city = document.getElementById("country").value;

    const request = {
        query: `Shopping malls in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
            console.log(`Types: ${place.types}`);
            console.log(`Business Status: ${place.business_status}`);
            console.log(`Location: ${place.geometry.location}`);
            console.log(`Opening Hours: ${place.opening_hours}`);
            console.log(`Website: ${place.website}`);
            console.log('---');
        }
        } else {
        console.error(`Error: ${status}`);
        }
    });
    },
      searchgardens(city) {
    var city = this.town;

    const request = {
        query: `Gardens and parks in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'location', 'opening_hours', 'website'],
    };



    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const outdoorplaces = ['park','zoo','amusement_park',''];
    // const outdoo

    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
            console.log(`Types: ${place.types}`);
            console.log(`Business Status: ${place.business_status}`);
            console.log(`Location: ${place.geometry.location}`);
            console.log(`Opening Hours: ${place.opening_hours}`);
            console.log(`Website: ${place.website}`);
            console.log('---');
        }
        } else {
        console.error(`Error: ${status}`);
        }
    });
    },
    
    getEateriesNearby() {
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
    checkOpenStatus(placeId, checkTime) {
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
    checkempty(){
    if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
("Please fill in all the fields!");
      }
    else{
        this.generateitinerary();
    }
},
  },
};

</script>