const apiBaseUrl ="https://api.themoviedb.org/3";
const apiKey ="a049e15d028d2fa3a1b08266e6e05ed6";
const PosterBaseUrl = 'https://image.tmdb.org/t/p/w300';
const BackgroundUrl = 'https://image.tmdb.org/t/p/w780';
const AvatarBaseUrl = 'https://image.tmdb.org/t/p/w154';
const imdbUrl = 'https://www.imdb.com/title/';
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const comments = $("#reviews");

searchForm.addEventListener("submit",handleSearchFormSubmit);
function backIndex(){
    window.location.href = "index.html";
}
function handleSearchFormSubmit(event) {
    event.preventDefault();
    var query = $("#search-input").val(); 
    window.location.href = encodeURI('./search.html?'+'query='+query)

}

//获取movie id再加载页面
$(function(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movie_id = urlParams.get('movie_id');
    fetchDetails(movie_id);
    fetchReviews(movie_id);

});

//fetch detail&reviews JSON 
async function fetchDetails(movie_id) {
    const response = await fetch(`${apiBaseUrl}/movie/${movie_id}?api_key=${apiKey}&language=zh-CN`);
    const detail = await response.json();
    console.log(detail);
    displayDetail(detail);
}
async function fetchReviews(movie_id){
    const response = await fetch(`${apiBaseUrl}/movie/${movie_id}/reviews?api_key=${apiKey}`);
    const jsonResponse = await response.json();
	const reviews = jsonResponse.results;
    loadReviews(reviews);
}
function displayDetail(detail) {
    $("#title").text(detail.title);
    $("#orgTitle").text(detail.original_title);
    $("#relDate").text("上映时间:"+detail.release_date)
    $("#runtime").text("时长: "+Math.floor(detail.runtime/60)+"h "+detail.runtime%60+"m")
    $("#poster").attr("src",PosterBaseUrl+detail.poster_path);
    $("#backdrop").attr("src",BackgroundUrl+detail.backdrop_path);
    $("#imdbPage").attr("href",imdbUrl+detail.imdb_id);
    $("#rate").html((detail.vote_average).toFixed(1));
    $("#voteCount").html(detail.vote_count);
    //获取票房并转换格式
    var revenue=detail.revenue;
    var revnStr = '$';
    var convert = [1000*1000,1000,1]
    if(revenue=='0')
        revnStr='-';
    else{
        $.each(convert,function(index,val){
            revnStr+= (revenue/val).toFixed(0);
            revenue%=val
            if(revenue!='0')
                revnStr+=',';
        })
    }
    $("#revenue").html(revnStr);
    //类型标签展示
    var genres = detail.genres;
    $.each(genres, function(index,genre) {
        var li = '<li class="genre" id="genre">'+genre.name+'</li>'
        $("#genres").append(li);
     });
     $("#overview").append('\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+detail.overview);

}
function loadReviews(reviews){
    $.each(reviews, function(index,data){
        var avatarPath= data.author_details.avatar_path;
        if(avatarPath==null)
            avatarPath="../assets/default_avatar.png"
        else
            avatarPath=AvatarBaseUrl+avatarPath;
        var rating=data.author_details.rating;
        if(rating==null)
            rating='-';
        var pubulishTime=(data.updated_at).substring(0,10);

        var review = 
        `<div class="review" id="review">
            <div class="topRev">
                <div class="leftRev">
                    <img src="${avatarPath}" alt="avatar" class="avatar" id="avatar">
                    <p class="username" id="username">${data.author_details.username}</p>
                    <span class="revRating">⭐${rating}</span>
                </div> 
                <div class="rightRev">
                    <p class="comment" id="comment">${data.content}</p>
                </div>
            </div>
            <div class="bottomRev">
                <span class="pubTime" id="pubTime">${pubulishTime}</span>
            </div> 
        </div>`
        comments.html(review+comments.html());
    }) 
}

//点击评分弹出
$("#revButton").click(function(){ 
    var scrollTop = $(document).scrollTop();
    $("#background_div").show();
    $("#ejectRate").animate({
        opacity:"toggle"
    },'normal')

    $("#background_div").css({
        "width":"100vw",
        "height":"110vh",
        "top":scrollTop
    });
    // $("#ejectRate").show();
    $("#rateTitle").text($("#title").text())
    $('body').css('overflow','hidden');
});

//点击关闭或提交
var star = 0;
function resetReview(){
    $("#ejectRate").animate({
        opacity:"toggle"
    },'normal')
    // $("#ejectRate").hide();
    $("#background_div").hide();		
    $('body').css('overflow','visible');
    $("#score").text('?');
    $('#raty').data('raty').score(0);
    star = 0;
    $("#revSubmit").css({
        "background-color":"#444444",
        "color":"gainsboro",
        "cursor": "not-allowed"
    })
    $("#reviewInput").val('');
    $("#revSubmit").attr("disabled",true);
}

$("#close").click(function(){				
    resetReview();
});
//鼠标移动到关闭按钮，按钮变色
$("#close").mouseover(function(){
    $("#close").css("color","wheat");
});
$("#close").mouseout(function(){
    $("#close").css("color","white");
});

$('#raty').raty({
    path:"assets",
    starOff: 'star-off.png',
    starOn: 'star-on.png',
    starHalf: 'star-half.png',
    number: 10,
    score:0,
    hints:[1,2,3,4,5,6,7,8,9,10],
    click: function(score) {
        $("#score").text(score);
        star=score;
        $("#revSubmit").css({
            "background-color":"gold",
            "color":"black",
            "cursor": "pointer"
        })
        $("#revSubmit").attr("disabled",false);
    },
    mouseout:function(score){
        $('#raty').data('raty').score(star)
    }
});
//提交评论
$("#revSubmit").click(function(){	
    avatarPath="../assets/default_avatar.png"
    var rating = star;
    if(rating==null)
        rating='-';
    var curTime = new Date;
    var year = curTime.getFullYear(); 
    var month = curTime.getMonth() + 1; 
    var day = curTime.getDate();
    var pubulishTime=year+'-'+month+'-'+day;
    var review = 
    `<div class="review" id="review">
        <div class="topRev">
            <div class="leftRev">
                <img src="${avatarPath}" alt="avatar" class="avatar" id="avatar">
                <p class="username" id="username">${localStorage.getItem("username")}</p>
                <span class="revRating">⭐${rating}</span>
            </div> 
            <div class="rightRev">
                <p class="comment" id="comment">${$("#reviewInput").val()}</p>
            </div>
        </div>
        <div class="bottomRev">
            <span class="pubTime" id="pubTime">${pubulishTime}</span>
            <a class="delete" id="delete" onclick="deleteReview(this)">删除</a>
        </div> 
    </div>`
    comments.html(review+comments.html());
    resetReview();
});
//评论删除
function deleteReview(obj){
    var parent = obj.parentNode;
    var review = parent.parentNode;
    review.remove();
}



    


