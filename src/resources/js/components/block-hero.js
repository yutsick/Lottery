export default function(){

  const breakPoints = {
    "tablet": 1200,
    "mobile": 600
  }
  

  const blockHeroWhole = $('.block-hero-2');
  const secondaryButton = $('.block-hero-2 .secondary-button');
  /** Set properties depends on window size */

  function blockHero(){
    const windowSize = $(window).width();
     /** Set top bg */
    if (windowSize <= breakPoints.mobile){
      blockHeroWhole.css('background',  `url(${blockHeroWhole.data('bg-mob')}) no-repeat center/cover`)
    } else if (windowSize > breakPoints.mobile && windowSize <= breakPoints.tablet){
      blockHeroWhole.css('background',  `url(${blockHeroWhole.data('bg-tab')}) no-repeat center/cover`)
    } else{
      blockHeroWhole.css('background',  `url(${blockHeroWhole.data('bg-desk')}) no-repeat center/cover`)
    }
   
  }

  function secondryButton(){
    const windowSize = $(window).width();
    const btnClass={
      "button-outline": "btn-outline",
      'link': "btn-type-link"
    }
     /** Set top bg */
     $(secondaryButton).each(function() {

      $(this).removeClass('btn-type-link')
      $(this).removeClass('btn-outline')
        if (windowSize <= breakPoints.mobile){
        $(this).addClass(btnClass[$(this).data('type-mob')])
      } else if (windowSize > breakPoints.mobile && windowSize <= breakPoints.tablet){
        $(this).addClass(btnClass[$(this).data('type-tab')])
      } else {
        $(this).addClass(btnClass[$(this).data('type-desk')])
      }
     })
     
   
  }


/**Set shadows */
   
  function setShadow(el, data){
    $(el).each(function() {
      let attributeValue = $(this).attr(`data-${data}`);
      if (attributeValue === 'true') {
        $(this).addClass(data);
      }
    });
  }

  setShadow( $('[data-text-shadow]'),'text-shadow');
  setShadow( $('[data-box-shadow]'), 'box-shadow');

/** Set primary CTA */

  const primaryCta = {
    "blue": "btn-miljonbla",
    "rose": "btn-rosa",
    "light-blue": "btn-lightblue",
    "white": "btn-white"
  }

  let primaryColor = $('[data-primary-color]').data('primary-color');
  let secondaryColor = $('[data-secondary-color]').data('secondary-color');

  $('[data-primary-color]').addClass(primaryCta[primaryColor]);
  $('[data-secondary-color]').addClass(primaryCta[secondaryColor]);

  blockHero();
  secondryButton();
  $(window).on('resize',function(){
    
    blockHero();
    secondryButton();
  });
}