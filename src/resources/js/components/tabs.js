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


    //on resize 993px > target panes is appear
    $(window).resize(function() {
      if($( window ).width() > 993) {
          $($('.js-bingolobby-tabs__btn.active').attr('href')).addClass('active');
          $($('.js-campaign-tabs__btn.active').attr('href')).addClass('active');
      }
    });

    
    
    //tabs in schema-tabs module
    tabs('.js-schema-tabs__btn', '.js-schema-tabs__panel');
    tabs('.js-schemas-modal-tabs__tab', '.schema-tabs__panel-content');

}