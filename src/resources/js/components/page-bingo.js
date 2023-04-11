export default function(){
const cutEl = $('.page-bingo .top-section .text-cut');
     const cutText = $(cutEl).text();

  function pageBingo(){
     
    if($(window).width() <= 840){
      if (cutText.length > 140){
        $(cutEl).text(cutText.substring(0,140) + '...');
      }

      $('.text-show').on('click', function(){
        $(cutEl).text(cutText);
        $(this).hide();
      })
    } else{
      $(cutEl).text(cutText);
    }
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

  // $('.mobile__tabs .js-schema-tabs__btn').on('click', function(){
  //   console.log ('fff')
  //   //$('.mobile__tabs').toggleClass('active');
  // })

  pageBingo();
  $(window).on('resize',pageBingo);

  }
  
