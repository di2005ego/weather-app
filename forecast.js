document.getElementById("getForecast").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Введите город!");

  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const geoData = await geo.json();
  if (!geoData.results) return alert("Город не найден!");

  const { latitude, longitude } = geoData.results[0];

  // 3️⃣ Запрос прогноза на 3 дня
  const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`);
  const data = await resp.json();

  const days = data.daily.time;
  const max = data.daily.temperature_2m_max;
  const min = data.daily.temperature_2m_min;

  const container = document.getElementById("forecast");
  container.innerHTML = "<h2>Прогноз:</h2>" +
    days.map((d, i) => `
      <p>${d}: ${min[i]}°C — ${max[i]}°C</p>
    `).join("");
});