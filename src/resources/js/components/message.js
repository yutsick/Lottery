import isMobile from './../utilities/isMobile';

export default function () {
	let $messagesContainer = $('.messages');

	$('.js-load-message').on('click', function () {
		let $this = $(this);
		let messageId = $this.data('message-id');
		let $message = $('.message');

		$('.messages-list__message').removeClass('messages-list__message--active');

		$this.removeClass('messages-list__message--unread').addClass('messages-list__message--active');

		$messagesContainer.addClass('messages--is-loading');

		$.ajax({
			type: 'get',
			url: $messagesContainer.data('messages-endpoint') + messageId,
			success: function (response) {
				$message.html(response);

				$messagesContainer.addClass('messages--message-active').removeClass('messages--is-loading');

				if (isMobile()) {
					$("html, body").animate({
						scrollTop: 0
					}, 240);
				}
			}
		});
	});

	$('.js-close-message').on('click', function () {
		$messagesContainer.removeClass('messages--message-active');
	});

	$('.js-show-more-messages').on('click', function () {
		let numOfVisibleItems = $('.messages-list__message:visible').length;
		let itemsToShow = numOfVisibleItems + 3;
		$(".messages-list__message:lt(" + itemsToShow + ")").slideDown();

		let numOfHiddenItems = $('.messages-list__message:hidden').length;
		if (numOfHiddenItems === 0) {
			$('.messages__load-more-button').remove();
		}
	});
}