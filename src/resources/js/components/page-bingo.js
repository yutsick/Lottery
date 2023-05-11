export default function(){

const breakPoins = {
  "tablet": 1200,
  "mobile": 600
}
  
const cutEl = $('.page-bingo .top-section .text-cut:not(.top-section-text) ');
     const cutText = $(cutEl).text();

  function pageBingo(){
     
    if($(window).width() <= breakPoins.tablet){
      if (cutText.length > 140){
        $(cutEl).text(cutText.substring(0,140) + '...');
        $('.text-show').show();
      }

      $('.text-show').on('click', function(){
        $(cutEl).text(cutText);
        $(this).hide();
      })
    } else{
      $(cutEl).text(cutText);
    }
  }

  function cutSomeText(){
    shortText('.room__items-item-text', 300);
    shortText('.chattschema__item-text', 160);
  }

  function shortText(selector, size = 100){
    const short = $(selector);

    $(short).each(function(el) {
      const shortText = $(this).text();
      if (shortText.length > size){
          $(this).text(shortText.substring(0,size) + '...')
      }
    })

   
    // for (let i = 0; i < short.length; i++){
    //  // console.log($(short[i]).text());
    //    if($(short[i]).text.length > 300){
    //     $(short[i]).text($(short[i]).text.substring(0,300) + '...');
    //   }
    // }
  }

  function hidePanel(){
    $('.schema-tabs__panels-container').hide();
    $('.expanded-menu').addClass('closed');
    $('.js-schema-tabs__btn').removeClass('active');
    //$('.mobile-bg').show();
  }

  function showHidePanel(){
    
    if($('.tabs .desctop__active.active').length != 0){
      $('.schema-tabs__panels-container').show();
      $('.expanded-menu').removeClass('closed');
      $('.mobile__menu').addClass('active');
      //$('.mobile-bg').hide();
      if($('.desctop__active.active').find('.rooms').length){
        $('.mobile__menu').css('filter', 'none');
        $('.schema-tabs__panels-container').css('top','186px');
        $('.mobile__menu').attr('data-filter', false);
      } else {
        $('.mobile__menu').css('filter', 'drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.1))');
        $('.schema-tabs__panels-container').css('top','130px');
      }
      //console.log($('.desctop__active.active').children($('.rooms')))
      $('.mobile__menu-title').text($('.tabs .desctop__active.active').text())
    } else{
      hidePanel();
    }
  }

  $('.expanded-menu .tabs').on('click', function(){
    $('.mobile-bg').addClass('mobile__tabs');
    showHidePanel();
  });

  $('.mobile__close').on('click', function(){
    $('.mobile__tabs').removeClass('active');
    $('.mobile-bg').removeClass('mobile__tabs');
    hidePanel();
    $('.mobile__menu').removeClass('active');
  });  
  
  $('.mobile__toggler, .js-schema-tabs__btn').on('click', function(){


    if($('.mobile__menu').css('filter') == 'drop-shadow(rgba(0, 0, 0, 0.1) 0px 8px 24px)'){

      if($('.mobile__tabs').hasClass('active')){
        $('.mobile__tabs').toggleClass('active');
        $('.mobile__menu').css('filter','drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.1)');
      } else {
        $('.mobile__menu').css('filter','none');
        $('.mobile__tabs').toggleClass('active');
      }

    } else {
      $('.mobile__tabs').toggleClass('active');
    }
    

  })

  pageBingo();
  $(window).on('resize',pageBingo);
/**
 * Test mobile
 */
  

  const bg = {
    'white': '#FFFFFF',
    "primary-blue": "#003E52",
    "primary-blue-75": '#366474',
    "primary-blue-50": "#6b8b96",
    "primary-blue-20": '#abbabe',
    "figma": '#506D7C'
  }
  function getWindowTextSize(){
    let listItem = $('.top-section .list-item');
    
    for (let i=0; i<listItem.length; i++){
      if ($(listItem[i]).find('.spelare').hasClass('column-hide')){
        $(listItem[i]).find('.text-regular').css('font-weight','700');
        $(listItem[i]).find('.text-regular').css('margin-left','0');
        $('.top-section .list-title .ml-0').css('margin-left','0');
      }
    }
    
    //  set top text section background  //
    let textFont = $(".top-mobile-text-section [data-set-font]");
     let selector = $('.top-mobile-text-section');
    const bgMob = $('.top-mobile-text-section').data('bg-mob');
    const bgTab = $('.top-mobile-text-section').data('bg-tab');
    const imgMob = $('.top-mobile-text-section').data('img-mob');
    const imgTab = $('.top-mobile-text-section').data('img-tab');

    const windowSize = $(window).width();

    function resetClass(className){
     for (let i=0; i<textFont.length; i++) {
        $(textFont[i]).removeClass(function (index, css) {
          return (css.match (/(^|\s)family\S+/g) || []).join(' ');
       });
       $(textFont[i]).addClass($(textFont[i]).data(className));
      };
    }

    if (windowSize <= breakPoins.mobile){
      resetClass('font-mob');
      
      if(bg[bgMob]){
        $('.top-mobile-text-section').css('background',bg[bgMob]);
      }
      if(imgMob){
        $('.top-mobile-text-section').css('background',`url(${imgMob}) no-repeat`);
      }
      
      } else if (windowSize > breakPoins.mobile && windowSize <= breakPoins.tablet){
        resetClass('font-tab');

        if (bg[bgTab]){
          $('.top-mobile-text-section').css('background',bg[bgTab]);
        }
        if(imgTab){
          $('.top-mobile-text-section').css('background',`url(${imgTab}) no-repeat`);
        }
       
      } else {
        return;
    }

    //  set top table section background //


  } 

  function getWindowTableSize(){
    //  set top table section background  //
   
    const bgMob = $('.top-mobile-table-section').data('bg-mob');
    const bgTab = $('.top-mobile-table-section').data('bg-tab');
    const imgMob = $('.top-mobile-table-section').data('img-mob');
    const imgTab = $('.top-mobile-table-section').data('img-tab');

    const windowSize = $(window).width();

    

    if (windowSize <= breakPoins.mobile){
      
      if(bg[bgMob]){
        $('.top-mobile-table-section').css('background',bg[bgMob]);
      }
      if(imgMob){
        $('.top-mobile-table-section').css('background',`url(${imgMob}) no-repeat`);
      }
      
      } else if (windowSize > breakPoins.mobile && windowSize <= breakPoins.tablet){

        if (bg[bgTab]){
          $('.top-mobile-table-section').css('background',bg[bgTab]);
        }
        if(imgTab){
          $('.top-mobile-table-section').css('background',`url(${imgTab}) no-repeat`);
        }
       
      } else {
        return;
    }

    //  set top table section background //


  } 
 
  function bingoRoomSection(){

    const bgMob = $('.bingo-room').data('bg-mob');
    const bgTab = $('.bingo-room').data('bg-tab');
    const bgDesk = $('.bingo-room').data('bg-desk');
    const imgMob = $('.bingo-room').data('img-mob');
    const imgTab = $('.bingo-room').data('img-tab');
    const imgDesk = $('.bingo-room').data('img-desk');

    const windowSize = $(window).width();

    

    if (windowSize <= breakPoins.mobile){
      
      if(bg[bgMob]){
        $('.bingo-room').css('background',bg[bgMob]);
      }
      if(imgMob){
        $('.bingo-room').css('background',`url(${imgMob}) no-repeat`);
      }
      
      } else if (windowSize > breakPoins.mobile && windowSize <= breakPoins.tablet){

        if (bg[bgTab]){
          $('.bingo-room').css('background',bg[bgTab]);
        }
        if(imgTab){
          $('.bingo-room').css('background',`url(${imgTab}) no-repeat`);
        }
       
      } else {
        if (bg[bgDesk]){
          $('.bingo-room').css('background',bg[bgDesk]);
        }
        if(imgDesk){
          $('.bingo-room').css('background',`url(${imgDesk}) no-repeat`);
        }
        
    }

    //  set top table section background //


  } 

  function bingoRoomItem(){

    const windowSize = $(window).width();
    let bingoRoomItem = $('.bingo-room__item');
    
    for (let i=0; i < bingoRoomItem.length; i++){

      const imgMob = $(bingoRoomItem[i]).data('img-mob');
      const imgTab = $(bingoRoomItem[i]).data('img-tab');
      const imgDesk = $(bingoRoomItem[i]).data('img-desk');

      if (windowSize <= breakPoins.mobile){
        if(imgMob){
          $(bingoRoomItem[i]).css('background',`url(${imgMob}) no-repeat`);
        }

      } else if (windowSize > breakPoins.mobile && windowSize <= breakPoins.tablet) {

          if(imgTab){
            $(bingoRoomItem[i]).css('background',`url(${imgTab}) no-repeat`);
          }

        } else {

        if(imgDesk){
          $(bingoRoomItem[i]).css('background',`url(${imgDesk}) no-repeat`);
        } 
      }
    }
 
  } 

  function bingoMenuSection(){
    const windowSize = $(window).width();
    let textFont = $(".expanded-menu [data-set-font]");

    function resetClass(className){
      for (let i=0; i<textFont.length; i++) {
         $(textFont[i]).removeClass(function (index, css) {
           return (css.match (/(^|\s)family\S+/g) || []).join(' ');
        });
        $(textFont[i]).addClass($(textFont[i]).data(className));
       };
     }

     if (windowSize <= breakPoins.mobile){
      resetClass('font-mob');
      
      } else if (windowSize > breakPoins.mobile && windowSize <= breakPoins.tablet){
        resetClass('font-tab');

      } else {
        resetClass('font-desk');
      }

    }


  $(window).on('resize',function(){
    getWindowTextSize();
    getWindowTableSize();
    bingoRoomSection();
    bingoRoomItem();
    bingoMenuSection();
  });
  getWindowTextSize();
  getWindowTableSize();
  bingoRoomSection();
  bingoRoomItem();
  bingoMenuSection();
  cutSomeText();

}
