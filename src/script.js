function formatDate(timestamp) {
  let weatherDate = new Date(timestamp);
  //month and date
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "October",
    "December",
  ];

  let month = months[weatherDate.getMonth()];

  let date = weatherDate.getDate();
  // day of teh week
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday",
  ];
  let day = days[weatherDate.getDay()];
  // current time
  let hours = weatherDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = weatherDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let newTime = `${hours}:${minutes}`;
  //current date
  let currentDate = document.querySelector("h2");

  return `${month} ${date} </br> ${day} ${newTime}`;
}

//following daus forecast - days names
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// following days forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 following-days">
      <div class="weather-forcast-days">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"/ id="small-icon">
      <div class="weather-forcast-temp">
        <span class="weather-forcast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°C </span>
        <span class="weather-forcast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°C </span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fcac5dd303c21e6aeec01bc1d83e65b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//current temperature and wather conditions
function displayCurrentWeatherConditions(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp-main");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("h2");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celciusTemperature = Math.round(response.data.main.temp);

  console.log(response.data);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "fcac5dd303c21e6aeec01bc1d83e65b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}
//search bar
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let city = document.querySelector("h1");
  city.innerHTML = `${cityInputElement.value}`;
  search(cityInputElement.value);
}

//fahrenheit conversion
function displayFarhrenheit(event) {
  event.preventDefault();
  celciusValue.classList.remove("active");
  fahrenheitValue.classList.add("active");
  let fahrenheitTempareture = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp-main");
  temperatureElement.innerHTML = Math.round(fahrenheitTempareture);
}

//celcius conversion
function displayCelcius(event) {
  event.preventDefault();
  celciusValue.classList.add("active");
  fahrenheitValue.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-main");
  temperatureElement.innerHTML = celciusTemperature;
}

let celciusTemperature = null;

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);

let fahrenheitValue = document.querySelector("#fahrenheit-temp");
fahrenheitValue.addEventListener("click", displayFarhrenheit);

let celciusValue = document.querySelector("#celcius-temp");
celciusValue.addEventListener("click", displayCelcius);

search("Tokio");
