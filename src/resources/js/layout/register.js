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
	
	
	$('.chooseLoginWay').on('select2:select', function (evt) {
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
		minimumResultsForSearch: Infinity,
    templateSelection: format,
		templateResult: format
	});
}

function format(o) {
    if (!o.id)
      return o.text;
    else if (o.id == 'password')
        return $('<img id="password-icon" src="assets/img/icons/lock.svg" class="choice-icon"/><span>' + o.text + '</span>');
    else if (o.id == 'bankid')
        return $('<img id="bankid-icon" src="assets/img/icons/bankid.svg" class="choice-icon"/><span>' + o.text + '</span>');
	  else return o.text;
  }

