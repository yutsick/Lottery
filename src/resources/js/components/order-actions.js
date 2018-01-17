export default class orderActions {
    constructor() {
        this.$orderPage = $('.order-page');

        if(this.$orderPage) {
            this.$modal = $('.modal-delivery__wrapper');

            this.eventListener();
        }
    }

    eventListener() {
        let _this = this;
        let $sendGift = $('.delivery__gift');
        let $sendGiftRadio = $sendGift.find('.custom-checkbox__input');
        let $giftFields = $sendGift.find('input');

        //toggle gift form and set as required
        $sendGiftRadio.on('change', (e) => {
            if($sendGiftRadio[0].checked) {
                $sendGift.addClass('delivery__gift--active');
                $giftFields.each(function (index, field) {
                    $(field).prop('required', true);
                });
            }else {
                $sendGift.removeClass('delivery__gift--active');
                $giftFields.each(function (index, field) {
                    $(field).removeAttr('required');
                });
            }
        });

        //change delivery place
        let $allPlaces = this.$modal.find('.btn');

        $allPlaces.on('click', function () {
            _this.changeDeliveryPlace(this);
        });

        //submit
        $( "#ordering" ).on( "submit", function( event ) {
            event.preventDefault();
            console.log($(this).serializeArray());
            let url = $(this)[0].action;
            location.href = url;
        });
    }

    changeDeliveryPlace(place) {
        let placeName = $('.delivery__place');
        let placeInput = $('#delivery-place');

        if(placeInput[0].value !== place.value) {
            placeInput[0].value = place.value;
            placeName.html(place.value);

            //set as active in modal
            let $current = this.$modal.find('.modal-delivery__place--active');
            $current.removeClass('modal-delivery__place--active');
            $(place).parent().addClass('modal-delivery__place--active');
        }

    }
}