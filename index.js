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
            console.log(e.currentTarget.parentElement); // infoMovie2
            console.log(e.currentTarget.parentElement.parentElement);    // infoMovie donde están los datos
            
            const generalMovieDiv = e.currentTarget.parentElement.parentElement.parentElement;
            const infoMovieDiv = e.currentTarget.parentElement.parentElement;
            const infoMovie1Div = infoMovieDiv.children[0];
            const infoMovie2Div =  e.currentTarget.parentElement;
            const id = generalMovieDiv.id;
            const imgUrl = generalMovieDiv.children[0].currentSrc;

            const titleText = infoMovie1Div.children[0].textContent;
            const rating = infoMovie1Div.children[1].textContent;
            
            const runtime = infoMovie2Div.children[0].textContent;
            const genre = infoMovie2Div.children[1].textContent;
            
            const plot = infoMovieDiv.children[2].textContent; 
    
            
            /* const html = `
            <div class="movie" id="${id}" >
                <img src="${imgUrl}" />
                <p>${titleText}</p>
                <p>${rating}</p>
                <button class="removeFromWatchlist">Remove</button>
                <p>${runtime}</p>
                <p>${genre}</p>
                <p>${plot}</p>
            </div>
            `; */

            const html = `
            <div class="movie" id="${id}" >
                <img class="posterImg" src="${imgUrl}" />
                <div class="infoMovie">
                    <div class="infoMovie1">
                        <p class="movieTitle">${titleText}</p>
                        <p class="rating"><i class="fa fa fa-star"></i> ${rating}</p>
                    </div>
                    <div class="infoMovie2">
                        <p class="runtime">${runtime}</p>
                        <p class="genre">${genre}</p>
                        <button class="removeFromWatchlist"><i class="fa fa fa-minus"></i> Remove</button>
                    </div>
                    <p class="plot">${plot}</p>
                </div>
            </div>
            `;
            
            console.log(generalMovieDiv);
            localStorage.setItem(id, JSON.stringify(html));
            /* if(localStorage.getItem(id) !== null) {
            } */
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
                <img class="posterImg" src="${poster}" />
                <div class="infoMovie">
                    <div class="infoMovie1">
                        <p class="movieTitle">${title}</p>
                        <p class="rating"><i class="fa fa fa-star"></i> ${rating}</p>
                    </div>
                    <div class="infoMovie2">
                        <p class="runtime">${runtime}</p>
                        <p class="genre">${genre}</p>
                        <button class="toWatchlist"><i class="fa fa fa-plus"></i> Watchlist</button>
                    </div>
                    <p class="plot">${plot}</p>
                </div>
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




