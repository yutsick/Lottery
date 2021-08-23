export default function() {

    //simple tabs
    function tabs (btn, panel) {
        $(btn).on('click', function (event) {
          event.preventDefault();
          
          $(btn).removeClass('active');
          $(this).addClass('active');
          $(panel).removeClass('active');
          $($(this).attr('href')).addClass('active');
        });
    };

    function modalSchemasTabs (btn, panel) {
      $(btn).on('click', function (event) {
        event.preventDefault();
        
        $(btn).removeClass('active');
        $(this).addClass('active');
        $(panel).removeClass('active');
        $($(this).attr('href')).addClass('active');
      });
    }

    //tabs on bingolobby page
    tabs('.js-bingolobby-tabs__btn', '.js-bingolobby-tabs-panel');

    modalSchemasTabs('.bingolobby__schemas-tab', '.js-bingolobby-tabs-panel');

}