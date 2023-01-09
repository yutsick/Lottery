export default function () {
	if(!$('.bnkfn').length > 0) {
		return;
	}

	$('.bnkfn').find('.bnkfn__form-input input').on('input', function() {
		if($(this).val().trim().length > 0) {
			$(this).closest('.bnkfn__form-wrapper').find('.btn[type="submit"]').prop( "disabled", false );
		} else {
			$(this).closest('.bnkfn__form-wrapper').find('.btn[type="submit"]').prop( "disabled", true );
		}
	})


}