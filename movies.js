const list = document.getElementById('movie-list');
const form = document.getElementById('movie-form');
const API_KEY = "eaebfd3cI";

const popular = ["Inception","The Dark Knight","Interstellar","Avatar","Titanic"];

async function loadPopular() {
    const responses = await Promise.all(
        popular.map(title =>
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`)
                .then(r => r.json())
        )
    );
    renderMovies(responses);
}

function renderMovies(movies) {
    list.innerHTML = movies.map(m => `
    <div class="movie-card" data-id="${m.imdbID}">
      <img src="${m.Poster !== 'N/A' ? m.Poster : ''}" alt="${m.Title}" />
      <strong>${m.Title}</strong>
      <div>${m.Year}</div>
    </div>
  `).join('');
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    if (!title) return;
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
    const data = await res.json();
    if (data.Response === 'False') { list.textContent = 'Ничего не найдено'; return; }
    renderMovies(data.Search);
});

list.addEventListener('click', (e) => {
    const card = e.target.closest('.movie-card');
    if (!card) return;
    const id = card.dataset.id;
    window.location.href = `movie.html?id=${id}`;
});

loadPopular();
