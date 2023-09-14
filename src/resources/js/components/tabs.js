export default function() {

    //simple tabs
    function tabs (btn, panel, clickself) {
        $(btn).on('click', function (event) {
          event.preventDefault();
          if($(this).hasClass('desctop__active active') && clickself){
            $(this).removeClass('desctop__active active');

            if($(this).prop("tagName") != 'A'){
              $($(this).find('a').attr('href')).parent().find(panel).removeClass('desctop__active active');
    
            } else {
              $($(this).attr('href')).parent().find(panel).removeClass('desctop__active active');
      
            }

          } else {
             $(this).parent().find(btn).removeClass('desctop__active active');
            $(this).addClass('desctop__active active');
          
         
         // $(panel).removeClass('desctop__active active');
//          $('.bingoroom-tabs>.tab').removeClass('active');
//          $('.bingoroom-tabs__').removeClass('desctop__active active');

            if($(this).prop("tagName") != 'A'){
              $($(this).find('a').attr('href')).parent().find(panel).removeClass('desctop__active active');
              $($(this).find('a').attr('href')).addClass('desctop__active active');
            } else {
              $($(this).attr('href')).parent().find(panel).removeClass('desctop__active active');
              $($(this).attr('href')).addClass('desctop__active active');
            }
          }
        });
    };

  
    //tabs in schema-tabs module


    if ($(window).width() > 992){
      tabs('.js-schema-tabs__btn', '.js-schema-tabs__panel',true);
    } else {
      tabs('.js-schema-tabs__btn', '.js-schema-tabs__panel',false);
    }

    
    tabs('.js-bingoschema-tabs__btn', '.js-bingoschema-tabs__panel', false);
    tabs('.js-bingoschema-chattspel-tabs__btn', '.js-bingoschema-chattspel-tabs__panel', false);
    tabs('.js-bingoschema-tabs-slots__btn', '.js-bingoschema-tabs-slots__panel', false);
    tabs('.js-schemas-modal-tabs__tab', '.schema-tabs__panel-content', true);

}