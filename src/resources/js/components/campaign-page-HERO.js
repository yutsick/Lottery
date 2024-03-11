export default function (){

  const image = $('.campaign_page_HERO_top-rating--mob img');

  if (image.css('display') === 'none') {
    $('.campaign_page_HERO_top-rating--mob').css('flex-wrap', 'nowrap');
  }
  image.on('propertychange change click keyup input paste', function() {
    if (image.css('display') === 'none') {
      $('.campaign_page_HERO_top-rating--mob').css('flex-wrap', 'nowrap');
    }
  });

  //stick CTA before footer if sticked
  let cta = $(".campaign_page_HERO_top-rating--mob");
  if (cta.hasClass("sticky-true")){

    let ctaOffset = cta.offset().top;
    let windowHeight = $(window).height();
    let ctaHeight = cta.outerHeight();
    let startStick = ctaOffset-windowHeight+ctaHeight;
    let footer = $("#footer");
    let footerOffset = footer.offset().top;

    $(window).scroll(function() {
      let scrollPos = $(window).scrollTop();
      let stickToFooter = footerOffset - windowHeight-32;
         
      if (scrollPos >= stickToFooter) {
        console.log(footerOffset, ctaHeight)
        cta.css({ position: "absolute", top: footerOffset - 32, left: 0, width: "100%", height:"80px"});
        //cta.removeClass("stick");
      } else if (scrollPos >= startStick && scrollPos < stickToFooter){

         cta.css({ position: "", top: "", left: "", width: "", height: "" });
         cta.addClass("stick").removeClass("unstick");

      } else {

        cta.addClass("unstick").removeClass("stick");
        cta.css({position: "", top: "", left: "", width: "", height: "" });

      }

    });
  }

}