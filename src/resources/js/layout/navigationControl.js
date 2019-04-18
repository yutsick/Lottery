export default function() {

    let $navWithSub = $('.navigation__item--has-children');
    let $defaultNav = null;
    let $previousNav = null;
    let loaded = false;
    let availableBreakpoints = ['desktop', 'widescreen'];

    const getSubNavigation = ($currentNav) => {
        return $currentNav.children('.navigation__children');
    }

    const isWideMenuAvailable = () => {
        return availableBreakpoints.includes(currentBreakpoint());
    }

    const currentBreakpoint = () => window.ML.store.breakpoint.getState().currentBreakpointName;

    const loadWideMenu = () => {
        $navWithSub.each((index, item) => {
            let $currentNav = $(item);
            
            if(!$defaultNav && $currentNav.data('open-by-default')) {
                $defaultNav = $currentNav;
            }
            
            $currentNav.on({
                mouseenter: () => {
                    if($previousNav) {
                        $previousNav.removeClass('navigation__item--active');
                        $previousNav.children('.navigation__children').css('max-height', 0);
                    }
                    if($defaultNav && $defaultNav.hasClass('navigation__item--active') && $defaultNav.index() != $currentNav.index()) {
                        $defaultNav.removeClass('navigation__item--active');
                        $defaultNav.children('.navigation__children').css('max-height', 0);
                    }
                    $currentNav.addClass('navigation__item--active');
                    let $children = getSubNavigation($currentNav);
                    $previousNav = $currentNav;
                    $children.css('max-height', $children[0].scrollHeight);
                },
                mouseleave: () => {
                    if($previousNav) {
                        $previousNav.removeClass('navigation__item--active');
                        $previousNav.children('.navigation__children').css('max-height', 0);
                    }
                }
            });    
        });
    
    }

    const unloadWideMenu = () => {
        $navWithSub.each((index, item) => {
            let $currentNav = $(item);       
            $currentNav.off('mouseenter mouseleave');
        });
    }

    window.ML.store.breakpoint.subscribe(() => {
       if(isWideMenuAvailable()) {
           if(!loaded) {
               loadWideMenu();
               loaded = true
           }
       } else {
           if(loaded) {
               unloadWideMenu();
               loaded = false;
           }
       }
    });
}