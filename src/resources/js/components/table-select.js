export default function () {
	// $('.table-select').select2({
	// 	minimumResultsForSearch: Infinity,
	// 	templateSelection: format,
	// 	templateResult: format,
	// 	dropdownParent: $('.responsive-table-filter')
	// });

	// function format(o) {
	// 	if (!o.id) {
	// 		return o.text;
	// 	} else {
	// 		return o.text;
	// 	}
	// }

	// Show selected table
	$('.table-select') .on('select2:select', function (evt) {
		var choice = evt.params.data.id;

		if (choice) {
			$('#' + choice).addClass('table-pane--active').siblings('.table-pane').removeClass('table-pane--active');
		}
	});
  
    $('.menu_bingoguide-tabs>li>a').click( function(){
       var activeAdd = $(this).data('tabs') ; 
       $('.menu_bingoguide-tabs>li>a').removeClass('active');                                                              
       $(this).addClass('active');
      
       $(this).parent().parent().parent().parent().find('.content_bingoguide-tabs>div').removeClass('active');
//       $(this).parent().parent().removeClass('active');
       $(this).parent().parent().parent().parent().find('.content_bingoguide-tabs>div:nth-child(' + activeAdd + ')').addClass('active');              
	});
  
    $('.tabs__button').click( function(){                              
       $(this).parent().toggleClass('active');       
	});
  

     $('.bingoroom-tabs>a.tab').click( function(e){
       
       e.preventDefault();
       
       $(this).parent().find('a').removeClass('active');
       $(this).addClass('active');
       
       $(this).parent().parent().find("[class*='tab_']").removeClass('desctop__active');
  
       var href = $(this).attr('href');
       
       $(href).addClass('desctop__active');
      
   }); 
         
       $('a.schemas-modal-tabs__new').click( function(e){
         e.preventDefault();
//            var activeAdd = $(this).data('tab');
//           console.log(activeAdd);
         
          $('#panel__bingoschema .schemas-modal-tabs__container .schemas-modal-tabs__new').removeClass('desctop__active active');
          $('#panel__chatschema .schemas-modal-tabs__container .schemas-modal-tabs__new').removeClass('desctop__active active');
//         $().data('tab');
         
         $(this).addClass('desctop__active active');
         
         
    $('#panel__bingoschema .bingoroom-tabs__ ').removeClass('desctop__active active');
    $('#panel__chatschema .bingoroom-tabs__ ').removeClass('desctop__active active');
         
         $($(this).data('tab')).addClass('desctop__active active');
         
         
      }); 
  
  
  
       $('.btn.btn-wide--blue').click( function(e){
         e.preventDefault();
//            var activeAdd = $(this).data('target');
//           console.log(activeAdd);
         
         $('body').addClass('modal-open');
         
         
         

    $('#panel__bingoschema [class*=tab_]').removeClass('desctop__active active');
    $('#panel__chatschema [class*=tab_]').removeClass('desctop__active active');
//         
//         
         $($(this).data('target')).addClass('desctop__active active');
      }); 
  
  
  
  

  
}