let now = new Date();
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
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let actualMonth = document.querySelector("#actual-month");
actualMonth.innerHTML = month;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let actualDay = document.querySelector("#actual-day");
actualDay.innerHTML = day;

let date = now.getDate();
let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = date;

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let actualHour = document.querySelector("#actual-hour");
actualHour.innerHTML = `${hour} : ${min}`;

let actualCity = "Tunis";
let h1 = document.querySelector("h1");
h1.innerHTML = actualCity;

function showCity(event) {
  event.preventDefault();
  actualCity = document.querySelector("#city");
  //let h1 = document.querySelector("h1");
  h1.innerHTML = actualCity.value;
  console.log("call api" + actualCity.value);
  urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${actualCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(showWeather);
}

let form = document.querySelector("#real-city");
form.addEventListener("submit", showCity);

/*

function showFahrenheit(event) {
  event.preventDefault();
  let actualTempSelector = document.querySelector("#temp");
  let actualTemp = actualTempSelector.innerHTML;
  let easyTemp = Math.round((actualTemp * 9) / 5 + 32);
  actualTempSelector.innerHTML = easyTemp;
}
let actualFahrenheit = document.querySelector("#fahrenheit");
actualFahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let actualTempSelector = document.querySelector("#temp");
  actualTempSelector.innerHTML = celsiusTemperature;
}
let actualCelsius = document.querySelector("#celsius");
actualCelsius.addEventListener("click", showCelsius); */

let units = "metric";
let apiKey = "b016d3139dfb068d018e3bb03da1b5f3";
console.log(actualCity);
let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${actualCity}&appid=${apiKey}&units=${units}`;
let oldWeatherIconClass = "fa-circle";
let temperature;
let celsiusTemperature;

function showWeather(response) {
  console.log(response);

  let wind = Math.round(response.data.wind.speed);
  console.log(`${wind}`);
  let windValue = document.querySelector("#windy");
  windValue.innerHTML = `${wind}`;
  let humidity = Math.round(response.data.main.humidity);
  console.log(`${humidity}`);
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${humidity}`;
  celsiusTemperature = Math.round(response.data.main.temp);
  temperature = document.querySelector("#temp");
  temperature.innerHTML = `${celsiusTemperature}`;

  let description = response.data.weather[0].main;
  console.log(description);
  let visibility = document.querySelector("#visibility");
  let climatIcon = document.querySelector("#climat");
  let newWeatherIconClass;

  if (description === "Clear") {
    newWeatherIconClass = "fa-circle";
    visibility.innerHTML = "Clear sky";
    climatIcon.classList.replace(oldWeatherIconClass, newWeatherIconClass);
    oldWeatherIconClass = newWeatherIconClass;
  } else if (description === "Rain") {
    newWeatherIconClass = "fa-cloud-showers-heavy";
    visibility.innerHTML = "Rainy";
    climatIcon.classList.replace(oldWeatherIconClass, newWeatherIconClass);
    oldWeatherIconClass = newWeatherIconClass;
  } else if (description === "Clouds") {
    newWeatherIconClass = "fa-cloud";
    visibility.innerHTML = "Cloudy";
    climatIcon.classList.replace(oldWeatherIconClass, newWeatherIconClass);
    oldWeatherIconClass = newWeatherIconClass;
  } else if (description === "Snow") {
    newWeatherIconClass = "fa-snowflake";
    visibility.innerHTML = "Snow";
    climatIcon.classList.replace(oldWeatherIconClass, newWeatherIconClass);
    oldWeatherIconClass = newWeatherIconClass;
  }
}
axios.get(urlApi).then(showWeather);

/*function showFahrenheit(event) {
  event.preventDefault();
  let actualTempSelector = document.querySelector("#temp");
  let actualTemp = actualTempSelector.innerHTML;
  let easyTemp = Math.round((actualTemp * 9) / 5 + 32);
  actualTempSelector.innerHTML = easyTemp;
}
let actualFahrenheit = document.querySelector("#fahrenheit");
actualFahrenheit.addEventListener("click", showFahrenheit);*/
