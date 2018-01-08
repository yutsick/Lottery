export default function() {

    if ($('.lightgallery').length) {
        let $count = $('.lightgallery__item').length;
        $('.js-item-count').html($count);

        lightGallery(document.getElementById('lightgallery'), {
            thumbnail: true,
            animateThumb: false,
            counter: false,
            download: false,
            toggleThumb: false
        });
    }
}