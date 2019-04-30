export default function () {

	$("#userEmail").on('focus', function () {
		$('#userPersonalNumber').popover({
			html: true,
			content: "Gustav Ågren <br>Hv*********en <br>4 41* *0, Göteborg"
		});
		$("#userPersonalNumber").popover('show');
		$('#spinnerPersonalNumber').show();
	});

	$("#userEmail").on('blur', function () {
		$("#userPersonalNumber").popover('hide');
		$('#spinnerPersonalNumber').hide();
	});


	$("#userEmail").on('focus', function () {
		$('#userPersonalNumber').popover({
			html: true,
			content: "Gustav Ågren <br>Hv*********en <br>4 41* *0, Göteborg"
		});
		$("#userPersonalNumber").popover('show');
		$('#spinnerPersonalNumber').show();
	});

	$("#userEmail").on('blur', function () {
		$("#userPersonalNumber").popover('hide');
		$('#spinnerPersonalNumber').hide();
	});

	$('.chooseLoginWay').on('select2:select', function (evt) {
		var choice = evt.params.data.id;
		console.log(choice);

		if (choice === "password") {
			$('#passwordInputs').show();
			$('#userPassword').prop("required", true);
			$('#userPasswordRepeat').prop("required", true);
		} else {
			$('#passwordInputs').hide();
			$('#userPassword').prop("required", false);
			$('#userPasswordRepeat').prop("required", false);
		}

		if (choice === "bankid") {
			$('#deviceId').show();
		} else {
			$('#deviceId').hide();
		}
	});

	$('.chooseLoginWay').select2({
		minimumResultsForSearch: Infinity,
		templateSelection: format,
		templateResult: format
	});

	$('.chooseDelivery').select2({
		minimumResultsForSearch: Infinity,
		templateSelection: format,
		templateResult: format
	});

	$('.chooseAssociation').select2({
		templateSelection: format,
		templateResult: format,
		placeholder: "Välj en förening att stödja"
	});

	$(".chooseAssociation").on("select2:open", function() {
		$(".select2-search--dropdown .select2-search__field").attr("placeholder", "Sök stad eller förening");
	});
	$(".chooseAssociation").on("select2:close", function() {
		$(".select2-search--dropdown .select2-search__field").attr("placeholder", null);
	});

	$('.choosePayWay').select2({
		minimumResultsForSearch: Infinity,
		templateSelection: format,
		templateResult: format
	});
	$('.chooseDevice').select2({
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




