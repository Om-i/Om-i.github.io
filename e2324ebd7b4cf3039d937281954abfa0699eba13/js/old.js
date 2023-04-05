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
//    var column = xmlDoc.getElementsByTagName("movie"); // or xmlDoc.querySelectorAll("[id]"); to get all xml elements that have an id attribute
//    for (var i = 0; i < column.length; i++) {
//        entries += "<tr><td>" + column[i].id + "</td>"; // .id gets the movie attribute 'id'
//        var row = column[i].children; // column[i].childNodes; adds ancillary items
//        for (var j = 0; j < row.length; j++) {
//            entries += "<td>" + row[j].textContent + "</td>";
//        }
//        entries += "</tr>";
//    }
//    document.getElementById("mytable").innerHTML += entries; // appends rows to table header
////    document.getElementsByTagName("table")[0].innerHTML += entries; // same but doesn't use id selector
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


/**
 * Checks if the input is valid
 * @returns {Boolean}
 */
//            function bookingValidation() {
//                const name = document.forms["booking"]["name"].value; // Select form by name and input by name, return the input value
//                const email = document.forms["booking"]["email"].value;
//                const date = document.forms["booking"]["date"].value;
//                const pattern = /.+@.+\..+/i;                         // RegEx: "Select 3 strings separated by an @ and a dot"
//                if (name == 0 || date == 0) {                         // If name or date value are empty
//                    alert("All entries must be filled...");
//                    return false;
//                }
//                if (!pattern.test(email)) {                           // If email value doesn't match the RegEx criteria
//                    alert("Invalid email, retry...");
//                    return false;
//                }
//            }