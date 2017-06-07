export default function () {
	
	$("#userEmail").on('focus', function() {
		$('#userPersonalNumber').popover({ html:true, content: "Gustav Ågren <br>Hv*********en <br>4 41* *0, Göteborg"});
		$("#userPersonalNumber").popover('show');
		$('#userPersonalNumber').addClass('loadinggif');
	});
	
	$("#userEmail").on('blur', function() {
		$("#userPersonalNumber").popover('hide');
		$('#userPersonalNumber').removeClass('loadinggif');
	});
	
	
	$('#chooseLoginWay li').on('click', function(){
		var choice = $(this).text();
		if(choice === 'Lösenord'){
			$('#passwordInputs').show();
			$('#userPassword').prop("required", true);
			$('#userPasswordRepeat').prop("required", true);
		} else {
			$('#passwordInputs').hide();
			$('#userPassword').prop("required", false);
			$('#userPasswordRepeat').prop("required", false);
		}
		$('#chooseLoginWayLabel').html(choice + '<i class="icon icon-chevron-down chevron-down pull-right"></i>'+
											'<i class="icon icon-chevron-up icon-chevron-down chevron-up pull-right"></i>');
	});
}

