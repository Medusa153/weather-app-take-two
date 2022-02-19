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
  let currentCity = document.querySelector("#city");
  currentCity = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#temp-main");
  let dateElement = document.querySelector("h2");
  let iconElement = document.querySelector("#icon");

  temperatureNow.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
