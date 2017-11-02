export default function () {
	$(document).on("click", "#test", function () {
		$('.meddelande__container-list').addClass('meddelande__message--notvisible');
		$('.meddelande__message').addClass('meddelande__message--visible');
		$('.test1').addClass('test');
		$('#loadMore').addClass('meddelande__message--notvisible');
	});

	$(document).on("click", ".test", function () {
		$('.meddelande__container-list').removeClass('meddelande__message--notvisible');
		$('.meddelande__message').removeClass('meddelande__message--visible');
		$('.test1').removeClass('test');
		$('#loadMore').removeClass('meddelande__message--notvisible');
	});

	$(document).ready(function () {
		// Load the first 3 list items from another HTML file
		//$('#messagelist').load('externalList.html li:lt(3)');
		$('#messagelist li:lt(5)').show();
		$('#showLess').hide();
		var items = 25;
		var shown = 3;
		$('#loadMore').click(function () {
			$('#showLess').show();
			shown = $('#messagelist li:visible').length + 1;
			if (shown < items) {
				$('#messagelist li:lt(' + shown + ')').show();
			}
			else {
				$('#messagelist li:lt(' + items + ')').show();
				$('#loadMore').hide();
			}
		});
		$('#showLess').click(function () {
			$('#messagelist li').not(':lt(5)').hide();
			$('#loadMore').show();
			$('#showLess').hide();
		});
	});
}
