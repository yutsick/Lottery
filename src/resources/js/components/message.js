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
					}, 0);
				}
			}
		});
	});

	// Mobile: Close message.
	$('.js-close-message').on('click', function () {
		$messagesContainer.removeClass('messages--message-active');
	});

	// Mobile: Show more messages.
	$('.js-show-more-messages').on('click', function () {
		let numOfVisibleItems = $('.messages-list__message:visible').length;
		let itemsToShow = numOfVisibleItems + 5;
		$(".messages-list__message:lt(" + itemsToShow + ")").slideDown();

		// Hide load more if all is visible.
		let numOfHiddenItems = $('.messages-list__message:hidden').length;
		if (numOfHiddenItems === 0) {
			$('.messages__load-more-button').remove();
		}
	});
}