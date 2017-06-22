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
	
	
	$('#chooseLoginWay li').on('click', function(){
		var choice = $(this).text();
		var iconHtml = "";
		if(choice === 'Lösenord'){
			$('#passwordInputs').show();
			$('#userPassword').prop("required", true);
			$('#userPasswordRepeat').prop("required", true);
			iconHtml = '<img id="password-icon" src="assets/img/icons/lock.svg">';
		} else {
			$('#passwordInputs').hide();
			$('#userPassword').prop("required", false);
			$('#userPasswordRepeat').prop("required", false);
			iconHtml = '<img id="bankid-icon" src="assets/img/icons/bankid.svg">';
		}
		$('#chooseLoginWayLabel').html(iconHtml + choice + '<i class="icon icon-chevron-down chevron-down pull-right"></i>'+
											'<i class="icon icon-chevron-up icon-chevron-down chevron-up pull-right"></i>');
	});
	
	$('#registerForm').validator({
    custom: {
        'loginway': function($el) { console.log($el.text()); return false;}
    },
    errors: {
        'loginway': "You must choose a way of logging in!"
    }
});
}

