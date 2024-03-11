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
    let startStick = ctaOffset - windowHeight + ctaHeight;
    let footer = $("footer");
    let footerOffset = footer.offset().top;
    let footerHeight = footer.outerHeight();

    $(window).scroll(function() {
      let scrollPos = $(window).scrollTop();
      let stickToFooter = footerOffset - windowHeight;

      if (scrollPos >= stickToFooter) {
        // Stick to the footer
        let offsetTop = footerHeight - ctaHeight;
        cta.css({ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "16px 40px" });
      } else if (scrollPos >= startStick) {
        // Stick to the bottom of the viewport
        cta.css({ position: "fixed", bottom: 0, left: 0, width: "100%", padding: "16px 40px" });
      } else {
        // Unstick
        cta.css({ position: "", top: "", bottom: "", left: "", width: "", padding: "" });
      }
    });
  }

}