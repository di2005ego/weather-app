const form = document.getElementById('weather-form');
const result = document.getElementById('weather-result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (!city) return;

    result.innerHTML = "Загрузка...";

    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoRes.json();
    if (!geoData.results) {
        result.textContent = 'Город не найден';
        return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=3&timezone=auto`
    );
    const data = await weatherRes.json();

    const { current, daily } = data;
    const days = daily.time.map((date, i) => `
    <div><strong>${new Date(date).toLocaleDateString()}</strong> —
      🌡 ${daily.temperature_2m_min[i]}°C ... ${daily.temperature_2m_max[i]}°C,
      ☔ ${daily.precipitation_sum[i]} мм
    </div>`).join('');

    result.innerHTML = `
    <h2>${name}, ${country}</h2>
    <p>Температура: <strong>${current.temperature_2m}°C</strong></p>
    <p>Ветер: ${current.wind_speed_10m} м/с</p>
    <h3>Прогноз на 3 дня:</h3>
    ${days}
  `;
});
