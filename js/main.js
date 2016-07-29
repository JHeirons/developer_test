/*jslint devel: true, node: true, nomen: true, plusplus: true, vars: true, indent: 4, maxerr: 50*/
/*global $, jQuery, angular, alert, arrayContainer:true, SliderInstance:true, DomObjects:true, document, Slider*/

var data, dist;

//Function to create seed data//
function eventgen() {
    "use strict";
    var x2, y2, numE, xy2 = [];

    x2 = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    y2 = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //Number of events to be created//
    numE = 25;

    //Function to retrun arrray of objects with all possible x,y coordinates//
    function ecoors() {
        var i, j;
        for (i = 0; i < x2.length; i++) {
            for (j = 0; j < y2.length; j++) {
                xy2.push({x: x2[i], y : y2[j]});
            }
        }
        return xy2;
    }
    ecoors();

    //Fucntion events creates object with each individual event data//
    function events() {
        var i, t, event = [];
        data = {event : event};

        //Function creates random number of tickets for each event, limited to 30//
        function ticketnum() {
            t = Math.floor((Math.random() * 30) + 1);
            return t;
        }

        //Function to create array of prices the size of the number of tickets each event hass//
        function ticketprice(t) {
            var i, prices = [], price;
            for (i = 0; i < t; i++) {
                price = (Math.random() * 100);
                //Restricts price to 2 decimal places//
                price = parseFloat(Math.round(price * 100) / 100).toFixed(2);
                prices.push(price);
            }
            return prices;
        }

        //Sets i to random number between 0 and 441 so each event has a random x,y coordinate from the xy2 array//
        function random(i) {
            i = Math.floor((Math.random() * 440) + 1);
            return i;
        }

        //For loop that creates each event object and adds it to the  event array//
        for (i = 0; i < numE; i++) {
            event.push({
                event_id : i,
                tickets : ticketnum(),
                prices : ticketprice(t),
                x : xy2[random(i)].x,
                y : xy2[random(i)].y,
                distance : dist
            });
        }
        return data;
    }
    events();
    //console.log(data)
}
eventgen();

function main() {
    "use strict";
    var x, xy1 = [], i, closeFive = [], html;

    //Function that takes the user inputted coordinates from the web page//
    function coordinates() {
        var x1, y1, text;
        x1 = document.getElementById("x1").value;
        y1 = document.getElementById("y1").value;
        // If x is Not a Number or less than one or greater than 10
        if ((isNaN(x1) || x1 < -10 || x1 > 10) || (isNaN(y1) || y1 < -10 || y1 > 10)) {
            text = "Input not valid";
            alert(text);
            x = false;
            document.getElementById("display").innerHTML = null;
        } else {
            text = null;
            x = true;
            xy1 = [x1, y1];
            document.getElementById("display").innerHTML = xy1;
        }

        return Boolean(x);
    }
    coordinates();

    //Function to compare the distance between the user and event coordinates//
    function manhattan() {
        var i, j, x1, y1, x2, y2;
        for (i = 0; i < data.event.length; i++) {
            x1 = xy1[0];
            y1 = xy1[1];
            x2 = data.event[i].x;
            y2 = data.event[i].y;
            //Finds the distance between the two coordinates//
            dist = Math.round(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
            //Takes the absolute value of the distance so that distance can be sorted starting at 0//
            dist = Math.abs(dist);
            //Sets events object property distance to the calculated distance//
            data.event[i].distance = dist;
        }

        //Function compares each objects distance and arranges distance in ascending order//
        function compare(a, b) {
            if (a.distance < b.distance) {
                return -1;
            }
            if (a.distance > b.distance) {
                return 1;
            }
            return 0;
        }
        data.event.sort(compare);

        //Loop adds the five closest events to a new array//
        for (j = 0; j < 5; j++) {
            //Sorts the price property of events in ascending order//
            data.event[j].prices.sort();
            closeFive.push({
                event_id : data.event[j].event_id,
                price : data.event[j].prices[0],
                distance : data.event[j].distance,
                x : data.event[j].x,
                y : data.event[j].y
            });
        }
        return closeFive;
    }
    manhattan();

    if (Boolean(x) === true) {
        //Creates html table element to display the five closest events//
        html = "<table>";
        for (i = 0; i < closeFive.length; i++) {
            html += "<tr>";
            html += "<td>" + "Event :" + "</td>";
            html += "<td>" + closeFive[i].event_id + "</td>";
            html += "<td>" + "Price :" + "</td>";
            html += "<td>" + "$" + closeFive[i].price + "</td>";
            html += "<td>" + "Distance :" + "</td>";
            html += "<td>" + closeFive[i].distance + "</td>";
            html += "<td>" + "X Coordinate :" + "</td>";
            html += "<td>" + closeFive[i].x + "</td>";
            html += "<td>" + "Y Coordinate :" + "</td>";
            html += "<td>" + closeFive[i].y + "</td>";
            html += "</tr>";

        }
        html += "</table>";
        document.getElementById("results").innerHTML = html;
    } else {
        document.getElementById("results").innerHTML = null;
    }
    return closeFive;
}
main();
