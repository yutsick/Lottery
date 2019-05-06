export default function() {

    let $navWithSub = $('.navigation__item--has-children');
    let $defaultNav = null;
    let loaded = false;
    let availableBreakpoints = ['desktop', 'widescreen'];

    const getSubNavigation = ($currentNav) => {
        return $currentNav.children('.navigation__children');
    }

    const isWideMenuAvailable = () => {
        return availableBreakpoints.indexOf(currentBreakpoint()) != -1;
    }

    const currentBreakpoint = () => window.ML.store.breakpoint.getState().currentBreakpointName;

    const loadWideMenu = () => {
        $navWithSub.each((index, item) => {
            let $currentNav = $(item);

            if(!$defaultNav && $currentNav.hasClass('navigation__item--active')) {
                $defaultNav = $currentNav;
                $defaultNav.addClass('navigation__item--default');
            } else if($defaultNav && !$currentNav.hasClass('navigation__item--active')) {
                $defaultNav.addClass('navigation__item--active');
            }
            
            $currentNav.on({
                mouseenter: (e) => {
                    let $currentNavItem = $(e.currentTarget);
                    if($currentNavItem.index() != $defaultNav.index()) {
                        $defaultNav.removeClass('navigation__item--active');
                    } 
                    $currentNavItem.addClass('navigation__item--active');
                    let $children = getSubNavigation($currentNavItem);
                    $children.css('max-height', $children[0].scrollHeight);

                },
                mouseleave: (e) => {
                    let $currentNavItem = $(e.currentTarget);
                    $currentNavItem.removeClass('navigation__item--active')
                    $currentNavItem.children('.navigation__children').css('max-height', 0);

                    $defaultNav.addClass('navigation__item--active');
                    let $children = getSubNavigation($defaultNav);
                    $children.css('max-height', $children[0].scrollHeight);

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