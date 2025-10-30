const details = document.getElementById('movie-details');
const API_KEY = "1eeaebfd";
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (id) {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
        .then(res => res.json())
        .then(data => {
            details.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
       
        <img src="${data.Poster !== 'N/A' ? data.Poster : ''}" alt="${data.Title}" />
        <p><strong>Жанр:</strong> ${data.Genre}</p>
        <p><strong>Режиссёр:</strong> ${data.Director}</p>
        <p><strong>Актёры:</strong> ${data.Actors}</p>
        <p><strong>Описание:</strong> ${data.Plot}</p>
        <p><strong>IMDB:</strong> ${data.imdbRating}</p>
      `;
        });
} else {
    details.textContent = 'Фильм не найден';
}
