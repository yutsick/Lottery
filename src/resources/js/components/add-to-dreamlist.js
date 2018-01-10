export default function() {

    $('.product-list-blocks').on('click', function (event) {
        if( $(event.target).hasClass('js-add-to-dreamlist') || $(event.target).parent().hasClass('js-add-to-dreamlist')) {
            let $iconWrapper = '';
            let $icon = '';

            if($(event.target).hasClass('js-add-to-dreamlist')) {
                $iconWrapper = $(event.target);
                $icon = $(event.target).find('.dreamlist-icon');
            } else {
                $iconWrapper = $(event.target).parent();
                $icon = $(event.target);
            }

            changeDreamlist($iconWrapper, $icon);
        }
    });

    $('.product-dreamlist__progress').on('click', function () {
        let $button = $(this);
        let $icon = $(this).find('.dreamlist-icon');
        if($button && $icon) {
            changeDreamlist($button, $icon);
        }
    });

    function changeDreamlist($button, $icon) {
        let $target = $('.dreamlist');
        let $number = $target.next('.product-cart__notification');
        let $sum = $number.text();

        if ($($button).hasClass('starred')) {
            $($button).removeClass('starred')
                .attr('data-original-title', 'Lägg till i min drömlista');

            // Remove one
            $sum--;
            $number.text($sum);
        } else {
            $($button).addClass('starred')
                .attr('data-original-title', 'Ta bort från min drömlista');

            if ($icon) {
                $icon.clone()
                    .css({
                        'position': 'absolute',
                        'top': $icon.offset().top,
                        'left': $icon.offset().left,
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
    }
}