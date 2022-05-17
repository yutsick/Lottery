export default function() {
    let $top = $('.top');
    let $alert = $('.alert');
    let topBarHeight = $top.outerHeight();
    let balanceBarHeight = $('.balance-bar').outerHeight();
    let pageWinFilterHeight = $('.b-filter').outerHeight();
    let loaded = false;
    let didScroll;
    let lastScrollTop = 0;
    let availableBreakpoints = ['tiny', 'thumb'];
    let $contentWrapper = $('.content-wrapper');
    let contentTop = $contentWrapper.position().top;

//    console.log(topBarHeight);
    const isMobile = () => {
        return availableBreakpoints.indexOf(currentBreakpoint()) != -1;
    }
    
    const hasScrolled = () => {
        
        var scrollTop = $(window).scrollTop();
        if (scrollTop > lastScrollTop && scrollTop > contentTop){
            $top.addClass('top--animate');
            $top.css('transform', 'translateY(-' + topBarHeight + 'px)');
            setTimeout(() => {
                $contentWrapper.css('padding-top', topBarHeight + 'px');
                $top.addClass('top--sticky');
            }, 200)
        } else {
            if(scrollTop < contentTop) {
                $top.removeClass('top--animate');
                $top.css('transform', '');
                $top.removeClass('top--sticky');
                $contentWrapper.css('padding-top', '');
            } else {
                if(scrollTop < lastScrollTop && $top.hasClass('top--animate')) {
                    $top.css('transform', `translateY(${window.ML.getBalanceBarHeight()}px)`);
                }
            }
        }
        
        lastScrollTop = scrollTop;
    }


    const loadScroller = () => {
        loaded = true;

        $(window).on('scroll', function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

    };

    const currentBreakpoint = () => window.ML.store.breakpoint.getState().currentBreakpointName;

    window.ML.store.breakpoint.subscribe(() => {
        topBarHeight = $top.outerHeight();
        contentTop = $contentWrapper.position().top;
        if(!loaded) {
            loadScroller();
        }

    });


    const fullHeight = () => {
        const pageWinContentBoxHeight =  window.innerHeight - topBarHeight;
        $('.blog-win-hero').height(pageWinContentBoxHeight - balanceBarHeight + 2);
        $('.post-slider__item').height(pageWinContentBoxHeight - balanceBarHeight + 2);
        $('.blog-win-posts').height(pageWinContentBoxHeight - ( pageWinFilterHeight + 2 ) - balanceBarHeight);
        $('.win-single').height(pageWinContentBoxHeight - ( pageWinFilterHeight + 18 ) - balanceBarHeight);
//        console.log(pageWinContentBoxHeight);

    };



    if ($(window).width() > 992) {
        fullHeight();
    }
    window.onresize = function() {
        if ($(window).width() > 992) {
            fullHeight();
        } else {
            // $('.post-slider__item, .blog-win-posts, .win-single').height('auto');
            $('.blog-win-hero').height('');
        }
    }

}