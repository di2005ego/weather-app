const btn = document.getElementById("getWeather");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Введите город!");

  // 1️⃣ Запрос координат города
  const geoResp = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const geoData = await geoResp.json();

  if (!geoData.results || geoData.results.length === 0) {
    result.innerHTML = "Город не найден.";
    return;
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // 2️⃣ Запрос текущей погоды
  const weatherResp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const weatherData = await weatherResp.json();

  const temp = weatherData.current_weather.temperature;
  const wind = weatherData.current_weather.windspeed;

  result.innerHTML = `
    <h2>${name}, ${country}</h2>
    <p>Температура: ${temp}°C</p>
    <p>Ветер: ${wind} км/ч</p>
  `;
});
