export default function() {
    $(window).scroll(function(){
        if ($(this).scrollTop() > 20) {
            $('.scrollable').addClass('is-scrolling');
        } else {
            $('.scrollable').removeClass('is-scrolling');
        }
    });
}

