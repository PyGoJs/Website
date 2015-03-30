/**
 * Created by Arnold on 29-3-2015.
 */

//DOM Lib
headerListItem = $("header li");


//Calculate which week of the year it is

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
var week = (new Date()).getWeek();

/**
 * This is the code for the navigation
 */

headerListItem.click(function(e) {
    if(this.value === 1) {
        $(this).val("2");
        $("p", this).addClass("selected");
        $("ul", this).css("transition","opacity 0.4s");
        $("ul", this).css("opacity", "1");
        $("ul", this).css("pointer-events", "auto");
    } else if(this.value === 2){
        $(this).val("1");
        $("p", this).removeClass("selected");
        $("ul", this).css("transition","opacity 0.2s");
        $("ul", this).css("opacity", "0");
        $("ul", this).css("pointer-events", "none");
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
        $("#info span#border").css("top","30px");
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
            $(this).children(".answer").css("max-height","100px");
        }
    }
});

/**
 *  Boredom
 */
/*
var CE = 0;

document.addEventListener('keydown', function(easteregg2) {
    switch (easteregg2.keyCode) {
        case 65:    //A
            if(CE == 1){
                CE++;
            }
            break;
        case 66:    //B
            if(CE == 2){
                CE++;
            }
            break;
        case 69:    //E
            if(CE == 3){
                CE++;
            }
            break;
        case 71:    //G
            if(CE == 0){
                CE++;
            }
            break;
        case 78:    //N
            if(CE == 4){
                CE++;
                console.log("Yesh!");
                $("#wut").css("transition","8s");
                $("#wut2").css("transition","8s");
                $("#wut").css("bottom","-14vh");
                $("#wut2").css("bottom","10.5vh");
            }
            break;
        default:
            CE = 0;
    }
},true);
    */
var CCA = 0;
function spawnSale(){
    document.getElementById("overlay").innerHTML += '<p style="transition: margin-top 5s; top: 50px;" class="sale">-75%</p>';
    setTimeout(function(){document.getElementsByClassName("sale")[CCA].style.marginTop = "1000px";CCA++;},100);
}