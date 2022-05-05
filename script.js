let weather = {
    "apiKey" : "0931ce58fb11b66f29e3d2b60c8e3218",

    fetchWeather : function(city){

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data)=>this.displayWeather(data))
    },
    fetchWeatherCord : function(lati,long){

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data)=>this.displayWeather(data))
    },

    displayWeather : function(data) {

        const {name} = data;
        const {icon , description} = data.weather[0];
        const {temp , humidity} = data.main;
        const {speed} = data.wind;
        
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}.png`
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind Speed: ${speed} km/h`;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".weather").classList.remove("loading");

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-box").value);
        document.querySelector(".search-box").value = "";
    } 
}


document
    .querySelector(".search-button")
    .addEventListener('click',()=>weather.search());

document
    .querySelector(".search-box")
    .addEventListener("keyup",(event)=>{

        if(event.keyCode == 13){
            event.preventDefault();
            weather.search();
        }
    });  

    const successCallBack = (data)=>{
        weather.fetchWeatherCord(data.coords.latitude,data.coords.longitude);
    }

    const errorCallback = ()=>{
        weather.fetchWeather("New Delhi");
    }

    window.navigator.geolocation
  .getCurrentPosition(successCallBack, errorCallback);

