export default class orderActions {
    constructor() {
        this.$orderPage = $('.order');

        if(this.$orderPage) {
            this.eventListener();
        }
    }

    eventListener() {
        let $sendGift = $('.delivery__gift');
        let $sendGiftRadio = $sendGift.find('.custom-checkbox__input');

        //toggle gift form
        $sendGiftRadio.on('change', (e) => {
            $sendGift.toggleClass('delivery__gift--active');
        });
    }

}