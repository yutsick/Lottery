export default function() {

    // Remove dreamlist item when clicking the button
    $('.js-remove-from-dreamlist').on('click', function () {
        $(this).parent().parent().remove();
        countDreamlistItems();
    });

    // Count items
    function countDreamlistItems() {
        let items = $('.js-remove-from-dreamlist').parent().parent().length;

        // redirect to empty list if less than 1 item
        if (items < 1) {
            window.location.href = "/dromlista-tom.html";
        }
    }
}