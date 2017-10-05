export default function () {
    $('#close-panel1').click(function () {
        $(this).find('.ion-ios71-close-empty').toggleClass('is-closed2');
        $('.panel1').slideToggle('slow');
    });

    $('#close-panel').click(function () {
        $(this).find('.ion-ios7-close-empty').toggleClass('is-closed');
        $('.panel').slideToggle('slow');
    });
}




