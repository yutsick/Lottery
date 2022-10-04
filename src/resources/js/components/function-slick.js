export default function() {

  $('#productCategorySlider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    arrow: true,
    variableWidth: true,
    	slidesToShow: 10,
	slidesToScroll: 1,
  });
  
  
  $('#productCategorySlider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    
  		if ( currentSlide == 0) {
          
	 		$('.ion-chevron-left').removeClass('addedClass');
	 		$('#productCategorySlider').removeClass('back_');
          
          
          
  		}else {

            $('.ion-chevron-left').addClass('addedClass');
            $('#productCategorySlider').addClass('back_');
          
  		};
    
  });
  
}