export default function() {
    $('.js-toggle-content').on('click', function() {
        let $id =  $(this).attr('data-content');
        let $content = $('#'+$id);
        let $header =  $(this).closest('.block-promotion__header');

        if ($(this).hasClass('js-is-active')) {
            $(this).removeClass('js-is-active');
            $header.removeClass('js-is-active');
            $content.removeClass('js-is-visible');
        }
        else {
            $(this).addClass('js-is-active');
            $header.addClass('js-is-active');
            $content.addClass('js-is-visible');
        }
    });
}