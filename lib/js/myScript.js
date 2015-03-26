/**
 * Created by Arnold on 15-2-2015.
 */

//DOM lib
headerListItem = $("header li");
roosterTable = $("#container table");
roosterClasses = $("#container #classes");

//Calculate which week of the year it is

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
var week = (new Date()).getWeek();

// Array for the class times

var times = ["8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30"];
var fullTimes = ["8:30-9:00","9:00-9:30","9:30-10:00","10:00-10:30","10:30-11:00","11:00-11:30","11:30-12:00","12:00-12:30","12:30-13:00","13:00-13:30","13:30-14:00","14:00-14:30","14:30-15:00","15:00-15:30","15:30-16:00","16:00-16:30"];


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
var klasID;
var data0;
var data1;

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
            klasID = 1;
            break;
        case 4:
            roosterID = 14326;
            break;
        case 5:
            roosterID = 14339;
            break;
        default:
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
}

$.ajax({
    url: "http://xedule.novaember.com/weekschedule.14327.json?year=2015&week="+week,
    success: function (data) {
        data0 = JSON.parse(data);

        //Var list
        var classID = 0;

        //Set date in the table heads
        var date = document.getElementsByClassName("date");

        //Set classes for each day
        var positionLeft = [179,357,535,713,891];
        var positionTop = [0,38,76,114,152,190,228,266,304,342,380,418,456,494,532,570,608,646,684,722];
        var positionHeight = [0,37,75,113,151,189,227,265,303,341,379,417,453,493,531,369,607,645,683,721];
        for(var x = 0; x < data0.length; x++){
            for(var i = 0; i < data0[x].events.length; i++){
                classID++;
                var b = 1;
                var a = 0;
                while(b<2) {
                    if (data0[x].events[i].start == times[a]) {
                        //console.log(data0[x].events[i]);
                        b = 2;
                        var c = 1;
                        var d = 0;
                        while(c<2){
                            var e = d - a;
                            if(data0[x].events[i].end == times[d]) {
                                c = 2;
                                //console.log(e);
                            } else {
                                d++;
                            }
                        }
                        if(data0[x].events[i].facilities[0] != null && data0[x].events[i].facilities[0] != null) {
                            roosterClasses[0].innerHTML += "<div data-day='"+x+"' data-start='"+data0[x].events[i].start+"' data-staff='"+data0[x].events[i].staffs[0]+"' class='classblock' value='"+classID+"' onclick='clickClass("+x+","+i+")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + positionLeft[x] + "px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].facilities[0] + " - " + data0[x].events[i].staffs[0] + "</i>" + "</div>";
                        } else if(data0[x].events[i].staffs[0] != null && data0[x].events[i].facilities[0] == null){
                            roosterClasses[0].innerHTML += "<div data-day='"+x+"' data-start='"+data0[x].events[i].start+"' class='classblock' value='"+classID+"' onclick='clickClass("+x+","+i+")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + positionLeft[x] + "px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].staffs[0] + "</i>" + "</div>";
                        } else if(data0[x].events[i].staffs[0] == null && data0[x].events[i].facilities[0] != null) {
                            roosterClasses[0].innerHTML += "<div data-day='"+x+"' data-start='"+data0[x].events[i].start+"' class='classblock' value='"+classID+"' onclick='clickClass("+x+","+i+")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + positionLeft[x] + "px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].facilities[0] + "</i>" + "</div>";
                        } else {
                            roosterClasses[0].innerHTML += "<div data-day='"+x+"' data-start='"+data0[x].events[i].start+"' class='classblock' value='"+classID+"' onclick='clickClass("+x+","+i+")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + positionLeft[x] + "px'>" + data0[x].events[i].description + "<br/>" + "<i></i>" + "</div>";
                        }
                    } else {
                        a++;
                    }
                }
            }
        }

        //Remove the day infront of the date
        var str;
        var res;
        var daysShort = ["Mon","Tue","Wed","Thu","Fri"];
        var monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        for(var x = 0; x < 5; x++){
            str = data0[x].date;
            res = str.replace(daysShort[x],"");
            date[x].innerHTML += res;
        }

        //Data van remies server

        $.ajax({
            url: "http://pygojs.remi.im/api/classitem?cid=1&yrwk=2015"+week,
            success: function(data){
                data1 = data;

                //DOM Lib
                var classBlock = $("#classes div");

                //Var Lib
                startHalf = ((data1[0].sched.start/60/60-0.2) + "").replace(".", ":") + "0";
                //test?
                for(var y = 0;y < data1.length;y++) {
                    start = data1[y].sched.start/60/60+":00";
                    startHalf = ((data1[y].sched.start / 60 / 60 - 0.2) + "").replace(".", ":") + "0";
                    for (var q = 0; q < classBlock.length; q++) {
                        if ((start === classBlock[q].getAttribute('data-start') || startHalf === classBlock[q].getAttribute('data-start')) && data1[y].sched.staff == classBlock[q].getAttribute('data-staff') && (data1[y].sched.day - 1) == classBlock[q].getAttribute('data-day')) {
                            console.log(startHalf, classBlock[q].getAttribute('data-start'));
                            var amountPrecent = data1[y].amntstus / data1[y].maxstus * 100;
                            classBlock[q].innerHTML += "<div class='aanwezigheidTab'><span>"+amountPrecent+"%</span><div class='aanwezigheid'><div style='width:" + amountPrecent + "%;' class='progressbar'></div></div></div>";

                        }
                    }
                }
            }
        });
    }
});

//Remies server data



function clickClass(x,i){
    // x = dag
    // i = les
    console.log(x,i);
}

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

//dinges

var exampleSocket = new WebSocket("ws://pygojs.remi.im", "protocolOne");

//
var start;
var startHalf;