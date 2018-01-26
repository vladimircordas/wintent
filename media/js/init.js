(function($){
    $(function(){

        $('.button-collapse').sideNav();

    }); // end of document ready
})(jQuery); // end of jQuery name space


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


// SIDEBAR NAVIGATION

    var scrollButton = $('#scroll-links li');

    $('#scroll-links li').on('click',function(e){
        e.preventDefault();
        for ( var i = 0; i < scrollButton.length; i++ ){
            if ( scrollButton[i] == this ) {
                $.scrollify.move(i);
            }
        }
    });
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
            // DISABLE SCROLLIFY ON MOBILE
            $.scrollify.disable();
            
            $('.swiper-container').addClass('swiper-container-android swiper-container swiper-container-horizontal');
            $('.swiper-pagination').show();
            if(swiper == null) {
                swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });
                // debugger;
            }
            // SIDEBAR MENU SCROLLING FUNCTION
            $(".sidebar-nav a").click(function(evn){
                evn.preventDefault();
                
                $('html,body').scrollTo(this.hash, this.hash);
            
            });
        }
        else {
            // ENABLE SCROLLIFY ON FULLSCREEN
            $.scrollify.enable();
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

// SVG BODYMOVING IMPLEMENTATION
   $('document').ready(function(){
        var animation = bodymovin.loadAnimation({
            container: document.getElementById('main-logo'),
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: './media/animation/LogoMain.json'
        });


        if ( $.browser.msie || $.browser.msedge ){
            $("#main-logo").remove();
            var d1 = document.getElementById('image-wrapper-main');
                d1.insertAdjacentHTML('beforeend', '<img id="main-logo2" class="image-rectangle-with-path" src="media/img/logo/wintent-main-logo.svg" alt="wintent logo">');
        }
        
    });

    
/* FERRIS WHEEL ANIMATION */
    


var $ferrisAnimation_element = $('#competencies-ferris')
var $window = $(window);
var ferrisIsAnimated = false;


function check_if_in_view_ferris() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($ferrisAnimation_element, function() {
        var $ferrisAnimation = $(this);
        var ferrisAnimation_height = $ferrisAnimation.outerHeight();
        var ferrisAnimation_top_position = $ferrisAnimation.offset().top;
        var ferrisAnimation_bottom_position = (ferrisAnimation_top_position + ferrisAnimation_height);
        

        if ((ferrisAnimation_bottom_position >= window_top_position) &&
            (ferrisAnimation_top_position <= window_bottom_position)) {

            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position

            if(ferrisIsAnimated == false) {
             ferrisIsAnimated = true;
       
            setTimeout(function () {
                      
                 
                 var animation2 = bodymovin.loadAnimation({
                     container: document.getElementById('competencies-ferris'),
                     renderer: 'svg',
                     loop: true,
                     autoplay: true,
                     path: './media/animation/CompetenciesPage_Wheel.json'
                 });

                 


             }, 500);
         }
       
        } else {
            // show element on it's initial position
           $('#competencies-ferris').empty();
           ferrisIsAnimated = false; 
           animated = false; // - ako je ovo duplikat skini
        }
    });
}

$window.on('scroll resize', check_if_in_view_ferris);
$window.trigger('scroll');
/*
var $ferrisAnimation_element = $('#competencies-ferris')
var $window = $(window);

function check_if_in_view_ferris() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($ferrisAnimation_element, function() {
        var $ferrisAnimation = $(this);
        var ferrisAnimation_height = $ferrisAnimation.outerHeight();
        var ferrisAnimation_top_position = $ferrisAnimation.offset().top;
        var ferrisAnimation_bottom_position = (ferrisAnimation_top_position + ferrisAnimation_height);
 
        if ((ferrisAnimation_bottom_position > window_top_position) &&
            (ferrisAnimation_top_position < window_bottom_position)) {

            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
           
           setTimeout(function () {
                     
                
                var animation2 = bodymovin.loadAnimation({
                    container: document.getElementById('competencies-ferris'),
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: './media/animation/CompetenciesPage_Wheel.json'
                });

                


            }, 500);


        } else {
            // show element on it's initial position
           $('#competencies-ferris').empty();

        }
    });
}

$window.on('scroll resize', check_if_in_view_ferris);
$window.trigger('scroll');
*/

/* PROCESS PAGE ANIMATIONS */
/* DISCOVER SVG ANIMATION */
var $discoverAnimation_element = $('#discover-icon')
var $window = $(window);
var discoverIsAnimated = false;

function check_if_in_view_discover() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($discoverAnimation_element, function() {
        var $discoverAnimation = $(this);
        var discoverAnimation_height = $discoverAnimation.outerHeight();
        var discoverAnimation_top_position = $discoverAnimation.offset().top;
        var discoverAnimation_bottom_position = (discoverAnimation_top_position + discoverAnimation_height);
 
        if ((discoverAnimation_bottom_position > window_top_position) &&
            (discoverAnimation_top_position < window_bottom_position)) {

            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
            if(discoverIsAnimated == false) {
                discoverIsAnimated = true;

                setTimeout(function () {
                     
                
                    var animation3 = bodymovin.loadAnimation({
                        container: document.getElementById('discover-icon'),
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        path: './media/animation/ProcessPage_Discover.json'
                    });

                    $('.hr-discover').addClass('hr-process-anim');


                }, 500);

            }
       
        } else {
            // show element on it's initial position
           $('#discover-icon').empty();
           discoverIsAnimated = false; 
           animated = false; // - ako je ovo duplikat skini
           $('.hr-discover').removeClass('hr-process-anim');
        }
    });
}

/* DEFINE SVG ANIMATION */
$window.on('scroll resize', check_if_in_view_discover);
$window.trigger('scroll');
var defineIsAnimated = false;

var $defineAnimation_element = $('#define-icon')
var $window = $(window);

function check_if_in_view_define() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($defineAnimation_element, function() {
        var $defineAnimation = $(this);
        var defineAnimation_height = $defineAnimation.outerHeight();
        var defineAnimation_top_position = $defineAnimation.offset().top;
        var defineAnimation_bottom_position = (defineAnimation_top_position + defineAnimation_height);
 
        if ((defineAnimation_bottom_position > window_top_position) &&
            (defineAnimation_top_position < window_bottom_position)) {

            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
            if(defineIsAnimated == false) {
                defineIsAnimated = true;

                setTimeout(function () {
                         
                    
                    var animation4 = bodymovin.loadAnimation({
                        container: document.getElementById('define-icon'),
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        path: './media/animation/ProcessPage_Define.json'
                    });
                    setTimeout(function () {
                        $('.hr-define').addClass('hr-process-anim');

                    }, 650);
                }, 300);

            }
       
        } else {
            // show element on it's initial position
           $('#define-icon').empty();
           defineIsAnimated = false; 
           animated = false; // - ako je ovo duplikat skini

           $('.hr-define').removeClass('hr-process-anim');
        }
    });
}

$window.on('scroll resize', check_if_in_view_define);
$window.trigger('scroll');

/* STRATEGIZE SVG ANIMATION */

var $strategizeAnimation_element = $('#strategize-icon')
var $window = $(window);
var strategizeIsAnimated = false;

function check_if_in_view_strategize() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($strategizeAnimation_element, function() {
        var $strategizeAnimation = $(this);
        var strategizeAnimation_height = $strategizeAnimation.outerHeight();
        var strategizeAnimation_top_position = $strategizeAnimation.offset().top;
        var strategizeAnimation_bottom_position = (strategizeAnimation_top_position + strategizeAnimation_height);
 
        if ((strategizeAnimation_bottom_position > window_top_position) &&
            (strategizeAnimation_top_position < window_bottom_position)) {

            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
            
            if(strategizeIsAnimated == false) {
                strategizeIsAnimated = true;

                setTimeout(function () {
                         
                    
                    var animation5 = bodymovin.loadAnimation({
                        container: document.getElementById('strategize-icon'),
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        path: './media/animation/ProcessPage_Strategize.json'
                    });

                    setTimeout(function () {
                        $('.hr-strategize').addClass('hr-process-anim');

                    }, 1450);


                }, 100);

            }
       
        } else {
            // show element on it's initial position
           $('#strategize-icon').empty();
           strategizeIsAnimated = false; 
           animated = false; // - ako je ovo duplikat skini
           $('.hr-strategize').removeClass('hr-process-anim');
        }
    });
}

$window.on('scroll resize', check_if_in_view_strategize);
$window.trigger('scroll');

/* DESIGN SVG ANIMATION */
    
var $designAnimation_element = $('#design-icon')
var $window = $(window);
var designIsAnimated = false;

function check_if_in_view_design() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($designAnimation_element, function() {
        var $designAnimation = $(this);
        var designAnimation_height = $designAnimation.outerHeight();
        var designAnimation_top_position = $designAnimation.offset().top;
        var designAnimation_bottom_position = (designAnimation_top_position + designAnimation_height);
 
        if ((designAnimation_bottom_position > window_top_position) &&
            (designAnimation_top_position < window_bottom_position)) {

            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
           
            if(designIsAnimated == false) {
                designIsAnimated = true;

                setTimeout(function () {
                         
                    
                    var animation6 = bodymovin.loadAnimation({
                        container: document.getElementById('design-icon'),
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        path: './media/animation/ProcessPage_Design.json'
                    });

                    setTimeout(function () {
                        $('.hr-design').addClass('hr-process-anim');

                    }, 2150);


                }, 100);

            }
       
        } else {
            // show element on it's initial position
           $('#design-icon').empty();
           designIsAnimated = false; 
           animated = false; // - ako je ovo duplikat skini
           $('.hr-design').removeClass('hr-process-anim');
        }
    });
}



$window.on('scroll resize', check_if_in_view_design);
$window.trigger('scroll');

/* EVALUATE SVG ANIMATION */

var $evaluateAnimation_element = $('#evaluate-icon')
var $window = $(window);
var evaluateIsAnimated = false;

function check_if_in_view_evaluate() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($evaluateAnimation_element, function() {
        var $evaluateAnimation = $(this);
        var evaluateAnimation_height = $evaluateAnimation.outerHeight();
        var evaluateAnimation_top_position = $evaluateAnimation.offset().top;
        var evaluateAnimation_bottom_position = (evaluateAnimation_top_position + evaluateAnimation_height);
 
        if ((evaluateAnimation_bottom_position > window_top_position) &&
            (evaluateAnimation_top_position < window_bottom_position)) {

            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
            
            if(evaluateIsAnimated == false) {
                evaluateIsAnimated = true;

                setTimeout(function () {
                         
                    
                    var animation7 = bodymovin.loadAnimation({
                        container: document.getElementById('evaluate-icon'),
                        renderer: 'svg',
                        loop: false,
                        autoplay: true,
                        path: './media/animation/ProcessPage_Evaluate.json'
                    });

                    setTimeout(function () {
                        $('.hr-evaluate').addClass('hr-process-anim');

                    }, 2750);


                }, 100);

            }
       
        } else {
            // show element on it's initial position
           $('#evaluate-icon').empty();
           evaluateIsAnimated = false; 
           animated = false; // - ako je ovo duplikat skini
           $('.hr-evaluate').removeClass('hr-process-anim');
        }
    });
}

$window.on('scroll resize', check_if_in_view_evaluate);
$window.trigger('scroll');



// HR LINE ANIMATION WHEN IN VIEW EXECUTE
// REGULAR HR
var $hr_animation_elements = $('.hr-regular');
var $window = $(window);

function check_if_in_view_hr() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
 
    $.each($hr_animation_elements, function() {
        var $hr_animation = $(this);
        var hr_animation_height = $hr_animation.outerHeight();
        var hr_animation_top_position = $hr_animation.offset().top;
        var hr_animation_bottom_position = (hr_animation_top_position + hr_animation_height);
 
        //check to see if this current container is within viewport
        if ((hr_animation_bottom_position > window_top_position) &&
            (hr_animation_top_position < window_bottom_position)) {
            
            // show element before animating 
            // ( contingency - to be sure it will be there when it is needed )
            // on it's initial position
            
            $hr_animation.removeClass('hr-animation');
            // do animation on page-tab
            $hr_animation.addClass('hr-animation');
        } else {
            // show element on it's initial position
            
            $hr_animation.removeClass('hr-animation');
            

        }
    });
}

$window.on('scroll resize', check_if_in_view_hr);
$window.trigger('scroll');


    $('document').ready(function(){
        $.scrollify.disable();
    });