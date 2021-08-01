const appKey = "8fdaa703f8707a4e968e793099b668ac";

const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-txt");
const cityName = document.querySelector("#city-name");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temp");
const humidity = document.querySelector("#humidity-div");

//Eventlistener for button and input
searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);
//check if enter key is pressed
function enterPressed(event){
    if(event.key === "Enter"){
        findWeatherDetails();
    }
}

//find details
function findWeatherDetails(){
if(searchInput.value === ""){

}else{
    const searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
    httpRequestAsync(searchLink, theResponse);
}
}

//response from server
function theResponse(response) {
  //received data as json then parse data as js then store in jsonobject
  const jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name; 
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°"; //273, get data as kelvin need to minus 273 to make it celcious
  humidity.innerHTML = jsonObject.main.humidity + "%";

}

//send request to server
function httpRequestAsync(url, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      callback(httpRequest.responseText); //server return text
    }
  };
  httpRequest.open("GET", url, true);
  httpRequest.send(); //send request to server
}
