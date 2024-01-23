function searchAnime() {
    const searchTerm = document.getElementById('search-input').value;

    const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => displayResults(data))
        .catch(error => console.error('Error fetching data:', error));
}
function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data && data.data) {
        data.data.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';

            // Добавяне на обработчик на клик
            animeCard.addEventListener('click', () => {
                // Премахване на класа "selected" от всички елементи преди да го добавим към текущия
                document.querySelectorAll('.anime-card').forEach(card => {
                    card.classList.remove('selected');
                });

                // Добавяне на класа "selected" към текущия елемент
                animeCard.classList.add('selected');

                redirectToDetailsPage(anime.attributes.titles.en || anime.attributes.canonicalTitle, anime.id);
            });

            

            const image = document.createElement('img');
            image.src = anime.attributes.posterImage ? anime.attributes.posterImage.original : 'no-image.jpg';
            image.alt = 'Anime Poster';
            // Добавяне на клас за управление на размерите на снимката
            image.className = 'anime-image';
            animeCard.appendChild(image);

            const title = document.createElement('h2');
            title.textContent = anime.attributes.titles.en || anime.attributes.canonicalTitle;
            animeCard.appendChild(title);

            const synopsis = document.createElement('p');
            synopsis.textContent = anime.attributes.synopsis || 'No synopsis available.';
            animeCard.appendChild(synopsis);

            resultsContainer.appendChild(animeCard);
        });
    } else {
        resultsContainer.innerHTML = 'No results found.';
    }
}

function displayRandomResult(data, container) {
    // Проверка дали елементът за показване на резултата е намерен преди продължаване
    if (!container) {
        console.error('Result container not found.');
        return;
    }

    // Изчистване на предишни резултати
    container.innerHTML = '';

    if (data && data.data && data.data.length > 0) {
        // Избиране на случайно аниме от върнатите резултати
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const anime = data.data[randomIndex];

        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';

        const image = document.createElement('img');
        image.src = anime.attributes.posterImage ? anime.attributes.posterImage.original : 'no-image.jpg';
        image.alt = 'Anime Poster';
        image.className = 'anime-image';
        animeCard.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = anime.attributes.titles.en || anime.attributes.canonicalTitle;
        animeCard.appendChild(title);

        const synopsis = document.createElement('p');
        synopsis.textContent = anime.attributes.synopsis || 'No synopsis available.';
        animeCard.appendChild(synopsis);

        // Добавяне на обработчик на клик за пренасочване към страницата с подробности
        animeCard.addEventListener('click', () => {
            redirectToDetailsPage(anime.attributes.titles.en || anime.attributes.canonicalTitle, anime.id);
        });

        container.appendChild(animeCard);
    } else {
        container.innerHTML = 'No anime found.';
    }
}

function getRandomAnime() {
    const randomResultContainer = document.getElementById('random-result');

    // Проверка дали елементът е намерен преди продължаване
    if (!randomResultContainer) {
        console.error('Random result container not found.');
        return;
    }

    // Изчистване на предишни резултати
    randomResultContainer.innerHTML = '';

    const countApiUrl = 'https://kitsu.io/api/edge/anime';
    
    fetch(countApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            const totalCount = data.meta.count;
            
            // Генериране на случаен индекс в интервала [0, totalCount)
            const randomIndex = Math.floor(Math.random() * totalCount);

            // Извличане на конкретната страница, където се намира избраната случайно анимация
            const selectedPage = Math.floor(randomIndex / 10);
            
            const animeApiUrl = `https://kitsu.io/api/edge/anime?page[offset]=${selectedPage * 10}&page[limit]=1`;

            return fetch(animeApiUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => displayRandomResult(data, randomResultContainer))
        .catch(error => console.error('Error fetching data:', error));
}

function clearResults() {
    const resultsContainer = document.getElementById('results');
    const randomResultContainer = document.getElementById('random-result');

    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }

    if (randomResultContainer) {
        randomResultContainer.innerHTML = '';
    }
}

function redirectToDetailsPage(animeTitle, animeId) {
    // Формиране на URL за страницата с подробности
    const detailsPageUrl = `details.html?id=${animeId}`;

    // Пренасочване на потребителя към страницата с подробности
    window.location.href = detailsPageUrl;
}




