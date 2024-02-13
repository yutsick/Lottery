export default function () {

	$('.modal-cookie-consent a.arrow').click( function() {
      let collapse = $('ul.list li span.content');

      for(let i = 0; i< collapse.length;i++){
         if ($(collapse[i]).find('h5').length == 0) {
            $(collapse[i]).find('a.arrow').hide();
         }
      }
      
     $(this).parents('li').toggleClass('open');
      
//      $('.modal-cookie-consent .list li').removeClass('open');

//      if($(this).hasClass( "see" )){
//       $(this).parents('li').removeClass('open');
//        
//         $(this).removeClass('see');
//          $('.modal-cookie-consent .list li').removeClass('no-see');
//      }else{
//        $(this).parents('li').addClass('open');
//        
//         $(this).addClass('see');
//        $('.modal-cookie-consent .list li').addClass('no-see');
//        
//          $(this).parents('li').removeClass('no-see');
//      }
      
	});
  
	$('.modal-cookie-consent .green_bt').click( function() {
//      console.log('1');
        $('[type="checkbox"]').attr( 'checked','checked' );
	});
  
  $('.modal-cookie-consent [type="checkbox"]').click( function() {
    
     let $listSort = $(this);
    if ($listSort.attr('checked')) {
       $(this).removeAttr( 'checked','checked' );
    } else {
       $(this).attr( 'checked','checked' );
    }



  	});
  $(".bg_cookie .modal__conteiner .list li .content p").css("-webkit-box-orient", "vertical");
  

  
  
}
