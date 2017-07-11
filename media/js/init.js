(function($){
    $(function(){

        $('.button-collapse').sideNav();
        $('::-webkit-scrollbar').css({display: 'none;'});
    }); // end of document ready
})(jQuery); // end of jQuery name space


// NAVIGATION button scrolling

$('#screen-one').click(function(e) {
     e.preventDefault()
        $.scrollify.move(0);
});
  $('#screen-two').click(function(e) {
     e.preventDefault()
        $.scrollify.move(1);
});
  $('#screen-three').click(function(e) {
     e.preventDefault()
        $.scrollify.move(2);
});
  $('#screen-four').click(function(e) {
     e.preventDefault()
        $.scrollify.move(3);
});
  $('#screen-five').click(function(e) {
     e.preventDefault()
        $.scrollify.move(4);
});
  $('#screen-six').click(function(e) {
     e.preventDefault()
        $.scrollify.move(2);
});






// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
                                                                  // delay of hide on scrollup
            $('header').removeClass('nav-up').addClass('nav-down').delay(4000).queue(function(next1){

                $(this).removeClass('nav-down').addClass('nav-up');
                next1();
            });                                                      
      }
    }
    
    lastScrollTop = st;
}

var t;
$("#header-wrapper")
    .hover(function(){ // mousein event ( show header )
        clearTimeout(t);
            $('header').removeClass('nav-up').addClass('nav-down');
        
    }, function(){ // mouseout event ( hide header )
        t = setTimeout(function() {
            
            $('header').removeClass('nav-down').addClass('nav-up');
        }, 4000);
    });


/*
$(document).ready(function() {

    $(".sidebar-nav a").click(function(evn){
        evn.preventDefault();
        
        $('html,body').scrollTo(this.hash, this.hash);
    
    });
});
*/

/* ============================================ */
/*  PAGE TAB ANIMATION ON SCROLL IN TO SECTION  */
/* ============================================ */
var $animation_elements = $('.page-title-rectangle-absolute');
var $window = $(window);

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
 
    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
 
        //check to see if this current container is within viewport
        if ((element_bottom_position > window_top_position) &&
            (element_top_position < window_bottom_position)) {
            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
            $element.css({left: "0px"});
            $element.removeClass('in-view');
            // do animation on page-tab
            $element.addClass('in-view');

        } else {
            // show element on it's initial position
            $element.css({left: "0px"});
            $element.removeClass('in-view');

        }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');



/* ============================================ */
/*                  SWIPER JS                   */
/* ============================================ */
$(document).ready(function() {
    var swiper = null;  // definition

    function onResize() {
        var windowsize = $(window).width();

        windowsize = $(window).width();
        if (windowsize < 1081) {
            
            $('.swiper-container').addClass('swiper-container-android swiper-container swiper-container-horizontal');
            $('.swiper-pagination').show();
            if(swiper == null) {
                swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });
                // debugger;
            }
        }
        else {
            if(swiper != null) {
                $('.swiper-container').each(function(){
                    this.swiper.destroy(true, true);
                });

                swiper = null;
                // debugger;
            }

            $('.swiper-pagination').hide();
        }
    }

    $(window).resize(function() {
        onResize();
    });
    onResize();
});