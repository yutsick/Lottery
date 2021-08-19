export default function() {

    //radio toggle (for bingolobby)
    function radioToggle(radio) {
        $(radio).on('click', function (e) {
            let inp = $(this);
            if (inp.is('.active')) {
                inp.prop('checked', false).removeClass('active');
            } else {
                $(radio + "[name='" + inp.prop("name") + "'].active").removeClass('active');
                inp.addClass('active');
            }
        });
    }

    //radio on bingolobby page
    radioToggle('.bingolobby__deposits__form-radio');

}