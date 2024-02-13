export default function balanceBarJS() {
  let currWidth = $(window).width();

  $(window).on('resize',function(){
    let newWidth = $(window).width();
    if (currWidth != newWidth){
      currWidth = $(window).width();
      location.reload();
    }
    
  });
  const mobile = 426;
  const slideWidthMobile = $(document).width() * 0.27;
  //console.log(slideWidthMobile)

  const slideWidth = ($('.buttons-item').length == 3 ) 
        ? ($('.buttons-slide').width() - $('.toggle.buttons-item').width()) 
        : ($('.buttons-slide').width() - $('.toggle.buttons-item').width() - 16);

  const contoWidth = $('.balance-bar__holder--conto').width() + 45;



  $('.balance-bar__holder--conto').css('margin-right',`-${contoWidth}px`);

  $('.balance-bar .toggle.buttons-item').on('click', () => {
    console.log($(window).width())
    $('.balance-bar__holder--conto, .balance-bar__holder--buttons').toggleClass('active');

    if($('.balance-bar__holder--conto').hasClass('active')){
      $('.balance-bar__holder--conto').css('margin-right',`0`)
    } else {
      $('.balance-bar__holder--conto').css('margin-right',`-${contoWidth}px`)
    }

    if($('.balance-bar__holder--buttons').hasClass('active')){
      if($(window).width() <= mobile){
        $('.balance-bar__holder--conto').width($(document).width() - slideWidthMobile);
        $('.balance-bar__holder--buttons').css({"-webkit-transform":`translateX(${slideWidth-16}px)`})
       // $('.balance-bar__holder--buttons').css({"-webkit-transform":`translateX(calc(100% - ${slideWidthMobile}px)`})
      } else {
        $('.balance-bar__holder--buttons').css('margin-right',`-${slideWidth-16}px`);
        //$('.balance-bar__holder--buttons').css({"-webkit-transform":`translateX(${slideWidth-16}px)`})
      }
      
    } else {
      $('.balance-bar__holder--buttons').css('margin-right',`0`);
      $('.balance-bar__holder--buttons').css({"-webkit-transform":"translateX(0px)"})
    }

  });
}