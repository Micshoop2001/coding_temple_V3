document.addEventListener("DOMContentLoaded", () => {
  // Select buttons and containers
  const singleDogButton = document.getElementById("dog-api");
  const DogContainer = document.getElementById("dog-output");
  const singleCatButton = document.getElementById("cat-api");
  const CatContainer = document.getElementById("cat-output");
  const Weatherbutton = document.getElementById("weather-api");
  const WeatherContainer = document.getElementById("weather-output");
  const gitbutton = document.getElementById("github-api");
  const gitContainer = document.getElementById("github-output");
  const gitSearchInput = document.getElementById("searchInput");
  const jokebutton = document.getElementById("joke-api");
  const jokeContainer = document.getElementById("joke-output");
  const moviebutton = document.getElementById("movies-api");
  const movieContainer = document.getElementById("movies-output");
  const movieSearchInput = document.getElementById("moviesearchInput");
  const publicContainer = document.getElementById("publicapi-output");
  const publicbutton = document.getElementById("public-api");
  const currencyContainer = document.getElementById("currency-output");
  const currencybutton = document.getElementById("currency-api");
  const currencySelect = document.getElementById("currencySelect");

  async function getSingleDogImage() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    DogContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = data.message;
    DogContainer.appendChild(img);
  }

  async function getSingleCatImage() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();

    CatContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = data[0].url;
    CatContainer.appendChild(img);
  }

  async function getWeatherInfo() {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=35.733&longitude=-81.341&hourly=temperature_2m,rain&models=icon_seamless&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    );
    const data = await response.json();

    WeatherContainer.innerHTML = "";

    const hours = data.hourly.time;
    const temps = data.hourly.temperature_2m;
    const rain = data.hourly.rain;

    let weathertable =
      "<table><thead><tr><th>Time</th><th>Temperature (°F)</th><th>Rain (in)</th></tr></thead><tbody>";

    for (let w = 0; w < 12; w++) {
      weathertable += `<tr><td>${hours[w]}</td><td>${temps[w]}</td><td>${rain[w]}</td></tr>`;
    }

    weathertable += "</tbody></table>";
    WeatherContainer.innerHTML = weathertable;
  }

  async function getgithub() {
    const query = gitSearchInput.value.trim();
    if (!query) return;
    gitContainer.innerHTML = "Searching...";
    const searchURL = `https://api.github.com/search/users?q=${encodeURIComponent(
      query
    )}&page=1&per_page=5&order=desc`;
    const response = await fetch(searchURL);
    const userData = await response.json();
    console.log(userData);
    gitContainer.innerHTML = "";

    userData.items.forEach((user) => {
      const userDiv = document.createElement("div");
      console.log(user);
      userDiv.innerHTML = `
      <div class= "gitpresent">
          <h3><a href="${user.html_url}" target="blank">${user.login}</a></h3>
          <img src="${user.avatar_url}" alt="${user.login}" width="80" />
      </div>  
        `;
      gitContainer.appendChild(userDiv);
    });
  }

  async function getjoke() {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    console.log(data);
    jokeContainer.innerHTML = "";
    const joke = data.value;

    jokeContainer.innerHTML = `<div class="ChuckNorris"><p>${joke}</p></div>`;
  }

  async function getmovies() {
    const query = movieSearchInput.value.trim();
    if (!query) return;
    movieContainer.innerHTML = "Searching...";

    const accesstoken =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTc0Njc4NTU0M2MyOWNmNWUzZTQzNmVlMjA2YmI4NSIsIm5iZiI6MTc2MTQ0MzAxMy42MjQsInN1YiI6IjY4ZmQ3Y2M1YjNjZDBjNjY1MWEzMGFhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSPgZwaC3lR2PlLbkUYpw053MRjVbL4YizqidhjSFz8";

    const movieurl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}`;

    const accessstuff = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(movieurl, accessstuff);
    const data = await response.json();
    console.log(data);
    movieContainer.innerHTML = "";

    data.results.forEach((movie) => {
      if (movie.vote_count <= 200) return;
      const movieDiv = document.createElement("div");

      console.log(movie);
      movieDiv.innerHTML = `
      <div class="movie-card">
      <h3>${movie.title}</h3>;
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
      <p>${movie.release_date}</p>
      </div>
       `;
      movieContainer.appendChild(movieDiv);
    });
  }

  async function getpublicApi() {}

  async function getcurrency_old() {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    const data = await response.json();
    console.log(data);
    currencyContainer.innerHTML = "";

    const usddata = data.rates.USD;
    const eurdata = data.rates.EUR;
    const amddata = data.rates.AMD;

    const userDiv = document.createElement("div");

    userDiv.innerHTML = `
      <div class= "gitpresent">
          <h3>${usddata}</h3>
          <h3>${eurdata}</h3>
          <h3>${amddata}</h3>
      </div>  
        `;
    currencyContainer.appendChild(userDiv);
  }

  async function getcurrencyDropdown() {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencySelect.innerHTML = '<option value="">from...</option>';

    currencies.forEach((curr) => {
      const option = document.createElement("option");
      option.value = curr;
      option.textContent = curr;
      currencySelect.appendChild(option);
    });
  }

  async function getcurrency() {
    const selectedCurrency = currencySelect.value;
    if (!selectedCurrency) return;

    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${selectedCurrency}`
    );
    const data = await response.json();

    currencyContainer.innerHTML = "";
    const rates = data.rates;

    const userDiv = document.createElement("div");
    userDiv.innerHTML = `<div class="gitpresent"><h3>Rates for ${selectedCurrency}</h3>`;
    for (const [curr, rate] of Object.entries(rates)) {
      userDiv.innerHTML += `<p>${curr}: ${rate}</p>`;
    }
    userDiv.innerHTML += `</div>`;
    currencyContainer.appendChild(userDiv);
  }

  singleDogButton.addEventListener("click", getSingleDogImage);
  singleCatButton.addEventListener("click", getSingleCatImage);
  Weatherbutton.addEventListener("click", getWeatherInfo);
  gitbutton.addEventListener("click", getgithub);
  jokebutton.addEventListener("click", getjoke);
  moviebutton.addEventListener("click", getmovies);
  publicbutton.addEventListener("click", getpublicApi);
  currencybutton.addEventListener("click", getcurrency);
  getcurrencyDropdown();
});

//API Read Access Token //This is also considered the bearer token//for movies
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTc0Njc4NTU0M2MyOWNmNWUzZTQzNmVlMjA2YmI4NSIs
// Im5iZiI6MTc2MTQ0MzAxMy42MjQsInN1YiI6IjY4ZmQ3Y2M1YjNjZDBjNjY1MWEzMGFhNCIsInNjb3BlcyI6Wy
// JhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSPgZwaC3lR2PlLbkUYpw053MRjVbL4YizqidhjSFz8

//API Key
//c5746785543c29cf5e3e436ee206bb85

//Geoapify

//https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=b1a17874f3694168aa32bc53fb6b4e32
//https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:-122.304378,47.526022&zoom=14&apiKey=YOUR_API_KEY

//API key//Geoapify
//b1a17874f3694168aa32bc53fb6b4e32;

//Free Forex/currencylayer API 12d827604b2d4438d4e5f5e375c48d33
//
