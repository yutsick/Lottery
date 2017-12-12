export default function() {
    $('.js-add-to-dreamlist').on('click', function () {
        let $target = $('.dreamlist');
        let $number = $target.next('.product-cart__notification');
        let $elem = $(this).find('.dreamlist-icon');
        let $sum = $number.text();

        if ($(this).hasClass('starred')) {
            $(this).removeClass('starred');

            // Remove one
            $sum--;
            $number.text($sum);
        } else {
            $(this).addClass('starred');

            if ($elem) {
                $elem.clone()
                    .css({
                        'position': 'absolute',
                        'top': $elem.offset().top,
                        'left': $elem.offset().left,
                        'z-index': '1300'
                    })
                    .appendTo('.content-wrapper.ml-2017')
                    .addClass('spinAndScale')
                    .animate({
                            'top': $target.offset().top - 5,
                            'left': $target.offset().left - 5
                        }, 1000, function () {
                            // Animate
                            $number.addClass('pulsate');

                            // Add one
                            $sum++;
                            $number.text($sum);

                            // Remove cloned element
                            $(this).detach();
                        }
                    );

                // Remove animation class
                setTimeout(function () {
                    $number.removeClass('pulsate');
                }, 2000);
            }
        }
    });
}