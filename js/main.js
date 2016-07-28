/*global arrayContainer:true, SliderInstance:true, DomObjects:true, document, Slider*/
/*jslint devel: true, node: true, nomen: true, plusplus: true, vars: true, indent: 4, maxerr: 50*/
/*global variable*/
var fs = require("fs");
var file = '/Users/Home/Documents/Brackets/viagogo_developer_test/data.json';
var data, event = [],  xy2 = [], x2, y2, x2len, y2len, arrlen, x1 = 0, y1 = 0, xy1 = [], dist;

x2 = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

y2 = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

x2len = x2.length;
y2len = y2.length;
arrlen = 25;

function coordinates() {
    "use strict";
    x1 = document.getElementById("x1").value;
    y1 = document.getElementById("y1").value;
    xy1 = [ x1, y1];
    document.getElementById("display").innerHTML = xy1;
    console.log(xy1);
    return xy1;
}
coordinates();

function ecoors(xy2, x2len, y2len) {
    "use strict";
    var i, j;
    for (i = 0; i < x2len; i++) {
        for (j = 0; j < y2len; j++) {
            xy2.push({x: x2[i], y : y2[j]});
        }
    }
    //console.log(xy2);
    return (xy2);
}
ecoors(xy2, x2len, y2len);

function events(xy2, arrlen, dist) {
    "use strict";
    var i, t;

    function ticketnum() {
        t = Math.floor((Math.random() * 30) + 1);
        //console.log(t);
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
        i = Math.floor((Math.random() * 441) + 1);
        return i;
    }

    for (i = 0; i < arrlen; i++) {
        event.push({
            event_id : i,
            tickets : ticketnum(),
            prices : ticketprice(t),
            x : xy2[random(i)].x,
            y : xy2[random(i)].y,
            distance : dist
        });
    }
    //console.log(data.event[9].x);
    return data;
}
events(xy2, arrlen, dist);

function manhattan(xy1, data, xy2, dist) {
    "use strict";
    var x1 = xy1, y1, i, j, x2, y2;
    for (i = 0; i < arrlen; i++) {
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

    for (j = 0; j < 5; j++) {
        console.log("Id: " + data.event[j].event_id);
        data.event[j].prices.sort();
        console.log("Prices: " + data.event[j].prices[0]);
        console.log("Distance: " + data.event[j].distance);
    }
    //distArr.sort();
    //console.log(distArr);
    return data;
}
manhattan(xy1, data, arrlen, xy2);


fs.writeFile(file, JSON.stringify(data, null, 4), function (err) {
    "use strict";
    if (err) {
        console.log(err);
    }
    fs.readFile(file, function (err, data) {
        if (err) {
            return console.error(err);
        }
        //console.log("Asynchronous read: " + data.toString());
    });
});


