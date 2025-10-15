// Connect to the APIs and make it happen :)

//cat facts
//https://alexwohlbruck.github.io/cat-facts/
//https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t

//
document.addEventListener("DOMContentLoaded", () => {
  // Select buttons and containers
  const singleDogButton = document.getElementById("dog-api");
  const DogContainer = document.getElementById("dog-output");
  const singleCatButton = document.getElementById("cat-api");
  const CatContainer = document.getElementById("cat-output");
  const Weatherbutton = document.getElementById("weather-api");
  const WeatherContainer = document.getElementById("weather-output");

  async function getSingleDogImage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    DogContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = data.message;
    DogContainer.appendChild(img);
  }

  //need to learn how to do an API key for this one. Will come back
  async function getSingleCatImage() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();

    CatContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = data.message;
    CatContainer.appendChild(img);
  }

  async function getWeatherInfo() {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,rain&models=icon_seamless&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    );
    const data = await response.json();

    WeatherContainer.innerHTML = "";

    const hours = data.hourly.time;
    const temps = data.hourly.temperature_2m;
    const rain = data.hourly.rain;

    let weathertable =
      "<table><thead><tr><th>Time</th><th>Temperature (°F)</th><th>Rain (in)</th></tr></thead><tbody>";

    for (let w = 0; w < 5; w++) {
      weathertable += `<tr><td>${hours[w]}</td><td>${temps[w]}</td><td>${rain[w]}</td></tr>`;
    }

    weathertable += "</tbody></table>";
    WeatherContainer.innerHTML = weathertable;
  }

  singleDogButton.addEventListener("click", getSingleDogImage);
  singleCatButton.addEventListener("click", getSingleCatImage);
  Weatherbutton.addEventListener("click", getWeatherInfo);
});
//whats up
