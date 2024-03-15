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

    let isChrome = navigator.userAgent.includes("CriOS") && !navigator.userAgent.includes("Linux");
    let isEmulation = navigator.userAgent.includes("Linux");
    let isSafari = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("CriOS") && !navigator.userAgent.includes("Linux");


    let footer = $("footer");
    let footerOffset = footer.offset().top;
    let footerHeight = footer.outerHeight()
    let topBrowserFix = 0, browserFix = 0;

    if (isEmulation){
      topBrowserFix = 0;
      browserFix = ctaHeight;
    } 
    
    if (isChrome){
      topBrowserFix = 40;
      browserFix = -20;
    }

    if (isSafari){
      topBrowserFix = ctaHeight;
      browserFix = -20//ctaHeight;
    }
    

    
    let stickToFooter = footerOffset - windowHeight - ctaHeight - topBrowserFix;


    $(window).scroll(function() {
      let startStick = ctaOffset - windowHeight + browserFix;

      let scrollPos = $(window).scrollTop();
    
      if (scrollPos >= stickToFooter) {
        // Stick to the footer
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