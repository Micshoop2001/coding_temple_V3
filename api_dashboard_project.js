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

  const currencyContainer = document.getElementById("currency-output");
  const currencybutton = document.getElementById("currency-api");
  const currencySelectfrom = document.getElementById("currencySelectfrom");
  const currencySelectto = document.getElementById("currencySelectto");
  const currencyamount = document.getElementById("currency-Amount");

  const dictionaryContainer = document.getElementById("dictionary-output");
  const dictionarybutton = document.getElementById("dictionary-api");
  const dictionaryInput = document.getElementById("DictionarysearchInput");

  const geoapifyContainer = document.getElementById("Geoapify-output");
  const geoapifybutton = document.getElementById("Geoapify-api");
  const geoapifyInput = document.getElementById("GeoapifyInput");

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

  async function getcurrencyDropdown(currencySelect, placeholder) {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    currencySelect.innerHTML = `<option value="">${placeholder}</option>`;

    currencies.forEach((curr) => {
      const option = document.createElement("option");
      option.value = curr;
      option.textContent = curr;
      currencySelect.appendChild(option);
    });
  }
  async function getcurrency() {
    const fromCurrency = currencySelectfrom.value;
    const toCurrency = currencySelectto.value;
    const amountValue = parseFloat(currencyamount.value);
    if (!fromCurrency || !toCurrency || isNaN(amountValue)) {
      currencyContainer.textContent =
        "Please select both currencies and amount.";
      return;
    }

    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();

    currencyContainer.innerHTML = "";
    const conversionrates = data.rates[toCurrency];
    const finalnum = amountValue * conversionrates;

    const userDiv = document.createElement("div");
    userDiv.innerHTML = `<div class="finalcurrency"><h3>Amount in ${toCurrency}: ${finalnum.toFixed(
      2
    )}</h3></div>`;
    currencyContainer.appendChild(userDiv);
  }

  async function getdictionarylookup() {
    const query = dictionaryInput.value.trim();
    if (!query) return;
    dictionaryContainer.innerHTML = "Searching...";
    const accesstoken = "3ff49bc4-ad9d-4ee0-b484-70552cc7bf62";

    const dicturl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(
      query
    )}?key=${encodeURIComponent(accesstoken)}`;

    const response = await fetch(dicturl);
    const data = await response.json();
    console.log(data);

    //const nounDiv = document.createElement("div");
    let nounDiv = `
      <div class="noun-card">
      <h3>${query}:</h3></div>`;
    data.forEach((noun) => {
      console.log(noun);
      nounDiv += `<p>${noun.fl}: ${noun.shortdef}</p>`;
    });

    dictionaryContainer.innerHTML = nounDiv;
  }

  async function getgeoapifymap() {
    const address = geoapifyInput.value.trim();
    if (!address) return;
    geoapifyContainer.innerHTML = "Searching...";
    const accesstoken = "b1a17874f3694168aa32bc53fb6b4e32";
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${encodeURIComponent(accesstoken)}`
    );
    const geocodingResult = await response.json();
    console.log(geocodingResult);

    const bbox = geocodingResult.features?.[0]?.bbox;
    const geoapifyurl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&area=rect:${bbox.join(
      ","
    )}&width=500&height=500&scaleFactor=2&apiKey=${encodeURIComponent(
      accesstoken
    )}`;
    const img = document.createElement("img");
    img.src = geoapifyurl;
    img.alt = "Geoapify Map";
    geoapifyContainer.innerHTML = "";
    geoapifyContainer.appendChild(img);
  }

  singleDogButton.addEventListener("click", getSingleDogImage);
  singleCatButton.addEventListener("click", getSingleCatImage);
  Weatherbutton.addEventListener("click", getWeatherInfo);
  gitbutton.addEventListener("click", getgithub);
  jokebutton.addEventListener("click", getjoke);
  moviebutton.addEventListener("click", getmovies);
  currencybutton.addEventListener("click", getcurrency);
  getcurrencyDropdown(currencySelectfrom, "from...");
  getcurrencyDropdown(currencySelectto, "to...");
  dictionarybutton.addEventListener("click", getdictionarylookup);
  geoapifybutton.addEventListener("click", getgeoapifymap);
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
