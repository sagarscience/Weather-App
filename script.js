const link =
  "https://api.openweathermap.org/data/2.5/weather?q=jhansi&appid=e5a38898ac3f9e33f6b1ec32b12bf374";

const request = new XMLHttpRequest();
request.open("GET", link, true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    const obj = JSON.parse(this.response);
    console.log(obj);

    document.getElementById("location").textContent = obj.name;
    document.getElementById("weather").textContent = obj.weather[0].description;
    document.getElementById("temp").textContent = Math.round(
      obj.main.temp - 273.15
    );
    document.getElementById("humidity").textContent = obj.main.humidity;
    document.getElementById("wind").textContent = obj.wind.speed;
    document.getElementById("icon").src =
      "https://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png";
  } else {
    console.error("The city data is not available");
  }
};

request.onerror = function () {
  console.error("Network error occurred");
};

request.send();
