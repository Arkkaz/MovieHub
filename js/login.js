var localUser = localStorage.getItem("username");
var localPsw = localStorage.getItem("password");
function login(){
    var loginBtn = $("#loginBtn");
    var username = $("#username").val();
    var password = $("#password").val();  
    if(username == localUser && password == localPsw){
        return true;
    }else{
        loginBtn.val("账号或密码错误");
        loginBtn.css({
            "background-color":"#DC143C",
            // "cursor":"none"
            });
        loginBtn.attr("readonly",true);
        setTimeout(function(){
            loginBtn.css({
            "background-color":"#242424",
            });
            loginBtn.val("登录");
            loginBtn.attr("readonly",false);
        },900)
        
        return false; 
    }
}

//获取元素
var img = document.getElementById('eye');
var pwd = document.getElementById('password');
var flag = 0;
//注册事件，处理程序
img.onclick = function () {
//点击一次后，flag一定要发生变化
    if (flag == 0) {
        pwd.type = 'text';
        flag = 1;
        img.className = 'fa-solid fa-eye-slash';
    } else {
        pwd.type = 'password';
        flag = 0;
        img.className = 'fa-solid fa-eye';
    }
}