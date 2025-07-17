const API_KEY = "e5a38898ac3f9e33f6b1ec32b12bf374";
const cityInput = document.getElementById("cityInput");
const form = document.getElementById("cityForm");
const refreshBtn = document.getElementById("refreshBtn");

let currentCity = "Jhansi"; // default

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      currentCity = data.name;
      document.getElementById("location").textContent = data.name;
      document.getElementById("temp").textContent = Math.round(data.main.temp - 273.15);
      document.getElementById("weather").textContent = data.weather[0].description;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("wind").textContent = data.wind.speed;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch((error) => {
      alert("Error fetching weather: " + error.message);
    });
}

// On form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchWeather(city);
  }
});

// On refresh button click
refreshBtn.addEventListener("click", () => {
  fetchWeather(currentCity);
});

// Load default city on page load
fetchWeather(currentCity);
