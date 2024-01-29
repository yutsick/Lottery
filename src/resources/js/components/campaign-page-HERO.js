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
}