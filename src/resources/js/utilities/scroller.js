export default function() {
    let $top = $('.top');
    let topBarHeight = $top.height();
    let loaded = false;
    let didScroll;
    let lastScrollTop = 0;
    let availableBreakpoints = ['tiny', 'thumb'];

    const shouldScroll = () => {
        return availableBreakpoints.includes(currentBreakpoint());
    }

    const removeStickyTop = () => {
        $top.removeClass('top--sticky');
    }
    
    const hasScrolled = () => {
        
        var scrollTop = $(window).scrollTop();

        if (scrollTop > lastScrollTop && scrollTop > topBarHeight){
            $top.addClass('top--sticky');
        } else {
            if(scrollTop < topBarHeight) {
                $top.removeClass('top--sticky');
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

    const unloadScroller = () => {
        $(window).off('scroll');
        removeStickyTop();
        loaded = false;
    };

    const currentBreakpoint = () => window.ML.store.breakpoint.getState().currentBreakpointName;

    window.ML.store.breakpoint.subscribe(() => {

        if(shouldScroll()){
            if(!loaded) {
                loadScroller();
            }
        } else {
            unloadScroller();
        }

    });


}