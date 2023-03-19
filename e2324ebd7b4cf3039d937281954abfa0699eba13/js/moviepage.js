/*
             * Changes the content dynamically by calling moviepageXml()
             * multiple times with different parameters
             */
            onload = onhashchange = function () {  // chech if the page is loaded or the url hash changed
                moviePageXml('.title b', 'mtitle'); // run the xml function, replace the content of the first argument with the second
                moviePageXml('.description b', 'description');
                moviePageXml('.background', 'image');
                moviePageXml('.image img', 'image');
                moviePageXml('.iframe-container iframe', 'video');
            };
            /*
             * Use left and right arrow keys to navigate in the movie page
             */
            $(document).keydown(function (event) { // record the keyboard press event
                if (event.which === 37) {          // if the key pressed is left arrow (key code 37)
                    changeHash(-1);                // reduce the url hash by 1
                } else if (event.which === 39) {   // if the right arro is pressed instead (key code 39)
                    changeHash(1);                 // increase the hash by 1
                }
            });
            /*
             * Hide booking form on click outside the window
             */
            $(document).click(function (eventObj) { // .click() parameter is a function that passes an Event Object
                const clicked = $(eventObj.target); // the target of the event object is the clicked element
                const form = ".booking > form";     // form selector
                // .closest() returns the first ancestor of (selector) type
                // .length == 0 is commonly used in jQuery to check if an element doesn't exists
                if (!clicked.is('input') && !clicked.is('button')) { // if the clicked element doesn't have a (form) ancestor and is not the #bookbutton
                    // clicked.closest(form).length == 0 && !clicked.is('#bookbutton') // or clicked[0].nodeName!="BUTTON"
                    $(form).hide();
                }
            });
            /**
             * Imports the xml document and populates the selected container
             * with the xml element relative to the movie id.
             * Asyncronous Ajax Call, similar to XMLHttpRequest
             * @param {String} selector
             * @param {String} tag
             * @returns {undefined}
             */
            function moviePageXml(selector, tag) {
                $.ajax({// see specification on https://api.jquery.com/jquery.ajax/
                    url: 'xml/movielist.xml',
                    success: function (xml) {
                        /* start asyncronous call */
                        const id = +location.hash.substring(1);                  // take the current url id (hash), '+' sign casts string to integer
                        const content = $(xml).find(tag).eq(id - 1).text();      // take the xml doc, find the tag corresponding to the current id and return it's content
                        const sel = $(selector);                                 // take the jquery selector
                        if (sel.is('.background')) {                             // if the background is selected
                            sel.css('background-image', 'url(' + content + ')'); // change the background image url with the one in the xml
                        } else if (sel.is('img')) {                              // if the poster is selected
                            sel.attr("src", content);                            // change the source with the one in the xml
                        } else if (sel.is('iframe')) {                           // if the trailer is selected
                            sel.attr("src", content + // Add to the source the youtube video id stored in the xml
                                    "?autoplay=1&mute=1&modestbranding=1&iv_load_policy=3&rel=0"); // append some parameters for the youtube api
                        } else {
                            sel.html(content);                                   // change the content of the tag
                        }
                        /* end asyncronous call */
                    }
                });
            }
            /**
             * Changes the hash in the url by the amount specified in the offset
             * @param {Number} offset
             * @returns {undefined}
             */
            function changeHash(offset) {                      // parameter can be set to 1 by default with (offset = 1)
                const x = +location.hash.substring(1) + offset; // get the hash and remove the # symbol (the leading '+' casts the string to an integer). Add the offset
                if (x < 1 || 4 < x) {                           // if the result would go beyond the range of movies
                    return;                                     // stop function
                }
                if (isNaN(x)) {                                 // if the hash is not a number (it shouldn't happen anyway)
                    return location.hash = 1;                   // set the hash to 1 and exit the function
                }
                location.hash = x;                              // move to the new hash based on the offset
            }
            /**
             * Booking overlay
             * @returns {undefined}
             */
            function showForm() {
                $('.booking > form').slideDown(); // element is not hidden, but this animates the visibility attribute
                // tweak to hide overlay while loading, while i find a way to set a page loader
                $('.booking > form').css("visibility", "visible");
                //    document.querySelector('.booking > form').classList.add(".overlay");
            }
            
            
            /*
             * FORM VALIDATION CODE
             */
            
            
            /*
             * Prevents the user to insert an earlier date than today's.
             * Date() returns today's date, .toISOString() parses the date in ISO-8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
             * .split("T") divides the string in 2 array elements using the character "T" as separator.
             * Return only the first element (YYYY-MM-DD) which is then passed to the min attribute of the input tag
             */
//            $('#date').attr("min", new Date().toISOString().substring(0, 10));
            $('input[name="date"]').attr("min", new Date().toISOString().split("T")[0]);
            /*
             * Run the validation when the input element loses focus
             * Made with jQuery because css has a :focus selector but not a :blur one
             */
            $('input').blur(function () {
                validate($(this));
            });
            /*
             * Run the validation on every input entry right before submission
             * Stop the submission if the validation fails
             */
            $('.booking > form').submit(function (event) {
                $('input').each(function () {
                    if (validate($(this)) == false) {
                        event.preventDefault();
                    }
                });
                // Add a value attribute to the hidden title form containing the title shown in the current page.
                $('input[name="title"]').attr('value', $('.title b').text());
            });
            /**
             * Validation function
             * @param {jQuery} input
             * @returns {Boolean}
             */
            function validate(input) {
                const email = $('input[name="email"]');            // email input selector
                const isValid = /.+@.+\..+/i.test(email.val());    // compares the email input value with the following RegEx: "Select 3 strings separated by an @ and a dot, case insensitive" 
                if (input.is(email) && isValid) {                  // if input name is email and it matches the regex
                    return input.parent().removeClass('alert');    // clear red highlight and stop
                } else if (!input.is(email) && input.val() != 0) { // if input name is not email but is non empty
                    return input.parent().removeClass('alert');    // clear red highlight and stop
                } else {
                    input.parent().addClass('alert');              // apply red highlight
                    return false;
                }
            }