//API SAVES
const apiBaseUrl ="https://api.themoviedb.org/3";
const apiKey ="a049e15d028d2fa3a1b08266e6e05ed6";
const imageBaseUrl = 'https://image.tmdb.org/t/p/w300';
//绑定元素
const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

fetchTopRated();
searchForm.addEventListener("submit",handleSearchFormSubmit);

function backIndex(){
    window.location.href = "index.html";
}
//API获取
async function fetchTopRated() {
    const responseUS = await fetch(`${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&region=US`);
    const responseCN = await fetch(`${apiBaseUrl}/movie/top_rated?api_key=${apiKey}&region=US&language=zh-CN`);
    const jsonResponseUS = await responseUS.json();
    const jsonResponseCN = await responseCN.json();
    //获取json中results数组，也就是电影数据列表的数组
	const movieUS = jsonResponseUS.results;
    const movieCN = jsonResponseCN.results;
    // console.log(moviesUS);
    displayMovies(movieUS,movieCN);
}

//电影grid展示
function displayMovies(movieUS,movieCN) {
    $.each(movieCN, function(index,data){
        var posterPath= imageBaseUrl+movieUS[index].poster_path;
        var movie =  
        `<a href="detail.html?movie_id=${data.id}" class="movie-card" id="movieCard">
            <img src="${posterPath}"/>
            <div class="card-right">
                <h1>${index+1}. ${data.title}</h1>
                <p>${data.overview}</p>
                <span>⭐${Number(data.vote_average).toFixed(1)}</span>
            </div>
        </a>`
        moviesGrid.innerHTML += movie;   
    })
}
//递交搜索输入
function handleSearchFormSubmit(event) {
    //阻止默认行为,不然提交后刷新网页,无法显示结果
    event.preventDefault();
    var query = $("#search-input").val(); 
    window.location.href = encodeURI('./search.html?'+'query='+query)

}

    



