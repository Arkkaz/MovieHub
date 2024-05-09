//API SAVES
const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "a049e15d028d2fa3a1b08266e6e05ed6";
const imageBaseUrl = 'https://image.tmdb.org/t/p/w300';
// const BackgroundUrl = 'https://image.tmdb.org/t/p/original'
//绑定元素
const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
// const categoryTitle = document.getElementById("category-title");

fetchMoviesNowPlaying();
searchForm.addEventListener("submit", handleSearchFormSubmit);

//API获取
async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/trending/movie/week?api_key=${apiKey}&language=zh-CN&region=US`);
    const jsonResponse = await response.json();
    //获取json中results数组，也就是电影数据列表的数组
    const movies = jsonResponse.results;
    // jsonTest(movies)
    console.log(movies);
    displayMovies(movies);
}

//电影grid展示
function displayMovies(movies) {
    moviesGrid.innerHTML = movies
        .map(movie => `<a href="detail.html?movie_id=${movie.id}" class="movie-card" id="movieCard">
                        <img src="${imageBaseUrl}${movie.poster_path}"/>
                        <p>⭐${Number(movie.vote_average).toFixed(1)}</p>
                        <h1>${movie.title}</h1>
                    </a>`
        ).join("");
    // alert(movies.map(movie=> movie.title));
    //join将一长串map字符串数组转化为一个单独的字符串
}

//递交搜索输入
function handleSearchFormSubmit(event) {
    //阻止默认行为,不然提交后刷新网页,无法显示结果
    event.preventDefault();
    var query = $("#search-input").val();
    window.location.href = encodeURI('./search.html?' + 'query=' + query)

}


//轮播图
var slideIdx = 0;
// 点击上一张
$("a:first").click(function () {
    prev_pic();
})
// 点击下一张
$("a:last").click(function () {
    next_pic();
})
// 悬浮停止
$(".slideShow").mouseover(function () {
    clearInterval(id);
});
$(".slideShow").mouseout(function () {
    autoplay();
})


// 下一张
function next_pic() {
    slideIdx++;
    if (slideIdx > 4) {
        slideIdx = 0;
    }
    addStyle();
}

// 上一张
function prev_pic() {
    slideIdx--;
    if (slideIdx < 0) {
        slideIdx = 4;
    }
    addStyle();
}

// 控制图片显示隐藏,小圆点背景色
function addStyle() {
    // siblings同胞
    $("img").eq(slideIdx).fadeIn();
    $("img").eq(slideIdx).siblings().fadeOut();
    $("span").eq(slideIdx).addClass("active");
    $("span").eq(slideIdx).siblings().removeClass("active");
}

// 自动轮播
var id;
autoplay();
function autoplay() {
    id = setInterval(function () {
        next_pic();
    }, 1000)
}



