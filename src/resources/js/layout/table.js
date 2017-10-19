export default function () {


    $(document).ready(function() {
        //following code will hide all elements with a class of 'filter'
        //if any elements with a class of 'category' are found
        if($('.test').length){
            $('.asd').hide();
        }
    });


    $(document).ready(function () {
        $('#btnHide').click(function () {
            //$('td:nth-child(2)').hide();
            // if your table has header(th), use this
            $('td:nth-child(3),th:nth-child(3)').hide();
        });
    });


    $(document).ready(function () {
        $('.editbtn').click(function () {
            var currentTD = $(this).parents('tr').find('td');
            if ($(this).html() == 'Edit') {
                currentTD = $(this).parents('tr').find('td');
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', true).addClass('.red');
                });
            } else {
                $.each(currentTD, function () {
                    $(this).prop('contenteditable', false);
                });
            }

            $(this).html($(this).html() == 'Edit' ? 'Re' : 'Edit');

        });


        });



}