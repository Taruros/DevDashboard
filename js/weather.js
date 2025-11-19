async function fetchWeather() {
  const timestamp = Date.now();

  let cachedIP = null;
  try {
    cachedIP = JSON.parse(localStorage.getItem("ipData"));
  } catch (_) {}

  let location = null;
  if (cachedIP && timestamp - cachedIP.timestamp < 5 * 60 * 1000) {
    location = { city: cachedIP.city, country_name: cachedIP.country_name };
  } else {
    const { city, country_name } = await fetch("https://ipapi.co/json")
      .then((x) => x.json())
      .catch();
    location = { city, country_name };
    localStorage.setItem(
      "ipData",
      JSON.stringify({ timestamp, city, country_name })
    );
  }

  let cachedWeather = null;
  try {
    cachedWeather = JSON.parse(localStorage.getItem("weatherData"));
  } catch (_) {}

  if (
    cachedWeather &&
    location.city === cachedWeather.location.city &&
    timestamp - cachedWeather.timestamp < 15 * 60 * 1000
  ) {
    return { location: cachedWeather.location, weather: cachedWeather.weather };
  }

  const url = `https://devdashboard.vercel.app/api/weather?city=${location.city}`;

  try {
    const req = await fetch(url);
    if (!req.ok) throw new Error(req.status);
    const weather = await req.json();

    localStorage.setItem(
      "weatherData",
      JSON.stringify({
        timestamp,
        location,
        weather,
      })
    );

    return { location, weather };
  } catch (error) {
    if (cachedWeather) {
      console.warn("Weather fetch failed. Using stored data");
      return {
        location: cachedWeather.location,
        weather: cachedWeather.weather,
      };
    }
    throw error;
  }
}

function renderWeather({ location, weather }) {
  const current = weather.current;
  const weatherContainer = document.querySelector(".weather-module");
  weatherContainer.textContent = "";

  const currWeather = document.createElement("div");
  currWeather.classList.add("weather-current");
  const icon = document.createElement("img");
  icon.classList.add("weather-icon");
  icon.src = current.condition.icon;
  const temp = document.createElement("span");
  temp.classList.add("weather-temp", "weather-span");
  temp.textContent = `${current.temp_c}°C`;
  const condition = document.createElement("span");
  condition.classList.add("weather-condition", "weather-span");
  condition.textContent = current.condition.text;
  currWeather.append(icon, temp, condition);

  const city = document.createElement("span");
  city.classList.add("city", "weather-span");
  city.textContent = `${location.city}, ${location.country_name}`;

  weatherContainer.append(currWeather, city);
}

export async function initWeather() {
  try {
    const data = await fetchWeather();
    renderWeather(data);
  } catch (error) {
    document.querySelector(".weather-module").textContent =
      "Couldn't load weather data. Try again later.";
    console.error("Weather module error: ", error);
  }
}
