let date = new Date();
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

let actualMonth = document.querySelector("#actual-month");
actualMonth.innerHTML = months[date.getMonth()];

let daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function setDate(selector) {
  date.setDate(date.getDate() + 1);

  selector.innerHTML = daysList[date.getDay()];
}
let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = date.getDate();

let today = document.querySelector("#today");
today.innerHTML = daysList[date.getDay()];

for (let i of ["one", "two", "three", "four"]) {
  setDate(document.querySelector("#day-" + i));
}

let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = date.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let actualHour = document.querySelector("#actual-hour");
actualHour.innerHTML = `${hour} : ${min}`;

let weatherImageMap = {
  Clear: "images/sunny.svg",
  Clouds: "images/cloudy.svg",
  Snow: "images/snow.svg",
  Rain: "images/rain.svg",
};

function setWeatherImage(selector, weatherDetail) {
  selector.src = weatherImageMap[weatherDetail];
}

function showForecast(response) {
  console.log(response);
  let firstDay = document.querySelector("#max-1");
  firstDay.innerHTML = Math.round(response.data.list[6].main.temp_max);
  let firstNight = document.querySelector("#min-1");
  firstNight.innerHTML = Math.round(response.data.list[9].main.temp_min);

  let secondDay = document.querySelector("#max-2");
  secondDay.innerHTML = Math.round(response.data.list[14].main.temp_max);
  let secondNight = document.querySelector("#min-2");
  secondNight.innerHTML = Math.round(response.data.list[17].main.temp_min);

  let thirdDay = document.querySelector("#max-3");
  thirdDay.innerHTML = Math.round(response.data.list[22].main.temp_max);
  let thirdNight = document.querySelector("#min-3");
  thirdNight.innerHTML = Math.round(response.data.list[25].main.temp_min);

  let fourthDay = document.querySelector("#max-4");
  fourthDay.innerHTML = Math.round(response.data.list[30].main.temp_max);
  let fourthNight = document.querySelector("#min-4");
  fourthNight.innerHTML = Math.round(response.data.list[33].main.temp_min);

  let firstIcon = document.querySelector("#img-day1");
  let secondIcon = document.querySelector("#img-day2");
  let thirdIcon = document.querySelector("#img-day3");
  let fourthIcon = document.querySelector("#img-day4");
  console.log(firstIcon);
  let weatherDetail1 = response.data.list[6].weather[0].main;
  let weatherDetail2 = response.data.list[14].weather[0].main;
  let weatherDetail3 = response.data.list[22].weather[0].main;
  let weatherDetail4 = response.data.list[30].weather[0].main;
  console.log(weatherDetail1);
  setWeatherImage(firstIcon, weatherDetail1);
  setWeatherImage(secondIcon, weatherDetail2);
  setWeatherImage(thirdIcon, weatherDetail3);
  setWeatherImage(fourthIcon, weatherDetail4);
}

function search(city) {
  let apiKey = "b016d3139dfb068d018e3bb03da1b5f3";
  let units = "metric";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(showWeather);

  urlApi = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(urlApi).then(showForecast);
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

  let windValue = document.querySelector("#windy");
  windValue.innerHTML = Math.round(response.data.wind.speed);

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = Math.round(response.data.main.humidity);

  temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);

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
  temperature = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature.innerHTML = `${fahrenheitTemp}`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature = document.querySelector("#temp");
  temperature.innerHTML = `${celsiusTemperature}`;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("Stockholm");
