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

//search bar
function currentCity(event) {
  event.preventDefault();
  let yourCity = document.querySelector("#search-bar");
  let city = document.querySelector("h1");
  city.innerHTML = `${yourCity.value}`;
  let apiKey = "fcac5dd303c21e6aeec01bc1d83e65b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${yourCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}

let currentCityForm = document.querySelector("#search-engine");

currentCityForm.addEventListener("submit", currentCity);

//current temperature and wather conditions
function displayCurrentWeatherConditions(response) {
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
  console.log(response);
}

//fahrenheit conversion
function displayFarhrenheit(event) {
  event.preventDefault();

  celciusValue.classList.remove("active");
  fahrenheitValue.classList.add("active");

  let fahrenheitTempareture = (celciusTemperature * 9) / 5 + 32;
  let temperatureNow = document.querySelector("#temp-main");
  temperatureNow.innerHTML = Math.round(fahrenheitTempareture);
}

//celcius conversion
function displayCelcius(event) {
  event.preventDefault();

  celciusValue.classList.add("active");
  fahrenheitValue.classList.remove("active");

  let temperatureNow = document.querySelector("#temp-main");
  temperatureNow.innerHTML = celciusTemperature;
}

let celciusTemperature = null;

let fahrenheitValue = document.querySelector("#fahrenheit-temp");
fahrenheitValue.addEventListener("click", displayFarhrenheit);

let celciusValue = document.querySelector("#celcius-temp");
celciusValue.addEventListener("click", displayCelcius);
