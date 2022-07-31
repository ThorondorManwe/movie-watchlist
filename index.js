// Todo 1. Llama a la API y recupera las películas
// http://www.omdbapi.com/?apikey=6f184eb9&i=tt2283362
// http://www.omdbapi.com/?apikey=6f184eb9&t=titanic
/* fetch('http://www.omdbapi.com/?apikey=6f184eb9&s=jumanji')
    .then(response => response.json())
    .then(data => console.log(data)) */


// TODO: Que solo se pueda guardar una película una vez

const f = document.getElementById('searchForm');
const q = document.getElementById('query');
const moviesDiv = document.getElementById('movies');
const items = JSON.parse(localStorage.getItem('items')) || [];




/* function sendToWatchlist() {
    const watchlistButtons = document.querySelectorAll('.toWatchlist');
    /* console.log(watchlistButtons); 
    watchlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log(e.currentTarget.parentElement);
            const element = e.currentTarget.outerHTML;
            const html = element;
            //console.log(html);
            items.push(html);
            console.log(element);
            localStorage.setItem('items', JSON.stringify(items));
        });
    });
} */

function sendMovieToLocalStorage() {
    const watchlistButtons = document.querySelectorAll('.toWatchlist');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            /* console.log(e.currentTarget); */
            console.log(e.currentTarget.parentElement);
            console.log(e.currentTarget.parentElement.children);
            console.log(e.currentTarget.parentElement.children[0]);

            const id = e.currentTarget.parentElement.id;
            const imgUrl = e.currentTarget.parentElement.children[0].currentSrc;

            //const title = e.currentTarget.parentElement.children[1].outerHTML;
            const titleText = e.currentTarget.parentElement.children[1].textContent;
            const rating = e.currentTarget.parentElement.children[2].textContent;
            const runtime = e.currentTarget.parentElement.children[4].textContent;
            const genre = e.currentTarget.parentElement.children[5].textContent;
            const plot = e.currentTarget.parentElement.children[6].textContent;
            /* console.log(e.currentTarget.parentElement.outerHTML); */
            const element = e.currentTarget.outerHTML;
            
            const html = `
            <div class="movie" id="${id}" >
            <img src="${imgUrl}" />
            <p>${titleText}</p>
            <p>${rating}</p>
            <button class="removeFromWatchlist">Remove</button>
            <p>${runtime}</p>
            <p>${genre}</p>
            <p>${plot}</p>
            </div>
            `;
            
            console.log(html);
            localStorage.setItem(id, JSON.stringify(html));
            if(localStorage.getItem(id) !== null) {
            }
        });
    });
}

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
            const movieID = data.imdbID;
            
            // Todo 3. Presenta las películas en el front end
            html += `
            <div class="movie" id="${movieID}" >
                <img src="${poster}" />
                <p>${title}</p>
                <p>${rating}</p>
                <button class="toWatchlist">Watchlist</button>
                <p>${runtime}</p>
                <p>${genre}</p>
                <p>${plot}</p>
            </div>
            `;

            moviesDiv.innerHTML += html;

            // Todo 4. Habilita el botón para guardar en el watchlist
            //sendToWatchlist();
            sendMovieToLocalStorage();
        })
        
}

// Todo 2. Filtra las películas basado en el campo de búsqueda
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
export default items;




