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
       $('content_bingoguide-tabs>div').removeClass('active');                                   
       $(this).addClass('active');
      
       $('.content_bingoguide-tabs>div').removeClass('active');
       $('.content_bingoguide-tabs>div:nth-child(' + activeAdd + ')').addClass('active');              
	});
  
    $('.tabs__button').click( function(){
//        var activeAdd = $(this).data('tabs') ; 
      
//       $(this).parent().removeClass('active');                                   
                             
       $(this).parent().toggleClass('active');
      
//       $('.content_bingoguide-tabs>div').removeClass('active');
//       $('.content_bingoguide-tabs>div:nth-child(' + activeAdd + ')').addClass('active');              
	});
  
  
}