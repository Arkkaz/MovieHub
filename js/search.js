//API SAVES
const apiBaseUrl ="https://api.themoviedb.org/3";
const apiKey ="a049e15d028d2fa3a1b08266e6e05ed6";
const imageBaseUrl = 'https://image.tmdb.org/t/p/w300';

//绑定元素
const moviesGrid = document.getElementById("movies-grid");
const searchInput = $("#search-input");
const searchForm = document.getElementById("search-form");

var query = decodeURI(document.URL)
query=query.slice(query.indexOf("=")+1)
searchForm.addEventListener("submit",handleSearchFormSubmit);


function backIndex(){
    window.location.href = "index.html";
}

async function searchMovies(query){
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=zh-CN&region=US`);
    const jsonResponse = await response.json();
	const movies = jsonResponse.results;
    displayMovies(movies);
}

//电影grid展示
function displayMovies(movies) {
    moviesGrid.innerHTML = movies
        .map(movie =>`<a href="detail.html?movie_id=${movie.id}" class="movie-card" id="movieCard"">
                        <img src="${imageBaseUrl}${movie.poster_path}"/>
                        <p>⭐${Number(movie.vote_average).toFixed(1)}</p>
                        <h1>${movie.title}</h1>
                    </a>`    
    ).join("");
    //join将一长串map字符串数组转化为一个单独的字符串

}


//递交搜索输入
function handleSearchFormSubmit(event) {
    //阻止默认行为,不然提交后刷新网页,无法显示结果
    event.preventDefault();
    const movies = searchMovies(searchInput.val());
    displayMovies(movies);
}
//页面加载显示搜索结果
$(function(){
    searchInput.val(query)
    const movies = searchMovies(query);
    displayMovies(movies);
});