export default function() {

    //Desktop main navigation
    let $navWithSub = $('[data-mega-menu-id]').not('.js-navigation__item--active, .js-top__quick-nav-item--active');
    let $navWithoutSub = $('.js-navigation__item').not('[data-mega-menu-id]');
    let $defaultNav = $('.js-navigation__item--active');
    let $currentNavItem = null;
    const navigationActiveStateClassName = 'navigation__item--active';

    //Mega menu (Visible on thumb and up)
    let $megaContainer = $('.top__mega');
    let $megaNavItems = $('.js-top__mega-item').not('.js-top__mega-item--active');
    let $defaultMega = $('.js-top__mega-item--active');
    let $currentMegaItem = null;
    let previousMegaItemIndex = null;
    const megaActiveStateClassName = 'top__mega-item--active';
    const megaHiddenClassName = 'top__mega--hidden';

    //Quick nav (visible on tablets)
    const quickNavStateClassName = 'js-top__quick-nav-item--active';
    const quickNavItemClassName = 'js-top__quick-nav-item';
    let $defaultQuickNav = $(`.${quickNavStateClassName}`);
    const quickNavActiveStateClassName = 'top__quick-nav-item--active';
    
    const $toggleBtnActive = $('.js-top__menu-toggle--active');
    const toggleBtnActiveClassName = 'top__menu-toggle--active';
    
    let loaded = false;
    let shouldHideMega = true;
    let hideTimeoutId = null;

    //Mega menu should only work on tablet and up
    let availableBreakpoints = ['handheld', 'lap', 'desktop', 'widescreen'];

    let mobileBreakpoints = ['thumb', 'handheld', 'lap'];
    
    let thumbBreakpoints = ['tiny', 'thumb', 'handheld'];

    const isThumbScreenSizeActive = () => {
        return thumbBreakpoints.indexOf(currentBreakpoint()) != -1;
    }

    const isMobileMenuAvailable = () => {
        return mobileBreakpoints.indexOf(currentBreakpoint()) != -1;
    }

    const isWideMenuAvailable = () => {
        return availableBreakpoints.indexOf(currentBreakpoint()) != -1;
    }

    //Get current media query
    const currentBreakpoint = () => window.ML.store.breakpoint.getState().currentBreakpointName;

    //Show or hide navigation
    const toggleDefaultNavActiveState = ($selector, className, show) => {
        if($selector && $selector.length > 0) {
            if(show) {
                $selector.addClass(className);
                $defaultMega.addClass(megaActiveStateClassName);
            } else {
                $selector.removeClass(className);
                $defaultMega.removeClass(megaActiveStateClassName);
            }
        }
    }

    //Toggle main navigation and quick links
    const toggleMainNavItem = ($mainNavItem, toggle) => {
        
        if($mainNavItem.length == 0) {
            return;
        }

        if (hideTimeoutId) {
            clearTimeout(hideTimeoutId);
        }

        $currentNavItem = $mainNavItem;
        
        if($currentNavItem && $currentNavItem.length > 0) {
            //check if we are using quick navigation on handheld and lap screen sizes
            const isQuickNavItem = $currentNavItem.hasClass(quickNavItemClassName);
            const activeClassName = isQuickNavItem ? quickNavActiveStateClassName : navigationActiveStateClassName;
            
            //If slide out navigation is active and we are hovering over main navigations within the slide out navigation dont do anything
            if(!isQuickNavItem && isMobileMenuAvailable()) {
                return;
            }

            if(isQuickNavItem && isThumbScreenSizeActive()) {
                return;
            }

            if(isQuickNavItem) {
                if(toggle && $currentNavItem.index() != $defaultQuickNav.index() && $defaultQuickNav.hasClass(quickNavActiveStateClassName)) {
                    toggleDefaultNavActiveState($defaultQuickNav, activeClassName, false);
                } else if(toggle && $defaultQuickNav.length == 0) {
                    toggleDefaultNavActiveState($defaultNav, navigationActiveStateClassName, false);
                }
                if($toggleBtnActive && $toggleBtnActive.length > 0) {
                    $toggleBtnActive.removeClass(toggleBtnActiveClassName);
                }
            } else {
                //If hover over other then default lets remove default active state
                if(toggle && $currentNavItem.index() != $defaultNav.index() && $defaultNav.hasClass(navigationActiveStateClassName)) {
                    toggleDefaultNavActiveState($defaultNav, activeClassName, false);
                }
            }

            //Set new item as active or reset
            if(toggle) {
                $currentNavItem.addClass(isQuickNavItem ? quickNavActiveStateClassName : navigationActiveStateClassName);
                const currentMegaId = $currentNavItem.attr('data-mega-menu-id');
                $currentMegaItem = $('#' + currentMegaId);
                if($currentMegaItem && $currentMegaItem.length > 0) {
                    $currentMegaItem.addClass(megaActiveStateClassName);
                }
            } else {
                $currentNavItem.removeClass(isQuickNavItem ? quickNavActiveStateClassName : navigationActiveStateClassName);
                if($currentMegaItem && $currentMegaItem.length > 0) {
                    $currentMegaItem.removeClass(megaActiveStateClassName);
                    $currentMegaItem = null;
                }
                if(isQuickNavItem) {
                    if($defaultQuickNav.length > 0) {
                        toggleDefaultNavActiveState($defaultQuickNav, activeClassName, true);
                    } else {
                        toggleDefaultNavActiveState($defaultNav, activeClassName, true);
                    }
                    if($toggleBtnActive && $toggleBtnActive.length > 0) {
                        $toggleBtnActive.addClass(toggleBtnActiveClassName);
                    }
                } else {
                    toggleDefaultNavActiveState($defaultNav, activeClassName, true);
                }
            }
        }
    }

    const initNavItem = item => {
        $(item).on({
            mouseenter: (e) => {
                if (hideTimeoutId) {
                    clearTimeout(hideTimeoutId);
                    toggleMainNavItem($currentNavItem, false)
                }
                toggleMainNavItem($(e.currentTarget), true);
            },
            mouseleave: (e) => {
                toggleMainNavItem($(e.currentTarget), false);
            }
        });
    }


    //Mega menu    
    const toggleMegaItem = (e, toggle) => {
        let $currentMegaItem = $(e.currentTarget);
        if(toggle) {
            previousMegaItemIndex = $currentMegaItem.index();

            if($currentMegaItem.length == 0) {
                return;
            }
            const currentMegaId = $currentMegaItem.attr('id');
            if($currentNavItem.length > 0 && $currentNavItem.attr('data-mega-menu-id') === currentMegaId) {
                toggleMainNavItem($currentNavItem, true);
            } else {
                $currentNavItem = $(`[data-mega-menu-id="${currentMegaId}"]`);
                toggleMainNavItem($currentNavItem, true);
            }
        } else {
            if (previousMegaItemIndex == $currentMegaItem.index()) {
                hideTimeoutId = setTimeout(() => {
                    if (shouldHideMega) {
                        toggleMainNavItem($currentNavItem, false);
                    }
                    hideTimeoutId = null;
                }, 1000);
                return;
            }
            toggleMainNavItem($currentNavItem, false);
        }
    }
    
    const initMegaItem = item => {
        $(item).on({
            mouseenter: (e) => {
                shouldHideMega = false
                toggleMegaItem(e, true);
            },
            mouseleave: (e) => {
                shouldHideMega = true
                toggleMegaItem(e, false);
            },
        });
    }

    const toggleMega = (e, toggle) => {
        if(isMobileMenuAvailable()) {
            return;
        }

        if($defaultMega.length == 0) {
            return;
        }

        if(toggle) {
            $megaContainer.addClass(megaHiddenClassName);
            $defaultNav.removeClass(navigationActiveStateClassName);
        } else {
            $megaContainer.removeClass(megaHiddenClassName);
            $defaultNav.addClass(navigationActiveStateClassName);
        }
    }

    const initNavWithoutSubItem = item => {
        $(item).on({
            mouseenter: (e) => { 
                if (hideTimeoutId) {
                    clearTimeout(hideTimeoutId);
                    toggleMainNavItem($currentNavItem, false)
                }
                toggleMega(e, true)
            },
            mouseleave: (e) => toggleMega(e, false)
        });
    }

    const loadWideMenu = () => {
        $navWithSub.each((index, item) => initNavItem(item));
        $navWithoutSub.each((index, item) => initNavWithoutSubItem(item))
        $megaNavItems.each((index, item) => initMegaItem(item))
    }

    window.ML.store.breakpoint.subscribe(() => {
       if(isWideMenuAvailable()) {
           if(!loaded) {
               loadWideMenu();
               loaded = true
           }
       }
    });
}