export default function(){
  // function pageBingo(){
  //   $('.page-bingo .top-section .spelnamn').each(function(){
  //     if ($(this).text().length > 10){
  //       $(this).text($(this).text().substring(0,10) + '...');
  //     }
  //   })
  
  // }

  function hidePanel(){
    if($('.tabs .desctop__active.active').length != 0){
      $('.schema-tabs__panels-container').show();
      $('.expanded-menu').removeClass('closed');
    } else{
      $('.schema-tabs__panels-container').hide();
      $('.expanded-menu').addClass('closed');
    }
  }

  $('.expanded-menu').on('click', hidePanel);
    
  //pageBingo();

  }
  
