export default function () {
	$('#chooseLoginWay li a').on('click', function(){
		var choice = $(this).text();
		if(choice === 'Lösenord'){
			$('#userPasswordGroup').show();
			$('#userPasswordRepeatGroup').show();
			$('#userPassword').prop("required", true);
			$('#userPasswordRepeat').prop("required", true);
		} else {
			$('#userPasswordGroup').hide();
			$('#userPasswordRepeatGroup').hide();
			$('#userPassword').prop("required", false);
			$('#userPasswordRepeat').prop("required", false);
		}
		$('#chooseLoginWayLabel').html(choice + '<i class="icon icon-chevron-down chevron-down pull-right"></i>'+
											'<i class="icon icon-chevron-up icon-chevron-down chevron-up pull-right"></i>');
	});
}

