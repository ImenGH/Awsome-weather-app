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

function search(city) {
  let apiKey = "b016d3139dfb068d018e3bb03da1b5f3";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let actualCity = document.querySelector("#city-input");
  search(actualCity.value);
}
let form = document.querySelector("#real-city");
form.addEventListener("submit", showCity);

let oldWeatherIconClass = "fa-circle";
let temperature;
let celsiusTemperature;

function showWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let wind = Math.round(response.data.wind.speed);
  let windValue = document.querySelector("#windy");
  windValue.innerHTML = `${wind}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = `${humidity}`;

  celsiusTemperature = Math.round(response.data.main.temp);
  temperature = document.querySelector("#temp");
  temperature.innerHTML = `${celsiusTemperature}`;

  let description = response.data.weather[0].main;
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

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature = document.querySelector("#temp");
  temperature.innerHTML = `${fahrenheitTemp}`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();

  temperature = document.querySelector("#temp");
  temperature.innerHTML = `${celsiusTemperature}`;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("Tunis");
