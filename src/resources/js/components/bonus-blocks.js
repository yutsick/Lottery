
const BonusBlocks = () => {
    
    let im = null;
    let isValid = false;
    let $input = null;
    let $blockOneColInput = null;
    let $blockTwoColInput = null;
    let $modalInput = null;
    let $button = null;
    let $loader = null;
    let $modalButton1 = null;
    let $modalButton2 = null;

    

    const hideKeyboard = () => {
        const el = document.querySelector(':focus');
        if (el) {
            el.blur();
        }
    }

    const loading = (load,button=false) => {
        if ($loader && $loader.length > 0) {
            const loadingClassName = 'loader--spin';
            if (load && !button) {
                $button.hide();
                $loader.addClass(loadingClassName);
            } else if(load && button){
                $loader.addClass(loadingClassName);
            }else {
                $button.show();
                $loader.removeClass(loadingClassName);
            }
        }
    }

    const showError = () => {
        $input.popover('show');
    }


    const changeButton = (data, e) => {
        let buttonText = $(e.target).find('button').text();
        let formInput = $(e.target).find('input');
        let button = $(e.target).find('button');
        $(button).text(data);
        $(button).addClass('btn-success-green');
        $(formInput).on('input', () => {
            $(button).text(buttonText);
            $(button).removeClass('btn-success-green');
        })
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
        //return 'http://www.mocky.io/v2/5da06f2e3000006e00f89e99';  //returns false
        return 'http://www.mocky.io/v2/5da06db63000000f00f89e80'; //returns true
        //return endpoints[Math.floor(Math.random()*endpoints.length)]; //for production only
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
    
    const setStorage = () => {
        $('.btn').on('click', function(e){
            if($(e.target).data('columns')){
                sessionStorage.setItem('showModalColumns', $(e.target).data('columns'));
            }
            
        })
    }

    const form = () => {
        const $form = $('.js-bonus-block');
        //const isTest = $form.data('env');
        console.log($form);
        const isTest = true;
        $form.submit((e) => {
            e.preventDefault();

            $input = $(e.target).find('input');
            let button = $(e.target).find('button');
            let formType = $(e.target).data('form-type');
            let value = $input.val();
            if (value.length != 0) {
                $input.popover('hide');
                hideKeyboard();
                ($input.data('button')) ? loading(true,true) : loading(true,false);

                hideResultItems();
                $.ajax({
                    url: isTest ? getMockUpUrl() : e.currentTarget.action,
                    method: e.currentTarget.method,
                    data: $(e.currentTarget).serialize(),
                    success: function(data){
                        setTimeout(() => {
                            loading(false);
                            if($('.modal.in')){
                                $('.modal').removeClass('in');
                                $('body').removeClass('modal-open');
                                $('.modal-backdrop.fade.in').remove();
                                $('.modal').hide();
                            }
                            if (sessionStorage.getItem('showModalColumns')){
                                switch (sessionStorage.getItem('showModalColumns')){
                                    case '1':
                                        $('#bonusBlockOneColumns').hide();
                                        $('#bonusBlockOneColumnsSuccess').css('display', 'flex');
                                        sessionStorage.removeItem('showModalColumns')
                                }
                            }
                            e.target.reset();
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
                            if(formType == 'register'){
                                updateJackpotLottery(data.jackpot);
                                addContent(data);
                                changeButton($(button).data('text-success'), e);
                            }
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

        if ($blockOneColInput && $blockOneColInput.length > 0) {
            $blockOneColInput.popover({
                content: 'Felaktigt lottnummer. Dubbelkolla att du har skrivit in rätt.',
                placement: 'top',
                trigger: 'manual',
            });
        }       
        
        if ($blockTwoColInput && $blockTwoColInput.length > 0) {
            $blockTwoColInput.popover({
                content: 'Felaktigt lottnummer. Dubbelkolla att du har skrivit in rätt.',
                placement: 'top',
                trigger: 'manual',
            });
        }
        
        if ($modalInput && $modalInput.length > 0) {
            $modalInput.popover({
                content: 'Felaktigt lottnummer. Dubbelkolla att du har skrivit in rätt.',
                placement: 'top',
                trigger: 'manual',
            });
        }

        if ($modalButton1 && $modalButton1.length > 0) {
            console.log($modalButton1)
            $modalButton1.popover({
                content: 'Felaktigt lottnummer. Dubbelkolla att du har skrivit in rätt.',
                placement: 'top',
                trigger: 'manual',
            });
        }

        if ($modalButton2 && $modalButton2.length > 0) {
            $modalButton2.popover({
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
        $input = $('#bonusactivationinput');
        $blockOneColInput = $('#block-1col-input');
        $blockTwoColInput = $('#block-2col-input');
        $modalInput = $('#bonusnumberinput2');
        $loader = $('.loader');
        $button = $('.btn');
        $modalButton1 = $('#popover1');
        $modalButton2 = $('#popover2');
        
        popover();
        form();
        initItems();
        setStorage();
    }

    return this;
}

export default BonusBlocks();