$(document).ready(function() {
 
    var arrAnimationIn = ['fadeIn', 'fadeInLeft', 'fadeInRight'];
 
    $(window).scroll(function() {
        /* Check the location of each desired element */
        $('.animated').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ) {
                if ($(this)[0].classList.value.indexOf('fadeIn') < 0) {
                    var item = arrAnimationIn[Math.floor(Math.random()*arrAnimationIn.length)];
                    $(this).addClass(item);
                }
            }
            
        }); 
    })
})