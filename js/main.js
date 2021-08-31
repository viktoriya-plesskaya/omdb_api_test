document.addEventListener('DOMContentLoaded', function () {
    const moviesOutput = document.getElementById('cardsWrapper');

    function handleResults(res) {
        moviesOutput.innerHTML = '';
        res.Search.map((item, index) => {
            const movie = document.createElement('figure');
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
            movieButton.setAttribute('class', 'button button--small');
            movieButton.innerHTML = 'Details';
            movieButton.setAttribute('id', id);
            movieButton.addEventListener('click', function () {
                movieButton.innerHTML = `${movieButton.innerHTML}` == 'Details' ? 'Hide details' : 'Details';
                movieDetails.classList.toggle("active");
            })

            const year = item.Year;
            const movieYear = document.createElement('li');
            movieYear.innerHTML = '<b>Year: </b>' + year;

            const type = item.Type;
            const movieType = document.createElement('li');
            movieType.innerHTML = '<b>Type: </b>' + type;

            const imdbID = item.imdbID;
            const movieImdbID = document.createElement('li');
            movieImdbID.innerHTML = '<b>imdbID: </b>' + imdbID;

            const actors = item.Actors;
            const movieActors = document.createElement('li');
            movieActors.innerHTML = actors;

            movieDetails.append(movieYear, movieType, movieImdbID);

            movie.append(movieImg, movieTitle, movieButton, movieDetails);
            moviesOutput.append(movie);
        });
    }

    function handleError() {
        moviesOutput.innerHTML = '<div>No results</div>';
    }

    async function handleSearch(query) {
        try {
            const API_KEY = '970fbd68';
            const request = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
            const response = await request.json();
            handleResults(response);
        } catch {
            handleError();
        }
    }

    let submitButton = document.querySelector("#buttonSubmit");
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        const moviesWrapper = document.querySelector(".movies");
        if (moviesWrapper) {
            moviesWrapper.parentNode.removeChild(moviesWrapper);
        }
        let inputField = document.querySelector("#searchText");
        if (inputField && inputField.value !== "") {
            handleSearch(inputField.value);
        }
    });

});