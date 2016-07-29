/*jslint devel: true, node: true, nomen: true, plusplus: true, vars: true, indent: 4, maxerr: 50*/
/*global $, jQuery, angular, alert, arrayContainer:true, SliderInstance:true, DomObjects:true, document, Slider*/

var xy1 = [], data, dist;

function eventgen() {
    "use strict";
    var x2, y2, numE, xy2 = [];

    x2 = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    y2 = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    numE = 25;

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

    //console.log(xy2);

    function events() {
        var i, t, event = [];

        function ticketnum() {
            t = Math.floor((Math.random() * 30) + 1);
            return t;
        }

        function ticketprice(t) {
            var i, prices = [];
            for (i = 0; i < t; i++) {
                prices.push(Math.random() * t);
            }
            return prices;
        }

        data = {event : event};

        function random(i) {
            i = Math.floor((Math.random() * 440) + 1);
            return i;
        }

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

function coordinates() {
    "use strict";
    var x1, y1;
    x1 = document.getElementById("x1").value;
    y1 = document.getElementById("y1").value;
    xy1 = [x1, y1];
    document.getElementById("display").innerHTML = xy1;
    console.log(xy1);
    return xy1;
}
coordinates();

function main() {
    "use strict";
    var results;
    function manhattan() {
        var i, j, x1, y1, x2, y2, closeFive = [];
        for (i = 0; i < data.event.length; i++) {
            x1 = xy1[0];
            y1 = xy1[1];
            x2 = data.event[i].x;
            y2 = data.event[i].y;
            dist = Math.round(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
            dist = Math.abs(dist);
            data.event[i].distance = dist;
        }

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
        results = {Event : closeFive};

        for (j = 0; j < 5; j++) {
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

    results = JSON.stringify(results, null, 4);
    document.getElementById("results").innerHTML = results;
    console.log(results);
    return results;
}
main();
