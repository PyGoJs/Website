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
var klasdata;
var blocknummerding;
var blockding = false;

// Arrays

var classes = ["row","lin","hel","pro","cis","daa","mcs","spo","eng","ned","coc","off","prg","har","emb","web","rek"];
var classesfull = ["Rots en Water","GNU/Linux","Helpdesk","Project","Cisco","Database","Microsoft Certified Solutions Expert","Sport","Engels","Nederlands","Coaching","Office","Programmeren","Hardware Software","Embedded Systems","Webdesign","Rekenen"];
var times = ["08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00"];
var fullTimes = ["8:30-9:00","9:00-9:30","9:30-10:00","10:00-10:30","10:30-11:00","11:00-11:30","11:30-12:00","12:00-12:30","12:30-13:00","13:00-13:30","13:30-14:00","14:00-14:30","14:30-15:00","15:00-15:30","15:30-16:00","16:00-16:30"];


function roosterLink(a){
    roosterClasses[0].innerHTML = "";
    switch (a){
        case 1: //B-ITB4-1a
            roosterID = 14307;
            klasid = 1;
            //ws.send("{\"page\": \"b-itb4-1a\"}");
            break;
        case 2: //B-ITB4-1b
            roosterID = 14308;
            klasid = 2;
            //ws.send("{\"page\": \"b-itb4-1b\"}");
            break;
        case 3: //B-ITB4-1c
            roosterID = 14327;
            klasid = 3;
            //ws.send("{\"page\": \"b-itb4-1c\"}");
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
        url: "//dev.xeduleapi.remi.im/schedule.json?aid="+klasid+"&legacy=true&year=2015&week="+week,
        success: function (data) {
            console.log(data);
            //data0 = JSON.parse(data);
            data0 = data;

            //Var list
            var classID = 0;

            //Set date in the table heads
            var date = document.getElementsByClassName("date");

            //Set classes for each day
            var positionLeft = $("td")[6].offsetWidth;
            var blockWidth = positionLeft - 4;
            var positionTop = $("td")[6].offsetHeight;//[0, 38, 76, 114, 152, 190, 228, 266, 304, 342, 380, 418, 456, 494, 532, 570, 608, 646, 684, 722,760,798,836,874,912,950,988,1026];
            var positionHeight = $("td")[6].offsetHeight;//[0, 37, 75, 113, 151, 189, 227, 265, 303, 341, 379, 417, 453, 493, 531, 569, 607, 645, 683, 721,759,797,835,873,911,949,987,2015];
            for (var x = 0; x < data0.length; x++) {
                for (var i = 0; i < data0[x].events.length; i++) {
                    classID++;
                    //----------------------------------
                    //  A = De start tijd van de les
                    //  B = Om de loop te stoppen
                    //  C = Om de loop te stoppen
                    //  D = De eind tijd van de lessen
                    //  E = Het verschil tussen A en D
                    //-----------------------------------
                    var b = 1;
                    var a = 0;
                    console.log("hai");
                    while (b < 2) {
                        console.log("pew", data0[x].events[i].start);
                        if (data0[x].events[i].start == times[a]) {
                            console.log("Kappow!");
                            b = 2;
                            var c = 1;
                            var d = 0;
                            while (c < 2) {
                                var e = d - a;
                                if (data0[x].events[i].end == times[d]) {
                                    c = 2;
                                } else {
                                    d++;
                                }

                            }
                            //TIJDELIJKE FIX
                            /*a = a - 4;
                             d = d - 4;*/
                            console.log(a*positionTop);
                            console.log(a,times[a],d,times[d],e,(e*positionHeight));
                            //EINDE TIJDELIJIKE FIX
                            if (data0[x].events[i].description == "Goede vrijdag") {
                                return;
                            }
                            if (data0[x].events[i].facilities != null && data0[x].events[i].facilities != null) {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' data-staff='" + data0[x].events[i].staffs[0] + "' class='classblock' value='" + classID + "' onclick='clickClass(this, " + x + "," + i + ")' style='height: " + ((e*positionHeight)-1) + "px; top: " + (a*positionTop) + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].facilities[0] + " - " + data0[x].events[i].staffs[0] + "</i>" + "<div class='aanwezigheidTab'></div></div>";
                            } else if (data0[x].events[i].staffs != null && data0[x].events[i].facilities == null) {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' data-staff='" + data0[x].events[i].staffs[0] + "' class='classblock' value='" + classID + "' onclick='clickClass(this, " + x + "," + i + ")' style='height: " + ((e*positionHeight)-1) + "px; top: " + (a*positionTop) + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].staffs[0] + "</i>" + "<div class='aanwezigheidTab'></div></div>";
                            } else if (data0[x].events[i].staffs == null && data0[x].events[i].facilities != null) {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' class='classblock' value='" + classID + "' onclick='clickClass(this, " + x + "," + i + ")' style='height: " + ((e*positionHeight)-1) + "px; top: " + (a*positionTop) + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i>" + data0[x].events[i].facilities[0] + "</i>" + "<div class='aanwezigheidTab'></div></div>";
                            } else {
                                roosterClasses[0].innerHTML += "<div data-day='" + x + "' data-start='" + data0[x].events[i].start + "' class='classblock' value='" + classID + "' onclick='clickClass(this, " + x + "," + i + ")' style='height: " + ((e*positionHeight)-1) + "px; top: " + (a*positionTop) + "px; left: " + ((x + 1) * positionLeft) + "px; width: "+blockWidth+"px'>" + data0[x].events[i].description + "<br/>" + "<i></i>" + "<div class='aanwezigheidTab'></div></div>";
                            } console.log("haaio");
                        } else if(a>times.length){
                            b = 2;
                            a = 0;
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
            //serverData();
        }
    });
}
/** Remies server data
 *  Dit word terug gebracht zodra het weer van toepassing is
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
                            classBlock[q].setAttribute("data-ciid", data1[y].id);
                            console.log(data1[y].id);
                        }
                    }
                }
            }
        },
        error: function(){
            console.log('Could not load data from remi.im');
        }
    });

}
 **/

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
function clickClass(e, x,i){
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
        if(data0[x].events[i].facilities[0] == null){
            document.getElementById("bucket").innerHTML += "<div id='popup'><div id='block'><div id='topbar'>"+lesNaam+"<i onclick='closeClass()' class='fa fa-times'></i></div><li>Start: "+data0[x].events[i].start+"</li><li>End: "+data0[x].events[i].end+"</li><li>Leraar: "+data0[x].events[i].staffs+"</li><div class='aanwezigen'></div>"+"</div></div>";
        } else {
            document.getElementById("bucket").innerHTML += "<div id='popup'><div id='block'><div id='topbar'>"+lesNaam+"<i onclick='closeClass()' class='fa fa-times'></i></div><li>Start: "+data0[x].events[i].start+"</li><li>End: "+data0[x].events[i].end+"</li><li>Leraar: "+data0[x].events[i].staffs+"</li><li>Lokaal: "+data0[x].events[i].facilities+"</li><div class='aanwezigen'></div>"+"</div></div>";
        }
        if(data0[x].events[i].description == "lin"){
            document.getElementById("block").style.backgroundImage = "url('../img/lin.png')";
        } else {
            var dinges = data0[x].date;
            if( dinges.indexOf("Apr 01") >= 1) {
                console.log("hai");
                document.getElementById("block").style.backgroundImage = "url('../img/img_0.png')";
            }
        }
        blockding = true;
        blocknummerding = e;
        plist(e);
    }
}
function closeClass(){
    document.getElementById("bucket").innerHTML = "";
    blockding = false;
}

//Presentielijst
function plist(e) {
    if(data1 != null) {
        var ci;
        var ciid = e.getAttribute("data-ciid");
        for (var y = 0; y < data1.length; y++) {
            if (data1[y].id == ciid) {
                ci = data1[y];
                break;
            }
        }
    }
    $.post("http://pygojs.remi.im/api/attendee?authkey=" + session + "&ciid=" + ciid, function (data) {
        klasdata = data;
        if (klasdata.error == null) {
            document.getElementsByClassName("aanwezigen")[0].innerHTML = "<table><thead><td style='width: 110px;'>Naam</td><td>Aanwezig</td><td>Tijd</td></thead></table>";
            var dinges = document.getElementsByClassName("aanwezigen")[0].getElementsByTagName("table")[0];
            console.log(dinges);
            for (var q = 0; q < klasdata.length; q++) {
                var aanwezig = "";
                var optijd = "";
                if (klasdata[q].attent == true) {
                    aanwezig = "<i style='color: green' class='fa fa-check-square-o'></i>";
                } else {
                    aanwezig = '<i style="color: darkred" class="fa fa-times"></i>';
                }
                if (klasdata[q].minsEarly < 0) {
                    optijd = ((klasdata[q].minsEarly - klasdata[q].minsEarly) - klasdata[q].minsEarly) + "min te laat";
                } else if (klasdata[q].minsEarly >= 0) {
                    optijd = "Optijd";
                }
                dinges.innerHTML += "<tr><td>" + klasdata[q].stu.name + "</td><td style='text-align: center'>" + aanwezig + "</td><td style='font-size: 0.8em;'>" + optijd + "</td></tr>";
            }
        } else if (klasdata.error == "invalid authkey") {
            var dingding = document.getElementsByClassName("aanwezigen")[0];
            dingding.innerHTML = '<div id="loginStuffs"><i class="fa fa-sign-in"></i><p>Login om de presentielijst te zien.</p></div>';
        }
    });
}
/*  Tijdelijk uitgezet tot de websockets weer van toepasing zijn
 //Websockets/Liveupdates

 var ws = new WebSocket("ws://remi.im:13375/ws");

 // Laat server weten naar welke rooster we kijken.
 ws.onopen = function(event) {
 ws.send("{\"page\": \"b-itb4-1c\"}");
 console.log("Verbonden");
 };
 ws.onerror = function(event) {
 console.log(event);
 };
 ws.onmessage = function(event) {
 console.log(event.data);
 serverData();
 if(blockding = true){
 plist(blocknummerding);
 }
 };
 */