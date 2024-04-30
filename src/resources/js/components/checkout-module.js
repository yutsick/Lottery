export default function () {

    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $('body').on('click', function(e){

      if ($('#Expressfrakt').is(':checked')){
        $(".payment").addClass('open')
      } else {
        $(".payment").removeClass('open')
      }

    })

    $('.tab_all .black_blue').click(function (e){
      
      e.preventDefault();
      
      let  numTab = $(this).data("num");
      
      $('.tab_all [class*="bat_"]').removeClass('open');
      
      $('.tab_all .bat_'+ numTab + '').addClass('open');
      
      
      
      if(numTab === 2){
        $('.number__top>span:nth-child('+ numTab + ')').addClass('active');
        $('.number__top>span:nth-child(1)').addClass('check');
        
        $('.bat_1>.top__>.edit').addClass('active');
        
      }else if(numTab === 3){
        $('.number__top>span:nth-child('+ numTab + ')').addClass('active');
        $('.number__top>span:nth-child(2)').addClass('check');
//        $('.tab_all>.bat_('+ numTab + ')>.top__>.edit').addClass('active');
        
        $('.bat_2>.top__>.edit').addClass('active');
        
      }else if(numTab === 4){
        
        $('.bat_1').addClass('none');
        $('.bat_2').addClass('none');
        $('.bat_3').addClass('none');
        
          $('.number__top>span:nth-child('+ numTab + ')').addClass('active');
        $('.number__top>span:nth-child(3)').addClass('check');
        
          $('.bat_3>.top__>.edit').addClass('active');
        
      }
        
//      
//      active check
//      
//      
//      number__top

    });
  
    $('.tab_all a.edit').click(function (e){
        e.preventDefault();
      
         let  numEdit = $(this).data("edit");
      
           $('.tab_all [class*="bat_"]').removeClass('open');
      
            $(this).parent().parent().addClass('open');
      
      if(numEdit === 1){
         $('.number__top>span').removeClass('check');
         $('.number__top>span').removeClass('active');
        $('.number__top>span:nth-child('+ numEdit + ')').addClass('active');

      }else if(numEdit === 2){
        $('.number__top>span').removeClass('check');
        $('.number__top>span').removeClass('active');
        
        $('.number__top>span:nth-child('+ numEdit + ')').addClass('active');
        $('.number__top>span:nth-child(1)').addClass('check');
        
      }else if(numEdit === 3){
        $('.number__top>span').removeClass('check');
        $('.number__top>span').removeClass('active');
        
        $('.number__top>span:nth-child('+ numEdit + ')').addClass('active');
        $('.number__top>span:nth-child(2)').addClass('check');
            $('.number__top>span:nth-child(1)').addClass('check');
      }
      
    });
  
    $('.checkout-module__ .bat_2 .box__>.list.mod>li>.input>input').click(function(){
//      e.preventDefault();
      $('.checkout-module__ .bat_2 .box__>.list.mod>li').removeClass('select__');
      $('.checkout-module__ .bat_2 .box__>.list.mod>li>.input>input').removeAttr('checked');
      $(this).attr('checked', 'checked');
      $(this).parent().parent().addClass('select__');



    });

    // Set margin-top for pricing in mobile screen
    function setPricingTop(){
      if(document.querySelectorAll('.checkout-module__ .dots') ){
      
        let items = document.querySelectorAll('.product__info-wrapper');
        items.forEach(item => {
          if(screen.width < 605){
            item.querySelectorAll('p')[0].style.marginTop = item.querySelectorAll('.dots')[0].offsetTop + 'px';
          } else {
            item.querySelectorAll('p')[0].style.marginTop = '0px';
          }
          
        });
      
      }
    };
   // setPricingTop();
   // window.addEventListener('resize', setPricingTop);
    function setMobileVision(){
      if(!$('.product__delivery').is(':visible') || $('.product__delivery').is(':hidden')){
        const $counter = $('.pris.antal');
        $counter.css('margin-left', `calc(100% - ${$counter.outerWidth()}px`);
      }

      if(screen.width < 605){

        if(!$('.product__delivery').is(':visible') || $('.product__delivery').is(':hidden')){
          $('.pris.antal').css('marginTop','10px');
        }


        //change availibility to Articul
        $('.dots').text('Art.Nr: 234560')
        // $('.product-title h3').text('Väldigt långt jobbigt varunamn som tar två rader');
        // $('.product__wrapper .info p').text('2 500 kr');
        $('.product-title h3').first().text('Väldigt långt jobbigt varunamn som tar två rader');
        $('.product__wrapper .info p').first().text('2 500 kr');
        $('.product-title h3').eq(1).text('Väldigt långt jobbigt varunamn');
        $('.product__wrapper .info p').eq(1).text('1 195 kr');

      } else {
        //change availibility to Articul
        // $('.dots').text('Finns i lager');
        // $('.product-title h3').text('Varunamn');
        // $('.product__wrapper .info p').text('1 045kr');
        
      }
    }
    setMobileVision();

    window.addEventListener('resize', () => {
      setMobileVision();
    });

    $('.bat_2 .list.shipping.mobile input').on('change', function(){
      //console.log(`el`, el)
      if($(this).is(':checked')){
        //console.log(`el`, el)
        $('.select__').removeClass('select__');
        $(this).parent().parent().addClass('select__');
      }
    })

}