
/*
 * converts rem units to current viewport pixels since javascript doesn't accept relative units.
 * Used in sidebar js.
 */
function rem2px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/*
 * JQUERY
 */
/*
 * onLoad
 */
$(document).ready(function () {
    $('.booking > form').hide();
    $('caption').hide();
    /*
     * Populates the dropdown menu with the table header elements
     */
    $("#rowheader > th").each(function () {
        $("#dropdown").append("<option>" + $(this).text() + "</option>");
    });
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
        $(this).stop().animate({width: rem2px(6)}); // stop() halts the animation as the mouse moves away
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
    var index = $('th:contains(' + $("option:selected").val() + ')').index(); // Index of the table header element that corresponds to the dropdown selection
    var input = $(".filter").val().toLowerCase(); // take the input value, parse it lowercase
    $('#mytable tr:has(td)').each(function () { // select all table rows that contain a td tag (no header) and loop through them
//        var row = $(this).text().toLowerCase(); // take the table row, parse it as lowercase string of text
        var row = $(this).children().eq(index).text().toLowerCase(); // table row child in (index) position, parse content lowercase
        if (row.search(input) === -1) { // if row doesn't return any index in accordance to the input (defaults to -1)
            $(this).fadeOut("fast");  // hide with fade effect
        } else {
            $(this).fadeIn("fast"); // show with fade effect
        }
    });

    /*
     * After applying the filter, wait till the fade animation ends and check if
     * there are any entries remaining.
     */
    setTimeout(function () {
        if (!$('td').is(":visible")) { // if no table data is visible
            $('caption').fadeIn("fast"); // show table label "no Results"
            $('th').hide(); // hide table header
        } else {
            $('caption').hide();
            $('th').fadeIn("fast");
        }
    }, 300);
}


/*
 * Booking overlay
 */
function showForm() {
    $('.booking > form').slideDown(); // element is not hidden, but this animates the visibility attribute
    // tweak to hide overlay while loading, while i find a way to set a page loader
    $('.booking > form').css("visibility", "visible");
//    document.querySelector('.booking > form').classList.add(".overlay");
}
/*
 * Display form as grid
 */
//    document.querySelector('.booking > form').style.display = "grid";
/* same code in jQuery */
//$('#bookbutton').click(function () {
//    $('.booking > form').css({'display': 'grid'});
//});
/*
 * hide booking form on click outside the window
 */
$(document).click(function (eventObj) { // .click() parameter is a function that passes an Event Object
    var clicked = $(eventObj.target); // the target of the event object is the clicked element
    var form = ".booking > form"; // form selector
    // [.closest()] returns the first ancestor of (selector) type
    // [.length > 0] is commonly used in jquery to check if an element exists
    if (clicked.closest(form).length == 0 && !clicked.is('#bookbutton')) { // if the clicked element doesn't have a (form) ancestor and is not the #bookbutton
        // if([0].nodeName!="BUTTON")
        $(form).hide();
    }
});
/*
 * HOMEPAGE JAVASCRIPT
 */
window.addEventListener("load", function () {
    xml("xml/movielist2.xml", listing);
    /* js call */
//    getMovieList();
});

function xml(path, action) { // function as parameter!
    $.ajax({
        url: path,
        success: function (xml) {
            action(xml);
        }
    });
}
/* js version*/
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

function listing(xml) {
    var string = ''; // set empty string
    var nodes = $(xml).find('listing').children(); // set movie array
    $(nodes).each(function () { // repeat for each movie
        string += "<tr onclick=location='moviepage.html#" + $(this).attr("id") + "';>"; // create a link on top of the whole row 
//        $(this).find("[table]").each(function () { // repeat for every descendant of movie that has the [table] attribute (<mtitle table="">)
        $(this).children().slice(0, 5).each(function () { // repeat for the first  5 children elements of movie (faster than the above)
            string += "<td>" + $(this).text() + '</td>'; // add text content
        });
        string += "</tr>"; // close table row
    });
//        $('#mytable').html(string); // replace table content with html string
    $('#mytable').append(string); // add html string to table content
}

/* js version */
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