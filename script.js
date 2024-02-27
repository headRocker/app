const imageBgElement = document.querySelector("#image-bg");
const locationElement = document.querySelector("#location");
const dateElement = document.querySelector("#date");
const temperatureBigElement = document.querySelector("#temperature-big");
const weatherIconElement = document.querySelector("#weather-icon");
const weatherTypeElement = document.querySelector("#weather-type");
const temperatureElement = document.querySelector("#temperature");
const humidytiElement = document.querySelector("#humidyti");
const rainProbabilityElement = document.querySelector("#rain-probability");
const overlayBtnElement = document.querySelector("#overlay-btn");
const overlayLocationsElement = document.querySelector("#overlay-locations");
const locationsButtons = document.querySelectorAll("#overlay-locations button");
const preloaderElement = document.querySelector("#preloader");

locationsButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    fetchWeather(e.currentTarget.dataset.city);
    overlayBtnElement.classList.remove("open");
    overlayLocationsElement.classList.remove("open");
  });
});
const weatherTypes = {
  "Sunny ": "clear",
  Sunny: "clear",
  "Clear ": "clear",
  Clear: "clear",
  "Partly cloudy": "haze",
  Cloudy: "haze",
  "Cloudy ": "haze",
  Overcast: "cloudy",
  "Overcast ": "cloudy",
  "Light rain shower": "rainy",
  "Light rain": "rainy",
  "Heavy rain shower": "rainy",
  "Heavy rain at times": "rainy",
  "Heavy rain": "rain",
  "Patch rain nearby": "rainy",
  "Patch light drizzle": "rainy",
  "Patch light rain": "rainy",
  "Light drizzle": "rainy",
  "Modern rain at times": "rainy",
  "Modern rain": "rainy",
  "Light freezing rain": "rainy",
  "Moderate or heavy freezing rain": "rainy",
  "Torrential rain shower": "rainy",
  "Light sleet showers": "rainy",
  "Patchy light rain in area with thunder": "rainy",
  "Moderate or heavy rain in area with thunder": "rainy",
  "Moderate or heavy sleet showers": "rainy",
  "Moderate or heavy rain shower": "rainy",
  Mist: "foggy",
  "Mist ": "foggy",
  Fog: "foggy",
  "Fog ": "foggy",
  "Freezing Fog": "foggy",
  "Moderate snow": "snowy",
  "Light sleet": "snowy",
  "Moderate or heavy sleetight sleet": "snowy",
  "Patchy light snow": "snowy",
  "Light snow": "snowy",
  "Patchy moderate snow": "snowy",
  "Patchy heavy snow": "snowy",
  "Heavy snow": "snowy",
  "Ice pellets": "snowy",
  "Patch snow nearby": "snowy",
  "Patch sleet nearby": "snowy",
  "Patch freezing drizzle nearby": "snowy",
  "Freezing drizzle": "snowy",
  "Light snow showers": "snowy",
  "Light showers of ice pellets": "snowy",
  "Moderate or heavy showers of ice pellets": "snowy",
  "Moderate or heavy snow showers": "snowy",
  "Patchy light snow in area with thunder": "snowy",
  "Moderate or heavy snow in area with thunder": "snowy",
  "Heavy freezing drizzle": "snowy",
  "Blowing snow": "snowy",
  Blizard: "snowy",
};
overlayBtnElement.addEventListener("click", () => {
  overlayLocationsElement.classList.toggle("open");
  overlayBtnElement.classList.toggle("open");
});
async function fetchWeather(loc) {
  preloaderElement.style.display = "flex";
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${loc}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cb90a4b893msh3da381af1519a08p19a16djsnae1518602c3f",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    imageBgElement.src = `./images/${
      weatherTypes[result.current.condition.text]
    }.jpg`;
    locationElement.textContent = result.location.name;
    dateElement.textContent = moment().format("dddd, MMMM D, YYYY");
    temperatureBigElement.innerHTML = `${Math.round(
      result.current.temp_c
    )}&deg;C`;
    weatherIconElement.src = result.current.condition.icon.replace(
      "64x64",
      "128x128"
    );
    weatherTypeElement.textContent = result.current.condition.text;
    temperatureElement.innerHTML = `${result.current.feelslike_c}&deg;C`;
    humidytiElement.textContent = `${result.current.humidity}%`;
    rainProbabilityElement.textContent = `${result.current.precip_mm} mm`;
    imageBgElement.addEventListener(`load`, () => {
      preloaderElement.style.display = "none";
    });
  } catch (error) {
    console.error(error);
  }
}
fetchWeather("Paris");
