document.getElementById("getFacts").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Введите город!");

  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const geoData = await geo.json();
  if (!geoData.results) return alert("Город не найден!");

  const { latitude, longitude, name, country } = geoData.results[0];

  // 4️⃣ Запрос к API Sunrise-Sunset
  const resp = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
  const data = await resp.json();

  const sunrise = new Date(data.results.sunrise).toLocaleTimeString();
  const sunset = new Date(data.results.sunset).toLocaleTimeString();

  document.getElementById("facts").innerHTML = `
    <h2>${name}, ${country}</h2>
    <p>Восход: ${sunrise}</p>
    <p>Закат: ${sunset}</p>
  `;
});