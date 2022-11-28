export default function() {
	function switchToSucces(btn) {
		$(btn).on('click', function() {
			$(this).closest('.modal-content').find('.modal-gameLimit__settings').fadeOut();
			$(this).closest('.modal-content').find('.modal-gameLimit__success').fadeIn();
		});
	};
	switchToSucces('.js-gameLimitToSuccess');

	function changeContent(btn) {
		$(btn).on('click', function() {
			$(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-text').toggle();
			$(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').toggle();

			$(this).siblings('.js-gameLimit-change').toggle();
			$(this).toggle();
		});
	}
	changeContent('.js-gameLimit-change');

	function saveInput(btn) {
		$(btn).on('click', function() {
			let value = $(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').val();
			let input = $(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').attr('data-name');
			let text = $(this).closest('.modal-gameLimit__item').find('.modal-gameLimit__item-input').attr('data-text');

			let date = new Date();

			$(this).closest('.modal-gameLimit__item').find('.change').addClass('changed');
			$(this).closest('.modal-gameLimit__item').find('.change').removeClass('change');

			$(this).closest('.modal-body').find(`.modal-gameLimit__newLimits-${input}`).html(`<b>*${value} kr</b> per ${text} gäller från <b>${date.getDate()}/${date.getMonth() + 1}</b>`)
			$(this).closest('.modal-body').find('.modal-gameLimit__newLimits').slideDown();
		});
	}
	saveInput('.js-gameLimit-save');
}