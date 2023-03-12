/*
 * replaces the tag with the one from an external html file
 * the > * css selector redirects to the content of the external tag
 */
$(document).ready(function () { // load the function as soon as the page is opened
    $('header').load('html/imports.html header > *');
    $('aside').load('html/imports.html aside > *');
    $('footer').load('html/imports.html footer > *');
});