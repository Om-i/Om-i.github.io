/*
 * As soon as the document is loaded
 */
$(document).ready(function () {
    /*
     * sidebar slide animation
     */
    $("aside").hover(function () {
        $(this).stop().animate({width: rem2px(6)}); // stop() interrupts the animation as the mouse moves away
    }, function () {
        $(this).stop().width(rem2px(0.33));
    });
});

/*
 * converts rem units to current viewport pixels since javascript doesn't accept relative units.
 * Used in sidebar js.
 */
function rem2px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/* xml call js version*/
//window.addEventListener("load", function () {
//    getMovieList();
//});
//
//function getMovieList() {
//    var XHR = new XMLHttpRequest();
//    XHR.open("GET", "xml/movielist.xml");
//    //
//    XHR.onreadystatechange = function () {
//        // if state = 4 (DONE) and response status = 200 (OK)
//        if (XHR.readyState === 4 && XHR.status === 200) {
//            // Typical action to be performed when the document is ready:
//            var xmlDoc = XHR.responseXML;
//            tableRows(xmlDoc);
//        }
//    };
//    // null parameter is optional
//    XHR.send(null);
//}

/* data import js version */
//function tableRows(xmlDoc) {
//    var entries = '';
//    var column = xmlDoc.getElementsByTagName("movie"); // or xmlDoc.querySelector("[id^='_']");
//    for (var i = 0; i < column.length; i++) {
//        entries += "<tr><td>" + column[i].id + "</td>";
//        var row = column[i].children; // column[i].childNodes; adds ancillary items
//        for (var j = 0; j < row.length; j++) {
//            entries += "<td>" + row[j].textContent + "</td>";
//        }
//        entries += "</tr>";
//    }
//    document.getElementById("mytable").innerHTML += entries; // appends rows to table header
//}

/*
 * QUERY STRING JS
 */
//            function getId() {
//                return new URL(window.location).searchParams.get("id");
//            }
//
//            function changeId(offset = 0) {              // default paremeter value, to avoid NaN output
//                var url = new URL(window.location);
//                var id = +url.searchParams.get("id");  // id is a string, leading '+' casts string to integer
//                url.searchParams.set("id", id + offset);
//                return url.href;
//            }



//                if (id === undefined && !!getId) { // .get("id") returns null if no id is present, !! casts null to false
//
//                }