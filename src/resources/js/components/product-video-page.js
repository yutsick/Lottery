export default function() {

//.play__video 
  
  
      //radio toggle (for bingolobby)
    function playVideo(radio) {
        $(radio).on('click', function (e) {
          
           let inp = $(this);
           let video = $(this).data('video');
          
          
          
          
           $('.product-slider__item.product-slider__item--large').hide();
           $('.video__inframe').show();
           $('.video__inframe>iframe').attr('src', video);

          
        });
    }


    playVideo('a.play__video');  
  
      //radio toggle (for bingolobby)
    function small(smallClick) {
        $(smallClick).on('click', function (e) {
          
           let inp = $(this);
          
          
           $('.product-slider__item.product-slider__item--large').show();
           $('.video__inframe').hide();
          $('.video__inframe>iframe').attr('src', '');
        });
    }


    small('.product-slider__item--small>img');
}