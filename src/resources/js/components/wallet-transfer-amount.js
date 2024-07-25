export default function() {

    
  
	let  $input = $('.popover-control');
	

	  const popover = () => {
        if ($input && $input.length > 0) {
            $input.popover({
                content: 'Felaktigt lottnummer. Dubbelkolla att du har skrivit in rätt.',
                placement: 'top',
                trigger: 'manual',
            });
        }
    } 
	popover();
	// $input.popover('show');
	$('.js-wallet-amount').bind('click', function (e) {

		
		// Add data-attr as input value
		$(this).parent().find('input').val($(this).data('amount'));

		// Add active class to current button
		$(this).addClass('wallet-transfer__btn--active').siblings().removeClass('wallet-transfer__btn--active');

		// Enable submit button when selecting a value
		$(this).siblings('.wallet-transfer__submit').removeClass('disabled'); 
	});

	// Remove active class when emptying the input field
	$('.wallet-transfer__form-wrapper .js-action-empty-input').bind('click', function () {
		$('.js-wallet-amount').removeClass('wallet-transfer__btn--active');
		$input.popover('show');
	});


}