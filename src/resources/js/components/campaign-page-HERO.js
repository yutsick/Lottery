export default function (){
  if ($('#campaign-page-HERO').length) {
    $('footer').css('z-index', '1');
  } else {
    $('footer').css('z-index', '4');
  }

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
    let topBrowserFix = 0;

    if (isEmulation){
      topBrowserFix = 0;
    } 
    
    if (isChrome){
      topBrowserFix = ctaHeight;
    }

    if (isSafari){
      topBrowserFix = ctaHeight/2;
    }
    
    let stickToFooter = footerOffset - windowHeight + ctaHeight - topBrowserFix;

    $(window).scroll(function() {

      let scrollPos = $(this).scrollTop(); 

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