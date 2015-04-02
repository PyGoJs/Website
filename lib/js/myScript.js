/**
 * Created by Arnold on 29-3-2015.
 */

//DOM Lib
headerListLink = $("header li a");

//Calculate which week of the year it is

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
var week = (new Date()).getWeek();

/**
 * Header navigatie
 * Als op de <a> tag word geklikt binnen de header word deze code uitgevoerd
 */

headerListLink.click(function(){
    var $thispParent = $(this).parent("p");
    var $thisulParent = $thispParent.parent("li").children("ul");
    var $thisiParent = $thispParent.children("i");
    if($thispParent.attr('value') === "1") {
        $thisiParent.css("transform","rotate(180deg)");
        $thispParent.attr('value','2').addClass("selected");
        $thisulParent.css("transition","opacity 0.4s").css("opacity", "1").css("pointer-events", "auto");
    } else if($thispParent.attr('value') === "2"){
        $thisiParent.css("transform","rotate(0deg)");
        $thispParent.attr('value','1').removeClass("selected");
        $thisulParent.css("transition","opacity 0.2s").css("opacity", "0").css("pointer-events", "none");
    }
});

//Easteregg iets?

var CEE = 0;
$("#info #features i").click(function(e) {
    if(CEE <= 5) {
        if (this.className == "fa fa-download" && (CEE == 2 || CEE == 4)) {
            CEE++;
        } else if (this.className == "fa fa-users" && (CEE == 5 || CEE == 0)) {
            CEE++;
        } else if (this.className == "fa fa-link" && (CEE == 1 || CEE == 3)) {
            CEE++;
        } else {
            CEE = 0;
        }
    }
    if(CEE == 6){
        $("#info span#border").css("top","50px");
        $("#info span#border").css("height","23px");
        $("#wut").css("transition","8s");
        $("#wut2").css("transition","8s");
        $("#wut").css("bottom","-14vh");
        $("#wut2").css("bottom","10.5vh");
    }
});

//Mouse over circles border color
$("#info #features i").mouseover(function(){
    if (this.className == "fa fa-download") {
        document.getElementById("border").style.borderImage = "linear-gradient(to left, black, rgba(65, 115, 205, 1)) 1 0%";
        $("#info #features i").mouseout(function(){
            document.getElementById("border").style.borderImage = "linear-gradient(to left, black, rgba(0,0,0,1)) 1 49%";
        });
    } else if (this.className == "fa fa-users") {

    } else if (this.className == "fa fa-link") {
        document.getElementById("border").style.borderImage = "linear-gradient(to right, black, rgba(65, 115, 205, 1)) 1 0%";
        $("#info #features i").mouseout(function(){
            document.getElementById("border").style.borderImage = "linear-gradient(to right, black, rgba(0,0,0,1)) 1 49%";
        });
    }
});

//Open FAQ question
$("#info #faq .question").click(function(){
    var selected = $(this)[0];
    var ask = $(this).children(".ask")[0];
    if($(this).children(".ask")[0].className == "ask" || ask.className == "ask active") {
        if ($(this).children(".ask").hasClass("active") == true) {
            $(this).children(".ask").removeClass("active");
            $(this).children(".ask").children("i").css("transform","rotate(0deg) translate(0, 0)");
            $(this).children(".answer").css("max-height","0px");
        } else {
            $(this).children(".ask").addClass("active");
            $(this).children(".ask").children("i").css("transform","rotate(180deg) translate(0, 0)");
            $(this).children(".answer").css("max-height","400px");
        }
    }
});

/**
 * Accounts
 * If user is logged in, show different items in the "LOGIN" header bar
 */
//Login

var data2;
var klasdata;
$("#login").submit(function(event){
// Stuf
    event.preventDefault(); // Zodat die niet alsnog weg gaat

    var $form = $( this ),
        user = $form.find( "input[name='username']" ).val(),
        pass = $form.find( "input[name='password']" ).val();
    $.post( "http://pygojs.remi.im/auth/login?login="+user+"&password="+pass, function( data ) {
        data2 = data;
        if(data2.error == null){
            console.log("Logged in!");
            setCookie("session",data2.key,7);
            checkSession();
        } else {
            console.log("Failed to login");
        }
    }, "json");
});

//Account
function checkAccount(){
    if(klasdata.error == null){
        if($("title")[0].innerText != "PyGoJs"){var linking = "../";}else{var linking = "";}
        $("#pcNav li#account ul")[0].innerHTML = "<li><a href='"+linking+"account'>Account</a></li><li><a href='#settings'>Settings</a></li><li><a href='#' onclick='logout()'>Logout</a></li>";
    } else {

    }
}

//Logout
function logout(){
    removeCookie("session");
    location.reload();
}

/**
 *  Boredom
 */
var CCA = 0;
function spawnSale(){
    document.getElementById("overlay").innerHTML += '<p style="transition: margin-top 5s; top: 50px;" class="sale">-75%</p>';
    setTimeout(function(){document.getElementsByClassName("sale")[CCA].style.marginTop = "1000px";CCA++;},100);
}
