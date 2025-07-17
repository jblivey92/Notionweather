const API_KEY = GTyeXluYBtBWDkoFhRnwegoUq0EGS9yX;
const lat = 44.9429; // Salem, OR
const lon = -123.0351;

async function getWeatherData() {
  const url = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const temp = data.data.values.temperature;
  const condition = data.data.values.weatherCode;
  
  const conditionsMap = {
    1000: "Clear",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    4200: "Light Rain",
    4000: "Drizzle",
    4201: "Heavy Rain",
    5000: "Snow",
    5100: "Light Snow",
    5101: "Heavy Snow",
    // Add more as needed
  };

  document.getElementById("weather").textContent = `🌡 ${temp.toFixed(1)}°F, ${conditionsMap[condition] || "Unknown"}`;
}

async function getPollenData() {
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1d&fields=treeIndex,grassIndex,weedIndex&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const values = data.timelines.daily[0].values;

  document.getElementById("pollen").textContent =
    `🌳 Tree: ${values.treeIndex} | 🌾 Grass: ${values.grassIndex} | 🌿 Weed: ${values.weedIndex}`;
}

async function getSunData() {
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&timesteps=1d&fields=sunriseTime,sunsetTime&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const values = data.timelines.daily[0].values;
  const sunrise = new Date(values.sunriseTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(values.sunsetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  document.getElementById("sun").textContent = `🌅 Sunrise: ${sunrise} | 🌇 Sunset: ${sunset}`;
}

getWeatherData();
getPollenData();
getSunData();
