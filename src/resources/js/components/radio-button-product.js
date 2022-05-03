
export default function (){
    //radio toggle (for bingolobby)
    $('#color-1').click(function () {
        $.ajax({
            url: 'ajax/radio-button-product-page-color-1.html',
            success: function (data) {

                $('.product-slider__small-box').html(data);

                $('.product-slider__small-box').flickity({
                    contain: true,
                    pageDots: false,
                    groupCells: true,
                });

                var imageUrl = $('.small-preview').data('back');
//                console.log(imageUrl);
                $('.product-slider__item').css("background-image", "url(" + imageUrl + ")");

            }
        });
    });
    $('#color-2').click(function () {
        $.ajax({
            url: 'ajax/radio-button-product-page-color-2.html',
            success: function (data) {

                $('.product-slider__small-box').html(data);

                $('.product-slider__small-box').flickity({
                    contain: true,
                    pageDots: false,
                    groupCells: true,
                });
                
                var imageUrl = $('.small-preview').data('back');
//                console.log(imageUrl);
                $('.product-slider__item').css("background-image", "url(" + imageUrl + ")");
                

            }
        });
    });
    $('#color-3').click(function () {
        $.ajax({
            url: 'ajax/radio-button-product-page-color-3.html',
            success: function (data) {

                $('.product-slider__small-box').html(data);

                $('.product-slider__small-box').flickity({
                    contain: true,
                    pageDots: false,
                    groupCells: true,
                });
                
                
                var imageUrl = $('.small-preview').data('back');
//                console.log(imageUrl);
                $('.product-slider__item').css("background-image", "url(" + imageUrl + ")");

            }
        });
    });
    $('#color-4').click(function () {
        $.ajax({
            url: 'ajax/radio-button-product-page-color-4.html',
            success: function (data) {

                $('.product-slider__small-box').html(data);

                $('.product-slider__small-box').flickity({
                    contain: true,
                    pageDots: false,
                    groupCells: true,
                });
                
                
                var imageUrl = $('.small-preview').data('back');
//                console.log(imageUrl);
                $('.product-slider__item').css("background-image", "url(" + imageUrl + ")");

            }
        });
    });
    $('#color-5').click(function () {
        $.ajax({
            url: 'ajax/radio-button-product-page-color-5.html',
            success: function (data) {

                $('.product-slider__small-box').html(data);

                $('.product-slider__small-box').flickity({
                    contain: true,
                    pageDots: false,
                    groupCells: true,
                });
                
                
                var imageUrl = $('.small-preview').data('back');
//                console.log(imageUrl);
                $('.product-slider__item').css("background-image", "url(" + imageUrl + ")");
            }
        });
    });
}