/*
             * Hide the table caption
             */
            $('caption').hide();
            /*
             * Populates the dropdown menu with the table header elements
             */
            $("#rowheader > th").each(function () {
                $("#dropdown").append("<option>" + $(this).text() + "</option>");
            });
            /**
             * Function running ONLOAD
             * Asyncronous xml call via jquery
             * Parses the xml document and structures the table
             * @returns {undefined}
             */
            onload = function listingPageXml() { // function as parameter!
                $.ajax({
                    url: 'xml/movielist.xml',
                    success: function (xml) {
                        /* start asyncronous call */
                        let string = '';                                      // set empty string
                        const nodes = $(xml).find('listing').children();      // set movie array
                        $(nodes).each(function () {                           // repeat for each movie
                            string += "<tr onclick=location='moviepage.html#" + $(this).attr("id") + "';>"; // create a link on top of the whole row 
//                            $(this).find("[table]").each(function () {      // repeat for every descendant of movie that has the [table] attribute (<mtitle table="">)
                            $(this).children().slice(0, 5).each(function () { // repeat for the first  5 children elements of movie (faster than the above)
                                string += "<td>" + $(this).text() + '</td>';  // add text content
                            });
                            string += "</tr>";                                // close table row
                        });
                        $('#mytable').append(string);                         // add html string to table content
                        /* end asyncronous call */
                    }
                });
            }
            /**
             * Filter function called by input in index.html
             * @returns {undefined}
             */
            function filter() {
                const index = $('th:contains(' + $("option:selected").val() + ')').index(); // Index of the table header element that corresponds to the dropdown selection
                const input = $("#filter").val().toLowerCase();                             // take the input value, parse it lowercase
                $('table tr:has(td)').each(function () {                                 // select all table rows that contain a td tag (no header) and loop through them
//                    const row = $(this).text().toLowerCase();                             // take the table row, parse it as lowercase string of text
                    const row = $(this).children().eq(index).text().toLowerCase();          // table row child in (index) position, parse content lowercase
                    if (row.search(input) === -1) {                                         // if row doesn't return any index in accordance to the input (defaults to -1)
                        $(this).fadeOut("fast");                                            // hide with fade effect
                    } else {
                        $(this).fadeIn("fast");                                             // show with fade effect
                    }
                });
                /* After applying the filter, wait till the fade animation ends and run a noResult check */
                setTimeout(noResult, 300); // approximate time after the table is updated and ready to parse
            }
            /*
             * Check if there are any entries remaining. If not show No Result label.
             * @returns {undefined}
             */
            function noResult() {
                if (!$('td').is(":visible")) {   // if no table data is visible
                    $('caption').fadeIn("fast"); // show table label "no Results"
                    $('th').hide();              // hide table header
                } else {
                    $('caption').hide();
                    $('th').fadeIn("fast");
                }
            }