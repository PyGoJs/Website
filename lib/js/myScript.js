/**
 * Created by Arnold on 15-2-2015.
 */

//DOM lib
headerListItem = $("header li");
roosterTable = $("#container table");

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

var roosterID;
var data0;

function roosterLink(a){
    roosterTable[0].innerHTML = "";
    switch (a){
        case 1:
            roosterID = 14307;
            break;
        case 2:
            roosterID = 14308;
            break;
        case 3:
            roosterID = 14327;
            break;
        case 4:
            roosterID = 14326;
            break;
        case 5:
            roosterID = 14339;
            break;
    }
    //Tabel maken voor het rooster

    for(var i = 0;i < times.length;i++){
        var row = document.getElementsByTagName("table")[0].insertRow(i);
        for(var x = 0;x < 6;x++){
            var cell1 = row.insertCell(0);
            cell1.innerHTML = "";
        }
        document.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = times[i];
    }


    /**
     * JSON informatie van xedule.com van het rooster
     */

    roosterTable.innerHTML = "";
    $.ajax({
        url: "http://xedule.novaember.com/weekschedule."+roosterID+".json?year=2015&week="+week,
        success: function (data) {
            data0 = JSON.parse(data);

            var counttd = 1;
            var counttr = 0;
            var counti = 0;
            var i = 0;


            //Day1
            for (x = 0;x < 5; x++) {
                while(counti < data0[x].events.length){
                    if(data0[x].events[counti] != null) {
                        var trtd = document.getElementsByTagName("tr")[counttr].getElementsByTagName("td")[counttd];
                        var start = data0[x].events[counti].start;
                        var end = data0[x].events[counti].end;
                        if (start == times[i]) {
                            trtd.innerHTML += data0[x].events[counti].description + "<br>";
                            trtd.innerHTML += data0[x].events[counti].start + "<br>";
                            trtd.innerHTML += data0[x].events[counti].end + "<br>";
                            trtd.innerHTML += data0[x].events[counti].facilities + "<br>" + "<br>";
                            counti++;
                        } else {

                        }
                        i++;
                        counttr++;
                    }
                }
                counti = 0;
                counttr = 0;
                counttd++;
                i = 0;
            }
        }
    });
}

/**
 * Arrays for the possible times
 */

var times = ["8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"];

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
                $("#wut").css("bottom","-14vh");
                $("#wut2").css("bottom","10.5vh");
            }
            break;
        default:
            CE = 0;
    }
},true);