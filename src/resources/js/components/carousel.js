var tns =  require('tiny-slider/src/tiny-slider').tns;



export default function () {
    let carousels = [];
    let carouselNodes = document.querySelectorAll('.js-carousel');

	if (carouselNodes) {
        for(let i = 0; i < carouselNodes.length; i++) {
            let currentNode = carouselNodes[i];
            carousels.push(tns({
                container: '#' + currentNode.id,
                slideBy: 'page',
                autoplay: false,
                controls: false,
                mouseDrag: true,
                navPosition: 'bottom',
                navContainer: '.promotion-shop__carousel-nav',
            }));
        }
    }

    window.ML.store.breakpoint.subscribe(() => {
        for(let i = 0; i < carousels.length; i++) {
            carousels[i].refresh();
        }
     });
}