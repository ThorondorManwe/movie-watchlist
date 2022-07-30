// Todo 1. Llama a la API y recupera las películas
// http://www.omdbapi.com/?apikey=6f184eb9&i=tt2283362
// http://www.omdbapi.com/?apikey=6f184eb9&t=titanic
/* fetch('http://www.omdbapi.com/?apikey=6f184eb9&s=jumanji')
    .then(response => response.json())
    .then(data => console.log(data)) */

const f = document.getElementById('form');
const q = document.getElementById('query');
const moviesDiv = document.getElementById('movies');


function buscaMovie(id) {
    fetch(`http://www.omdbapi.com/?apikey=6f184eb9&i=${id}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            const title = data.Title;
            const runtime = data.Runtime;
            const genre = data.Genre;
            const poster = data.Poster;
            const plot = data.Plot;
            const rating = data.imdbRating;

            html += `
            <div class="movie">
                <img src="${poster}" />
                <p>${title}</p>
                <p>${rating}</p>
                <p>${runtime}</p>
                <p>${genre}</p>
                <p>${plot}</p>
            </div>
            `;

            moviesDiv.innerHTML += html;
        })
}

function buscaQuery(event) {
    event.preventDefault();
    //let searchQuery = event.target.value;
    let searchQuery = q.value;

    fetch(`http://www.omdbapi.com/?apikey=6f184eb9&s=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.Search);
        let movieArray = data.Search;
        moviesDiv.innerHTML = '';

        for (let i = 0; i < movieArray.length; i++) {
            const imdbID = movieArray[i].imdbID;
            buscaMovie(imdbID);
        }
    })
    
}


f.addEventListener('submit', buscaQuery);
// Todo 2. Filtra las películas basado en el campo de búsqueda
// Todo 3. Presenta las películas en el frot end
// Todo 4. Habilita el botón para guardar en el watchlist
