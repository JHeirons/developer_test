/*jslint devel: true, nomen: true, plusplus: true, vars: true, indent: 4, maxerr: 50*/
function coordinates() {
    "use strict";
    
    var x1, y1, xy1;
    x1 = document.getElementById("x1").value;
    y1 = document.getElementById("y1").value;
    xy1 = [x1, y1];
    document.getElementById("display").innerHTML = xy1;
    return xy1;
}
coordinates();