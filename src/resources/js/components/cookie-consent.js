export default function () {

	$('.modal-cookie-consent a.arrow').click( function() {

     $(this).parents('li').toggleClass('open');
      
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
  
  
}