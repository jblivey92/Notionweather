const API_KEY = "GTyeXluYBtBWDkoFhRnwegoUq0EGS9yX";
const lat = 44.9429;
const lon = -123.0351;

// Optional: weather code lookup
const weatherCodes = {
  1000: "Clear",
  1100: "Mostly Clear",
  1101: "Partly Cloudy",
  1102: "Mostly Cloudy",
  1001: "Cloudy",
  2000: "Fog",
  4000: "Drizzle",
  4200: "Light Rain",
  4001: "Rain",
  4201: "Heavy Rain",
  5000: "Snow",
  5100: "Light Snow",
  5101: "Heavy Snow",
  6000: "Freezing Drizzle",
  6200: "Light Freezing Rain",
  6001: "Freezing Rain",
  6201: "Heavy Freezing Rain",
};

async function getWeather() {
  const res = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${API_KEY}`);
  const data = await res.json();

  const tempC = data.data.values.temperature;
  const conditionCode = data.data.values.weatherCode;
  const condition = weatherCodes[conditionCode] || "Unknown";

  document.getElementById("weather").textContent = `🌤 ${tempC.toFixed(32)}°F, ${condition}`;
}

async function getSunTimes() {
  const res = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1d&fields=sunriseTime,sunsetTime&apikey=${API_KEY}`);
  const data = await res.json();

  const values = data.timelines.daily[0].values;
  const sunrise = new Date(values.sunriseTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(values.sunsetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  document.getElementById("sun").textContent = `🌅 Sunrise: ${sunrise} | 🌇 Sunset: ${sunset}`;
}

getWeather();
getSunTimes();
