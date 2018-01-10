export default class {
    constructor() {
        this.$orderPage = $('.order');


        if(this.$orderPage) {
            this.eventListener();
            let $cartItems = this.$orderPage.find('.cart__item');
            this.products = this.getProductsInOrder($cartItems);
        }
    }

    eventListener() {

        let $sendGift = $('.delivery__gift');
        let $sendGiftRadio = $sendGift.find('.custom-checkbox__input');

        $sendGiftRadio.on('change', (e) => {
            $sendGift.toggleClass('delivery__gift--active');
        });
    }

    getProductsInOrder($cartItems) {
        let products = [];
        $.each($cartItems, function(index, value) {
            let cart = {
                price: value.getAttribute('data-price'),
                amount: value.getAttribute('data-amount'),
                productId: value.getAttribute('data-productId')
            }
            products.push(cart);
        });

        return products;
    }
}