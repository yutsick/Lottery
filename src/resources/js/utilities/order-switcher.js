export default function () {

	function orderSwitch(dataBtn, orderBy) {

        if(orderBy === 'desktop') {
            $(dataBtn).sort(byOrderD).prependTo($(dataBtn).parent());
        } else if (orderBy === 'tablet') {
            $(dataBtn).sort(byOrderT).prependTo($(dataBtn).parent());
        } else if (orderBy === 'mobile') {
            $(dataBtn).sort(byOrderM).prependTo($(dataBtn).parent());
        }

        function byOrderD(a, b) {
            return $(a).attr('data-orderD').localeCompare($(b).attr('data-orderD'));
        };

        function byOrderT(a, b) {
            return $(a).attr('data-orderT').localeCompare($(b).attr('data-orderT'));
        };

        function byOrderM(a, b) {
            return $(a).attr('data-orderM').localeCompare($(b).attr('data-orderM'));
        };

    };



    //Reorder for schema-tabs section module
    orderSwitch('.js-schema-tabs-reorder', 'desktop');

    if($(window).width() <= 992 && $(window).width() >= 742) {
        orderSwitch('.js-schema-panels-reorder', 'tablet');
    }
    

    if($(window).width() <= 742) {
        orderSwitch('.js-schema-panels-reorder', 'mobile');
    }


    $(window).on('resize', function() {
        if ($(window).width() <= 992 && $(window).width() >= 742) {
            orderSwitch('.js-schema-panels-reorder', 'tablet');
        };

        if($(window).width() <= 742) {
            orderSwitch('.js-schema-panels-reorder', 'mobile');
        }
    });


}
