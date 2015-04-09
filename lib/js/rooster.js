/**
 * Created by Arnold on 15-2-2015.
 */

//DOM lib
roosterTable = $("#container table");
roosterClasses = $("#container #classes");

//Var lib
var roosterID;
var klasid = 3;
var data0;
var data1;
var start;
var startHalf;

// Arrays

var classes = ["lin","hel","pro","cis","daa","mcs","spo","eng","ned","coc","off","prg","har","emb","web","rek"];
var classesfull = ["Linux","Helpdesk","Project","Cisco","Database","Microsoft Certified Solutions Expert","Sport","Engels","Nederlands","Coaching","Office","Programmeren","Hardware Software","Embedded Systems","Webdesign","Rekenen"];
var times = ["8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00"];
var fullTimes = ["8:30-9:00","9:00-9:30","9:30-10:00","10:00-10:30","10:30-11:00","11:00-11:30","11:30-12:00","12:00-12:30","12:30-13:00","13:00-13:30","13:30-14:00","14:00-14:30","14:30-15:00","15:00-15:30","15:30-16:00","16:00-16:30"];


function roosterLink(a){
    roosterClasses[0].innerHTML = "";
    switch (a){
        case 1: //B-ITB4-1a
            roosterID = 14307;
            klasid = 1;
            ws.send("{\"page\": \"b-itb4-1a\"}");
            break;
        case 2: //B-ITB4-1b
            roosterID = 14308;
            klasid = 2;
            ws.send("{\"page\": \"b-itb4-1b\"}");
            break;
        case 3: //B-ITB4-1c
            roosterID = 14327;
            klasid = 3;
            ws.send("{\"page\": \"b-itb4-1c\"}");
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
    setSchedule(roosterID);
}
setSchedule(14327);
function setSchedule(klasid){
    $.ajax({
        url: "http://xedule.novaember.com/weekschedule."+klasid+".json?year=2015&week=" + week,
        success: function (data) {
            data0 = JSON.parse(data);
            //Var list
            var classID = 0;

            //Set date in the table heads
            var date = document.getElementsByClassName("date");

            //Set classes for each day
            var positionLeft = $("td")[0].offsetWidth;
            var blockWidth = positionLeft - 4;
            var positionTop = [0, 38, 76, 114, 152, 190, 228, 266, 304, 342, 380, 418, 456, 494, 532, 570, 608, 646, 684, 722,760,798,836,874,912,950,988,1026];
            var positionHeight = [0, 37, 75, 113, 151, 189, 227, 265, 303, 341, 379, 417, 453, 493, 531, 569, 607, 645, 683, 721,759,797,835,873,911,949,987,2015];
            for (var x = 0; x < data0.length; x++) {
                for (var i = 0; i < data0[x].events.length; i++) {
                    classID++;
                    var b = 1;
                    var a = 0;
                    while (b < 2) {
                        if (data0[x].events[i].start == times[a]) {
                            b = 2;
                            var c = 1;
                            var d = 0;
                            while (c < 2) {
                                var e = d - a;
                                if (data0[x].events[i].end == times[d]) {
                                    if(d > 17){
                                        e = 17;
                                    }
                                    c = 2;
                                } else {
                                    d++;
                                }
                            }
                            if (data0[x].events[i].description == "Goede vrijdag"){
                                return;
                            }
                            if (data0[x].events[i].facilities[0] != null && data0[x].events[i].facilities[0] != null) {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' data-staff='" + data0[x].events[i].staffs[0] + "' class='classblock' value='" + classID + "' onclick='clickClass(" + x + "," + i + ")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].facilities[0] + " - " + data0[x].events[i].staffs[0] + "</i>" + "<div class='aanwezigheidTab'></div></div>";
                            } else if (data0[x].events[i].staffs[0] != null && data0[x].events[i].facilities[0] == null) {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' data-staff='" + data0[x].events[i].staffs[0] + "' class='classblock' value='" + classID + "' onclick='clickClass(" + x + "," + i + ")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].staffs[0] + "</i>" + "<div class='aanwezigheidTab'></div></div>";
                            } else if (data0[x].events[i].staffs[0] == null && data0[x].events[i].facilities[0] != null) {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' class='classblock' value='" + classID + "' onclick='clickClass(" + x + "," + i + ")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].facilities[0] + "</i>" + "<div class='aanwezigheidTab'></div></div>";
                            } else {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' class='classblock' value='" + classID + "' onclick='clickClass(" + x + "," + i + ")' style='height: " + positionHeight[e] + "px; top: " + positionTop[a] + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i></i>" + "<div class='aanwezigheidTab'></div></div>";
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
            var daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri"];
            var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            for (var x = 0; x < 5; x++) {
                str = data0[x].date;
                res = str.replace(daysShort[x], "");
                date[x].innerHTML = res;
            }

            //Data van remies server
            serverData();
        }
    });
}
//Remies server data
function serverData(){
    $.ajax({
        url: "http://pygojs.remi.im/api/classitem?cid=1&yrwk=2015"+week,
        success: function(data) {
            data1 = data;
            if (data1 != null) {

                //DOM Lib
                var classBlock = $("#classes div");

                //Var Lib
                startHalf = ((data1[0].sched.start / 60 / 60 - 0.2) + "").replace(".", ":") + "0";
                //Plaats de percentage balken
                for (var y = 0; y < data1.length; y++) {
                    start = data1[y].sched.start / 60 / 60 + ":00";
                    startHalf = ((data1[y].sched.start / 60 / 60 - 0.2) + "").replace(".", ":") + "0";
                    for (var q = 0; q < classBlock.length; q++) {
                        if ((start === classBlock[q].getAttribute('data-start') || startHalf === classBlock[q].getAttribute('data-start')) && data1[y].sched.staff == classBlock[q].getAttribute('data-staff') && (data1[y].sched.day - 1) == classBlock[q].getAttribute('data-day')) {
                            var amountPrecent = Math.floor(data1[y].amntstus / data1[y].maxstus * 100);
                            classBlock[q].getElementsByClassName("aanwezigheidTab")[0].innerHTML = "<span>" + amountPrecent + "%</span><div class='aanwezigheid'><div style='width:" + amountPrecent + "%;' class='progressbar'></div></div>";
                        }
                    }
                }
            }
        }
    });

}

//Week selectie
var amountofweeks = 0;
while(week >= amountofweeks){
    amountofweeks++;
    var weekSelected = "";
    if(week == amountofweeks){weekSelected = "selected"}
    $("td select")[0].innerHTML += '<option value="'+amountofweeks+'" '+weekSelected+'>'+amountofweeks+'</option>';
}

function changeWeek(){
    week = Number(document.getElementsByName("weekSelectie")[0].value);
    roosterLink(klasid);
}

/**
 * Click class
 * Dag = x
 * Les van de dag i
 */
function clickClass(x,i){
    console.log(x,i);
    if($("header ul#pcNav").css("display") == "none"){
        alert(data0[x].events[i].description +" - "+data0[x].events[i].staffs[0]+" | "+data0[x].events[i].start+" - "+data0[x].events[i].end);
    } else {
        var lesNaam = data0[x].events[i].description;
        var leeraar = "";
        for(var y = 0;y<classes.length;y++){
            if(classes[y] === data0[x].events[i].description){
                if(data0[x].events[i].staffs[0] != null){
                    leeraar = " - "+data0[x].events[i].staffs[0];
                } else leeraar = "";
                lesNaam = classesfull[y]+leeraar;
                y = classes.length;
            }
        }
        document.getElementById("bucket").innerHTML += "<div id='popup'><div id='block'><div id='topbar'>"+lesNaam+"<i onclick='closeClass()' class='fa fa-times'></i></div>"+data0[x].events[i].description+"</div></div>";
        if(data0[x].events[i].description == "lin"){
            document.getElementById("block").style.backgroundImage = "url('../img/lin.png')";
        }
    }
}
function closeClass(){
    document.getElementById("bucket").innerHTML = "";
}

//Websockets/Liveupdates

var ws = new WebSocket("ws://remi.im:13375/ws");

// Laat server weten naar welke rooster we kijken.
ws.onopen = function(event) {
    ws.send("{\"page\": \"b-itb4-"+klas+"\"}");
    console.log("Verbonden");
};
ws.onerror = function(event) {
    console.log(event);
};
ws.onmessage = function(event) {
    console.log(event.data);
    serverData();
};
