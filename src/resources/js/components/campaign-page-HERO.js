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

    let windowHeight = $(window).height();
    let ctaHeight = cta.outerHeight();

    let isChrome = navigator.userAgent.includes("CriOS") && !navigator.userAgent.includes("Linux");
    let isEmulation = navigator.userAgent.includes("Linux");
    let isSafari = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("CriOS") && !navigator.userAgent.includes("Linux");

    let wrapper = $('.campaign_page_HERO_wrap');

    let footer = $("footer");
    let footerOffset = footer.offset().top;
    let topBrowserFix = 0, browserFix = 0;

    if (isEmulation){
      topBrowserFix = 0;
    } 
    
    if (isChrome){
      topBrowserFix = ctaHeight;
    }

    if (isSafari){
      topBrowserFix = 0;
    }
    

    
    let stickToFooter = footerOffset - windowHeight + ctaHeight - topBrowserFix;
    console.log(footerOffset, windowHeight, ctaHeight)

    $(window).scroll(function() {
      let startStick = ctaOffset - windowHeight + browserFix;

      let scrollPos = $(this).scrollTop(); 
      console.log(scrollPos, stickToFooter)
      if (scrollPos >= stickToFooter) {
        // Stick to the footer
        cta.css({ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "16px 40px" });
        wrapper.css('padding-bottom', ctaHeight);
      } else {
        // Unstick
        cta.css({ position: "", top: "", bottom: "", left: "", width: "", padding: "" });
        wrapper.css('padding-bottom', 'inital');
      }
    });
  }

}