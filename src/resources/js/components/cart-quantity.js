export default class changeQuantity {
    constructor() {
        this.cartAmounts = $('.cart__item-quantity');

        if(this.cartAmounts.length >= 1) {
            this.eventListener();
        }
    }

    eventListener() {
        let that = this;
        this.cartAmounts.on('click', function(e) {
            if($(e.target).hasClass('js-decrease-quantity')) {
                that.decreaseQuantity(this, e.target);
            }else if($(e.target).hasClass('js-increase-quantity')) {
                that.increaseQuantity(this);
            }
        });
    }

    increaseQuantity(block) {
        let $target = $(block);
        let valueInput = $target.find('.js-item-quantity')[0];
        let decreaseBtn = $target.find('.js-decrease-quantity')[0];

        if(valueInput) {
            let parsed = parseInt(valueInput.value);
            valueInput.value = parsed + 1;

            if(valueInput.value >= 1 && decreaseBtn.hasAttribute('disabled')) {
                $(decreaseBtn).removeAttr('disabled');
            }
        }
    }

    decreaseQuantity(block, btn) {
        let $target = $(block);
        let valueInput = $target.find('.js-item-quantity')[0];
        let parsed = parseInt(valueInput.value);

        if(valueInput && parsed > 0) {
            valueInput.value = parsed - 1;

            if(valueInput.value == 0) {
                $(btn).attr('disabled', true);
            }
        }
    }
}