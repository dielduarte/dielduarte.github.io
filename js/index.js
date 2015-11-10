/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        $('.blog-btn').on('click', function(){
        	$('body')
        		.removeClass('home-template')
        		.addClass('post-template');
        });

    });

}(jQuery));