document.addEventListener('DOMContentLoaded', function () {
    const moviesOutput = document.getElementById('cardsWrapper');
    const API_KEY = '970fbd68';

    function handleSearchResults(res) {
        moviesOutput.innerHTML = '';
        res.Search.map((item, index) => {
            let movie = document.createElement('figure');
            movie.setAttribute('class', 'movie-card');

            const title = item.Title;
            const image = `${item.Poster}` == 'N/A' ? 'images/no_image.png' : item.Poster;
            const movieImg = document.createElement("img");
            movieImg.setAttribute('src', image);
            movieImg.setAttribute('alt', title);
            movieImg.setAttribute('class', 'movie-card__poster');

            const movieTitle = document.createElement('span');
            movieTitle.setAttribute('class', 'movie-card__title');
            movieTitle.innerHTML = title;

            const movieDetails = document.createElement('ul');
            movieDetails.setAttribute('class', 'movie-card__details-list');

            const id = 'button_' + index;
            const movieButton = document.createElement('button');
            movieButton.setAttribute('class', 'button movie-card__button');
            movieButton.innerHTML = 'Details';
            movieButton.setAttribute('id', id);
            movieButton.addEventListener('click', function () {
                movieButton.innerHTML = `${movieButton.innerHTML}` == 'Details' ? 'Hide details' : 'Details';
                movieDetails.classList.toggle("active");
            })

            movie.append(movieImg, movieTitle, movieButton, movieDetails);
            moviesOutput.append(movie);

            searchMovieDetails(item.imdbID, index);
        });
    }

    function handleMovieDetails(res, index) {
        let movieDetails = document.getElementsByClassName('movie-card__details-list')[index];
        movieDetails.innerHTML = '';

        const plot = res.Plot;
        const moviePlot = document.createElement('li');
        moviePlot.setAttribute('class', 'movie-card__plot');
        moviePlot.innerHTML = plot;

        const imdbRating = res.imdbRating;
        const movieImdbRating = document.createElement('span');
        movieImdbRating.setAttribute('class', 'movie-card__rating');
        movieImdbRating.innerHTML = imdbRating;

        const released = res.Released;
        const movieReleased = document.createElement('li');
        movieReleased.innerHTML = '<b>Released: </b>' + released;

        const type = res.Type;
        const movieType = document.createElement('li');
        movieType.innerHTML = '<b>Type: </b>' + type;

        const genre = res.Genre;
        const movieGenre = document.createElement('li');
        movieGenre.innerHTML = '<b>Genre: </b>' + genre;

        movieDetails.append(moviePlot, movieImdbRating, movieReleased, movieType, movieGenre);
    }

    function handleError() {
        moviesOutput.innerHTML = '<div>No results</div>';
    }

    async function search(query) {
        try {
            const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
            const response = await request.json();
            handleSearchResults(response);
        } catch {
            handleError();
        }
    }

    async function searchMovieDetails(imdbId, index) {
        try {
            const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbId}`);
            const response = await request.json();
            handleMovieDetails(response, index);
        } catch {
            handleError();
        }
    }

    let searchText = document.querySelector("#searchText");
    searchText.addEventListener("keyup", function (e) {
        e.preventDefault();
        const moviesWrapper = document.querySelector(".movies");
        if (moviesWrapper) {
            moviesWrapper.parentNode.removeChild(moviesWrapper);
        }
        let inputField = document.querySelector("#searchText");
        if (inputField && inputField.value !== "") {
            search(inputField.value);
        }
    });

});