//Traemos los elementos que usaremos y creamos una let sin asignarle valor
//por el momento.
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

// Al formulario gregamos un evento submit y las instrucciones a ejecutar:
form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    //Invocamos la función getNews
    getNews();
});

//Creamos las peticiones de la función getNews
function getNews() {
    //Creamos nuestro Objeto
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET',`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=28b8b1e74b744d31a81155c594c74136`);
    articleRequest.onload = addNews;//Tiene asignada la función addNews
    articleRequest.onerror = handleError;//Tiene asignada la función handleError
    articleRequest.send();//Enviamos la petición.
}

function handleError() {
    console.log('Se ha presentado un error');
}

function addNews() {
    const data = JSON.parse(this.responseText);
    console.log(data);
    //La propiedad response 
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = snippet;
    responseContainer.appendChild(li);
}
