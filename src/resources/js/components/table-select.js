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


    // $('#tableSelectHistorik').select2({
    //   templateResult: function(option) {
    //     if (!option.id) {
    //       return option.text;
    //     }
    //     console.log($(option.element).data);
    //     var $option = $(
    //       '<span data-toggle="'  + $(option.element).data('toggle') + '" data-text="' + $(option.element).data('text') + '">' + option.text + '</span>'
    //     );

    //     return $option;
    //   },
    //   templateSelection: function(option) {
    //     if (!option.id) {
    //       return option.text;
    //     }

    //     var $option = $(
    //        '<span data-toggle="'  + $(option.element).data('toggle') + '" data-text="' + $(option.element).data('text') + '">' + option.text + '</span>'
    //     );

    //     return $option;
    //   }
    // });

    $('#spelkontomenu').on('select2:select', function (evt) {
     let choice = evt.params.data.id;
     if (choice) {
			$('#' + choice).addClass('table-pane--active').siblings('.table-pane').removeClass('table-pane--active');
		}

		const target = evt.target
		const option = target.options[target.selectedIndex]
		if(option == null) {
			return
		}

		const href = option.dataset.href

		if(href) {
			window.location = href
		}
    });
	$('.table-select.table-select--sub') .on('select2:select', function (evt) {
	})
	$('.table-select:not(.table-select--sub)') .on('select2:select', function (evt) {
		var choice = evt.params.data.id;
    let selectedOption = evt.params.data.element;
    let $selectedOption = $(selectedOption);
    let titleChange= $selectedOption.data('title');
    let descChange= $selectedOption.data('text');
    let toggle = $selectedOption.data('toggle');
    let defaultDescription = $('.block-desc.dynamic-text').data('text-default');

		if (choice) {
			$('#' + choice).addClass('active').siblings('.tab-pane').removeClass('active');
		}

    if (toggle) {
      $('.toggle.table-pane').removeClass('table-pane--active');
      $('#' + toggle).addClass('table-pane--active');

    } else {
        $('.toggle.table-pane').removeClass('table-pane--active');
      }

    if (descChange) {
      $('.block-title.dynamic-text').text(titleChange);
      $('.block-desc.dynamic-text').text(descChange);
    } else {
      $('.block-desc.dynamic-text').text(defaultDescription);
      $('.block-title.dynamic-text').text('Spelhistorik');
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

  $('#konto-new #spelkonto [data-target]').on('click', function(e){
    let target = $(this).attr('href');
    let switchTo = $(this).data('target');
    $(`${switchTo}`).find(`[href="${target}"]`).trigger('click');
  });




}