export default class orderActions {
    constructor() {
        this.$orderPage = $('.order-page');

        if(this.$orderPage) {
            this.$modal = $('.modal-delivery__wrapper');

            this.eventListener();
            this.deliveryInfo();
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

	deliveryInfo() {
		let wrapper = $('.order__input-wrapper');
		let radios = wrapper.find('.custom-radio__input');
		let inputs = wrapper.find('.form-control');

		radios.on('change', (e) => {
			let _this = $(e.target);

			if (_this.is(':checked')) {
				inputs.prop('required', false).prop('disabled', true);
				_this.parent().next().find('input').prop('required', true).prop('disabled', false);

				$('#ordering').validator('validate');
			}
		});
	}
}
