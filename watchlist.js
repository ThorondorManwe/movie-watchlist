const moviesWatchlist = document.getElementById('fromLocalStorage');
//const moviesLocal = JSON.parse(localStorage.getItem('items')) || [];
//const moviesLocal = JSON.parse(localStorage.getItem('tt7474352'));


// Obtiene todas las keys en local storage
/* function forEachKey(callback) {
    for (let i = 0; i < localStorage.length; i++) {
      callback(localStorage.key(i));
    }
} */

// Recorre Local Storage y Pone valores en html
function forEachKey(htmlDiv) {
    for (let i = 0; i < localStorage.length; i++) {
        //console.log(localStorage.getItem(localStorage.key(i)));
        //console.log(localStorage.key(i));
        htmlDiv.innerHTML += JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
    removeFromWatchlist();
}


function removeFromWatchlist() {
    const removeWatchlistButtons = document.querySelectorAll('.removeFromWatchlist');
    /* console.log(watchlistButtons); */
    removeWatchlistButtons.forEach(button => {
        //console.log(button);
        button.addEventListener('click', function(e) {
            const id = e.currentTarget.parentElement.id;
            localStorage.removeItem(id);
            forEachKey(moviesWatchlist);
            location.reload();
        });
    });
}

/* function fillWatchlist(htmlDiv) {
    htmlDiv.innerHTML = moviesLocal;
    removeFromWatchlist();
}

fillWatchlist(moviesWatchlist); */
forEachKey(moviesWatchlist);