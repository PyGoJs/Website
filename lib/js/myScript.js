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
var CEE = 0;
$("#info #features i").click(function(e) {
    if(CEE <= 3) {
        if (this.className == "fa fa-download" && CEE == 2) {
            CEE++;
        } else if (this.className == "fa fa-users" && (CEE == 3 || CEE == 0)) {
            CEE++;
        } else if (this.className == "fa fa-link" && CEE == 1) {
            CEE++;
        } else {
            CEE = 0;
        }
    }
    if(CEE == 4){
        $("#info span#border").css("top","40px");
        $("#info span#border").css("height","23px");
    }
});

/**
 *  Boredom
 */

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