function emailCheck() {
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var email = $("#email");
    var err = $("#emailerr");
    if (reg.test(email.val()) || email.val() == '') {
        err.hide();
        return true;
    } else {
        err.show();
        return false;
    }
}
function pswCheck() {
    var psw1 = $("#password").val();
    var psw2 = $("#repassword").val();
    var err = $("#pswerr");
    if(psw1 == psw2 || psw2==''){
        err.hide();
        return true;
    }else{
        err.show();
        return false;
    }
}
function register(){
    if(emailCheck() && pswCheck()){
        localStorage.setItem("username",$('#username').val())
        localStorage.setItem("password",$('#password').val())  
        return true;
    }
    else
        return false;
}