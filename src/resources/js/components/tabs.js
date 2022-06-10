export default function() {

    //simple tabs
    function tabs (btn, panel) {
        $(btn).on('click', function (event) {
          event.preventDefault();
          
          $(btn).removeClass('desctop__active active');
          $(this).addClass('desctop__active active');
          $(panel).removeClass('desctop__active active');
//          $('.bingoroom-tabs>.tab').removeClass('active');
//          $('.bingoroom-tabs__').removeClass('desctop__active active');
          $($(this).attr('href')).addClass('desctop__active active');
        });
    };

  
    //tabs in schema-tabs module
    tabs('.js-schema-tabs__btn', '.js-schema-tabs__panel');
    tabs('.js-schemas-modal-tabs__tab', '.schema-tabs__panel-content');

}