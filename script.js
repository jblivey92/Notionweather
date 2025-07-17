// script.js – Aesthetic Weather Widget using Tomorrow.io
const API_KEY = "GTyeXluYBtBWDkoFhRnwegoUq0EGS9yX";
const lat = 44.9429;
const lon = -123.0351;

const weatherIcons = {
  1000: "☀", // Clear
  1100: "🌤", // Mostly Clear🌤☁❄🌨🌩⛈🌧🌬
  1101: "🌤",  // Partly Cloudy
  1102: "🌤", // Mostly Cloudy
  1001: "🌤", // Cloudy
  4200: "🌧", // Light Rain
  4000: "🌧", // Drizzle
  4201: "🌧🌧", // Heavy Rain
  5000: "🌨", // Snow
  5100: "❄", // Light Snow
  5101: "❄❄", // Heavy Snow
  2000: "🌫️", // Fog
  6001: "🌬", // Freezing Rain
};

function toFahrenheit(celsius) {
  return ((celsius * 9) / 5 + 32).toFixed(1);
}

async function getWeather() {
  const res = await fetch(
    `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${API_KEY}`
  );
  const data = await res.json();
  const values = data.data.values;

  const tempF = toFahrenheit(values.temperature);
  const icon = weatherIcons[values.weatherCode] || "❓";
  const condition = icon + " " + tempF + "°F";

  document.getElementById("weather").textContent = condition;
}

async function getSunTimes() {
  const res = await fetch(
    `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1d&fields=sunriseTime,sunsetTime&apikey=${API_KEY}`
  );
  const data = await res.json();
  const values = data.timelines.daily[0].values;

  const sunrise = new Date(values.sunriseTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(values.sunsetTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  document.getElementById("sun").textContent = `𖤓 Sunrise: ${sunrise} | ☾ Sunset: ${sunset}`;
}

async function getForecast() {
  const res = await fetch(
    `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1d&fields=temperatureMax,temperatureMin,weatherCode&apikey=${API_KEY}`
  );
  const data = await res.json();
  const forecast = data.timelines.daily.slice(0, 3); // next 3 days

  let forecastHTML = "";
  forecast.forEach((day) => {
    const date = new Date(day.time).toLocaleDateString(undefined, {
      weekday: "short",
    });
    const high = toFahrenheit(day.values.temperatureMax);
    const low = toFahrenheit(day.values.temperatureMin);
    const icon = weatherIcons[day.values.weatherCode] || "❓";
    forecastHTML += `<div class="forecast-day">${date}<br>${icon}<br>${high}° / ${low}°</div>`;
  });

  document.getElementById("forecast").innerHTML = forecastHTML;
}

getWeather();
getSunTimes();
getForecast();
