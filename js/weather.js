async function fetchWeather() {
  const timestamp = Date.now();
  const cached = JSON.parse(localStorage.getItem("weatherData")) || null;
  if (cached && timestamp - cached.timestamp < 15 * 60 * 1000) {
    return cached.data;
  }

  const key = "374d93e7dd324640aa3213201252910";
  const location = await fetch("https://ipapi.co/json").then((x) => x.json());
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location.city}`;

  const req = await fetch(url);
  if (!req.ok) throw new Error(req.status);
  const weather = await req.json();

  localStorage.setItem(
    "weatherData",
    JSON.stringify({
      timestamp,
      data: { location, weather },
    })
  );

  return { location, weather };
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
      "Error while loading weather";
    console.error("Weather module error: ", error);
  }
}
