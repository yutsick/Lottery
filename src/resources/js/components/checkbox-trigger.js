export default function() {

    /* Select checkbox option when selecting associated input field */
    $('.order__input-wrapper .form-control').on('focus', function () {
        $(this).siblings('.custom-radio').find('input').prop('checked', true);
    });

}