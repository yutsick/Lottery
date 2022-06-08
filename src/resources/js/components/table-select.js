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
  
}