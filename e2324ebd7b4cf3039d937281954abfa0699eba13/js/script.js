
/*
 * converts rem units to current viewport pixels
 * this is because javascript doesn't accept relative units
 */
function rem2px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
;

/*
 * JQUERY
 */
/*
 * onLoad
 */
$(document).ready(function () {
    /*
     * ensures video autoplay attribute works
     * if it's still not working, check the browser's setting
     * still needs to be verified with dynamic paging
     */
//    $("video[autoplay]").each(function () {
//        this.play();
//    });
    /*
     * sidebar slide animation
     */
    $("aside").hover(function () {
        $(this).stop().animate({width: rem2px(6)});
//        $(".sidecontent").show(); // done in css
    }, function () {
        $(this).stop().width(rem2px(0.33));
//        $(".sidecontent").hide(); // done in css
//        s.stop().animate({width: rem2px(0.33)}); // doesn't work well with css hover
    });
});

/*
 * Filter function called by input in index.html
 */
function filter() {
    /*
     * Case Sensitive
     */
//    var input = $("#filter").val();
//    $('#mytable tr:has(td):not(:contains('+ input +'))').slideUp(); 
//    $('#mytable tr:has(td):contains('+ input +')').slideDown(); 
    /*
     * Case Insensitive
     */
    var input = $("#filter").val().toLowerCase();
    $("#mytable tr:has(td)").each(function () {
        var row = $(this).text().toLowerCase();
        if (row.search(input) === -1) {
            $(this).slideUp();
        } else {
            $(this).slideDown();
        }
    });
}

/*
 * HOMEPAGE JAVASCRIPT
 */
window.addEventListener("load", function () {
    getMovieList();
});

function getMovieList() {
    var XHR = new XMLHttpRequest();
//
    XHR.open("GET", "xml/movielist.xml");
    //
    XHR.onreadystatechange = function () {
        // if state = 4 (DONE) and response status = 200 (OK)
        if (XHR.readyState === 4 && XHR.status === 200) {
            // Typical action to be performed when the document is ready:
            var xmlDoc = XHR.responseXML;
            tableRows(xmlDoc);
        }
    };
    // null parameter is optional
    XHR.send(null);
}

function tableRows(xmlDoc) {
    var entries = '';
    var column = xmlDoc.getElementsByTagName("movie"); // or xmlDoc.querySelector("[id^='_']");
    for (var i = 0; i < column.length; i++) {
        entries += "<tr><td>" + column[i].id + "</td>";
        var row = column[i].children; // column[i].childNodes; adds ancillary items
        for (var j = 0; j < row.length; j++) {
            entries += "<td>" + row[j].textContent + "</td>";
        }
        entries += "</tr>";
    }
    document.getElementById("mytable").innerHTML += entries; // appends rows to table header
}

/*
 * MOVIE PAGE JAVASCRIPT
 */

function bookingValidation() {
    var email = document.forms["booking"]["email"].value;
    var pattern = /.+@.+\..+/i;
    if (!pattern.test(email)) {
        alert("Invalid email, retry...");
        return false;
    }
}