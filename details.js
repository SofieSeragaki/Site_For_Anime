document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    if (animeId) {
        fetchAnimeDetails(animeId);
    }
});

function fetchAnimeDetails(animeId) {
    const apiUrl = `https://kitsu.io/api/edge/anime/${animeId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => displayAnimeDetails(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayAnimeDetails(data) {
    const imageElement = document.getElementById('anime-image');
    const titleElement = document.getElementById('anime-title');
    const synopsisElement = document.getElementById('anime-synopsis');

    if (data && data.data) {
        const anime = data.data;

        imageElement.src = anime.attributes.posterImage ? anime.attributes.posterImage.original : 'no-image.jpg';
        titleElement.textContent = anime.attributes.titles.en || anime.attributes.canonicalTitle;
        synopsisElement.textContent = anime.attributes.synopsis || 'No synopsis available.';
    } else {
        titleElement.textContent = 'Error loading anime details.';
    }
}
