
/*
 * converts rem units to current viewport pixels
 * this is because javascript doesn't accept relative units
 * used in sidebar js
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
    $('.booking > form').hide();
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
 * Booking popup
 */
function showForm() {
//    document.querySelector('.booking > form').style.display = "grid";
    $('.booking > form').slideDown();
    // tweak to hide overlay while loading, while i find a way to set a page loader
    $('.booking > form').css("visibility", "visible");
//    document.querySelector('.booking > form').classList.add(".overlay");
}
/* same code in jQuery */
//$('#bookbutton').click(function () {
//    $('.booking > form').css({'display': 'grid'});
//});
/*
 * hide booking form on click outside the window
 */
$(document).click(function (eventArg) {
    var objClicked = $(eventArg.target); // clicked element
    var div = ".booking > form"; // form selector
    var opener = '#bookbutton'; // selector that opens the form
    // [.closest()] returns the first ancestor of (selector) type
    // [.length > 0] is commonly used in jquery to check if an element exists
    if (!objClicked.closest(div).length > 0 && !objClicked.is(opener)) {
        // if([0].nodeName!="BUTTON")
        $(div).hide();
    }
});
/*
 * HOMEPAGE JAVASCRIPT
 */
window.addEventListener("load", function () {
xml("xml/movielist.xml", listing);
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
	$(nodes).each(function() { // repeat for each movie
            string += "<tr><td>" + $(this).attr("id") + "</td>"; // add movie id
		$(this).children().each( function() { // repeat for every child element of movie
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