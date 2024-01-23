document.addEventListener('DOMContentLoaded', () => {
    // Извличане на параметъра "id" от URL адреса
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    // Проверка дали имаме аниме и извикване на функцията за показване на информацията
    if (animeId) {
        fetchAnimeDetails(animeId);
    }
});

// Функция за извличане на информацията за анимето
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

// Функция за показване на информацията за анимето
function displayAnimeDetails(data) {
    const imageElement = document.getElementById('anime-image');
    const titleElement = document.getElementById('anime-title');
    const synopsisElement = document.getElementById('anime-synopsis');

    if (data && data.data) {
        const anime = data.data;

        // Попълване на снимката, името и описанието
        imageElement.src = anime.attributes.posterImage ? anime.attributes.posterImage.original : 'no-image.jpg';
        titleElement.textContent = anime.attributes.titles.en || anime.attributes.canonicalTitle;
        synopsisElement.textContent = anime.attributes.synopsis || 'No synopsis available.';
    } else {
        // Показване на съобщение за грешка, ако няма данни
        titleElement.textContent = 'Error loading anime details.';
    }
}
