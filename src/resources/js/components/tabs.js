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
    };

    //on resize 993px > target panes is appear
    $(window).resize(function() {
      if($( window ).width() > 993) {
          $($('.js-bingolobby-tabs__btn.active').attr('href')).addClass('active');
          $($('.js-campaign-tabs__btn.active').attr('href')).addClass('active');
      }
    });

    //tabs on bingolobby page
    tabs('.js-bingolobby-tabs__btn', '.js-bingolobby-tabs-panel');

    modalSchemasTabs('.bingolobby__schemas-tab', '.js-bingolobby-tabs-panel');

    //tabs on campaign page
    tabs('.js-campaign-tabs__btn', '.js-campaign-tabs-panel');

}