/**
 * Created by Arnold on 15-3-2015.
 */

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function removeCookie(cname) {
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}
function checkSession(){
    var session = getCookie("session");
        if (session != null){ //if session token is found
        $.post( "http://pygojs.remi.im/auth/checkkey?authkey="+session, function( data ) {
            account = data;
            if(data.valid == true){
                $("#pcNav li#account p a")[0].innerHTML = "Account";
            } else {
                $("#pcNav li#account p a")[0].innerHTML = "Login";
            }
            checkAccount();
        });
    } else { //if session token is not found
        $("#pcNav li#account p a")[0].innerHTML = "Login";
    }
}
/*
function checkCookie() {
    var highscore = getCookie("Highscore");
    if (highscore != "") {
        $("#highscores #list")[0].innerHTML = highscore;
    }
}
checkCookie();
    */