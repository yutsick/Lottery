var Inputmask = require('inputmask');

const ExportLottery = () => {
    
    let im = null;
    let isValid = false;
    let $input = null;
    let $button = null;
    let $loader = null;

    const maskInput = () => {
        
        if($input.length > 0) {
            im = new Inputmask({
                placeholder: '•••• - •••• - ••••',
                rightAlign: false,
                mask: '9{4} - 9{4} - 9{4}',
                clearMaskOnLostFocus: false,
                autoUnmask: true,
                onincomplete: () => {
                    isValid = false;
                },
                oncomplete: () => {
                    isValid = true;
                    hideKeyboard();
                }
                
            });
            im.mask($input);
        }
    }

    const hideKeyboard = () => {
        const el = document.querySelector(':focus');
        if (el) {
            el.blur();
        }
    }

    const loading = (load) => {
        if ($loader && $loader.length > 0) {
            const loadingClassName = 'loader--spin';
            if (load) {
                $button.hide();
                $loader.addClass(loadingClassName);
            } else {
                $button.show();
                $loader.removeClass(loadingClassName);
            }
        }
    }

    const showError = () => {
        $input.popover('show');
    }

    const addContent = (data) => {
        let $result = $('.js-register-lottery-result');
        $result.prepend($.parseHTML(data.content));
        initItems();
        if (data.type != 'blankwithbonus') {
            let $firstItem = $result.children('.result__item:first-child');
            let $collapse = $firstItem.find('.js-result__content-collapse');
            if ($collapse.length > 0) {
                $collapse.collapse('show');
            }
        } else {
            let $items = $result.children('.result__item:lt(2)');
            if ($items.length > 0) {
                $items.each((index, item) => {
                    let $item = $(item);
                    let $collapse = $item.find('.js-result__content-collapse');
                    if ($collapse.length > 0) {
                        $collapse.collapse('show');
                    }
                });
            }
        }
    }

    const getMockUpUrl = () => {

        const endpoints = [
            'http://www.mocky.io/v2/5da06db63000000f00f89e80',
            'http://www.mocky.io/v2/5da06dea3000005300f89e83',
            'http://www.mocky.io/v2/5da06e393000003800f89e8c',
            'http://www.mocky.io/v2/5da4638335000056004a7686',
            'http://www.mocky.io/v2/5da4635835000054004a7683',
            'http://www.mocky.io/v2/5da06f2e3000006e00f89e99'
        ];

        return endpoints[Math.floor(Math.random()*endpoints.length)];
    }

    const updateBlankLottery = (quantity) => {
        let $el = $('.js-blank-number');
        if ($el.length > 0) {
            updatePromotionQuantity($el, quantity);
        }
    }

    const updateJackpotLottery = (quantity) => {
        let $el = $('.js-jackpot-number');
        if ($el.length > 0) {
            updatePromotionQuantity($el, quantity);
        }
    }

    const updatePromotionQuantity = ($el, quantity) => {
        let currentQuantity = $el.data('quantity');
        if (quantity) {
            currentQuantity = parseInt(currentQuantity) + quantity;
            $el.data('quantity', currentQuantity);
            $el.text(`${currentQuantity} st`);
        }
    }

    const form = () => {
        const $form = $('.js-register-lottery-form');
        const isTest = $form.data('env');
        
        $form.submit((e) => {
            e.preventDefault();
            let value = parseInt($input.val());
            if (!isNaN(value) && value.toString().length == 12) {
                $input.popover('hide');
                hideKeyboard();
                loading(true);
                hideResultItems();
                $.ajax({
                    url: isTest ? getMockUpUrl() : e.currentTarget.action,
                    method: e.currentTarget.method,
                    data: $(e.currentTarget).serialize(),
                    success: function(data){
                        setTimeout(() => {
                            loading(false);
                            $form[0].reset();
                            isValid = false;
                            switch(data.type) {
                                case 'blank':
                                case 'blankwithbonus':
                                    updateBlankLottery(1);
                                    break;
                                case 'regular':
                                case 'grand':
                                    window.ML.confetti.execute();
                                    break;
                            }
                            updateJackpotLottery(data.jackpot);
                            addContent(data);
                        }, 2000);
                    },
                    error: function(){
                        setTimeout(() => {
                            loading(false);
                            showError();
                        }, 2000);
                    }
                })
            } else {
                showError();
            }
        })
    }

    const popover = () => {
        if ($input && $input.length > 0) {
            $input.popover({
                content: 'Felaktigt lottnummer. Dubbelkolla att du har skrivit in rätt.',
                placement: 'top',
                trigger: 'manual',
            });
        }
    }

    const initItems = () => {
        $('[data-toggle="collapse"]').collapse();
        let $resultItems = $('.js-result__content-collapse');
        $resultItems.off('show.bs.collapse');
        $resultItems.off('hide.bs.collapse');

        $resultItems.on('show.bs.collapse', (e) => {
            let $content = $(e.currentTarget);
            $content.parent().addClass('result__item--opened');
        });

        $resultItems.on('hide.bs.collapse', (e) => {
            let $content = $(e.currentTarget);
            let $parent = $content.parent();
            $parent.removeClass('result__item--opened');
        });
    }

    const hideResultItems = () => {
        $('.js-result__content-collapse').collapse('hide');   
    }
    
    this.init = () => {
        $input = $('#lotterynumberinput');
        $loader = $('.loader');
        $button = $('.js-btn-success');
        maskInput();
        popover();
        form();
        initItems();
    }

    return this;
}

export default ExportLottery();