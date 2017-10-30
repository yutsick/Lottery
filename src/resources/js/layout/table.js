export default function () {


    $(document).ready(function () {
        $('#btnHide').click(function () {
            //$('td:nth-child(2)').hide();
            // if your table has header(th), use this
            $('td:nth-child(3),th:nth-child(3)').hide();
        });
    });

}