/*
 * replaces the tag with the one from an external html file
 * the > * css selector redirects to the content of the external tag
 */
$('header').load('html/imports.html header > *');
$('aside').load('html/imports.html aside > *');
$('footer').load('html/imports.html footer > *');
/*
 * sidebar slide animation
 */
$("aside").hover(function () {
    $(this).stop().animate({width: rem2px(6)}); // stop() interrupts the animation as the mouse moves away
}, function () {
    $(this).stop().width(rem2px(0.33));
});
/**
 * converts rem units to current viewport pixels since javascript doesn't accept relative units.
 * Used in sidebar js.
 * @param {Number} rem
 * @returns {Number}
 */
function rem2px(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}