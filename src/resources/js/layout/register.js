export default function () {
	
	$("#userEmail").on('focus', function() {
		$('#userPersonalNumber').popover({ html:true, content: "Gustav Ågren <br>Hv*********en <br>4 41* *0, Göteborg"});
		$("#userPersonalNumber").popover('show');
		$('#spinnerPersonalNumber').show();
	});
	
	$("#userEmail").on('blur', function() {
		$("#userPersonalNumber").popover('hide');
		$('#spinnerPersonalNumber').hide();
	});
	
	
	$('.chooseLoginWay').change(function (evt) {
  // Do something¨
			var choice = evt.params.data.id;
			console.log(choice);
			
			if(choice === "password"){
				$('#passwordInputs').show();
				$('#userPassword').prop("required", true);
				$('#userPasswordRepeat').prop("required", true);
			} else {
				$('#passwordInputs').hide();
				$('#userPassword').prop("required", false);
				$('#userPasswordRepeat').prop("required", false);
			}
	});
	
	$('.chooseLoginWay').select2({
		minimumResultsForSearch: Infinity
	});
}

