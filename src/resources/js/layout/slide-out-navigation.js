import { navigationActions } from '../store/action-names';

export default function() {

        let currentActiveNavItem = null;
		let $slideOutNavigationBtn = $('.js-toggle-nav');
		let $overlay = $('.js-top__overlay');
		let $slideOutNavigation = $('.js-main-navigation');
		let $overlayBtn = $('.js-top__overlay-btn');
		let $navigationToggleBtns = $slideOutNavigation.find('.js-navigation__toggle');
		let showNavigationClassName = 'navigation--show';
		let overlayClosedClassName = 'top__overlay--closed';
		let overlayShowClassName = 'top__overlay--show';
		let overlayBtnShowClassName = 'top__overlay-btn--show';
		let overlayBtnClosingClassName = 'top__overlay-btn--closing';
		let overlayBtnLeftClassName = 'top__overlay-btn--left';
		let navigationItemActiveClassName = 'navigation__item--active';
		let navigationSlideOutClassName = 'navigation--slide-out';
		let $openByDefaultMavBtn = null;

		//which breakpoints should accept slide out navigation
		let availableBreakpoints = ['tiny', 'thumb', 'handheld', 'lap'];

		//Get navigation and breakpoint states
		const navigationState = () => window.ML.store.navigation.getState();
		const currentBreakpoint = () => window.ML.store.breakpoint.getState().currentBreakpointName;

		const dispatchEvents = (showNavigation) => {
			window.ML.store.navigation.dispatch({ type: navigationActions.SHOWNAVIGATION, payload: showNavigation });				
		}

		//check if slide out navigation should be used
		const slideOutMenuIsAvailable = () => {
			return availableBreakpoints.indexOf(currentBreakpoint()) != -1;
		}

		//show slide out navigation
		const showSlideOutMenu = show => {
			if(show) {
				$slideOutNavigation.addClass(showNavigationClassName);
				showOverlay(true);
			} else {
				$slideOutNavigation.removeClass(showNavigationClassName);
                hideSubNavigations();
				showOverlay(false);
			}
		}

		//handle overlay
		const showOverlay = (show) => {
			if(show) {
				$overlay.removeClass(overlayClosedClassName);
				$overlay.addClass(overlayShowClassName);
				$overlayBtn.addClass(overlayBtnLeftClassName);
				$overlayBtn.addClass(overlayBtnShowClassName);
				$('body').addClass('freeze');
			} else {
				$overlayBtn.addClass(overlayBtnClosingClassName);
				$overlayBtn.removeClass(overlayBtnShowClassName);
				$overlayBtn.removeClass(overlayBtnShowClassName);
				$overlay.removeClass(overlayShowClassName);
				setTimeout(() => {
					$overlay.addClass(overlayClosedClassName);
					$overlayBtn.removeClass(overlayBtnClosingClassName);
					$overlayBtn.removeClass(overlayBtnLeftClassName);
				}, 300);
				$('body').removeClass('freeze');
			}
        }
        
        //animate slide out of sub navigation
        const slideSubNavigationHeight = ($currentSubNavigation, shouldExpand) => {
            if(shouldExpand) {
                const scrollHeight =  $currentSubNavigation[0].scrollHeight;
                $currentSubNavigation.css('max-height', scrollHeight);
            } else {
                $currentSubNavigation.css('max-height', 0);
            }
        }

		const toggleSubNavigation = (toggle) => {
    
			let $currentTarget = $(toggle.currentTarget);
            let $currentParentTarget = $currentTarget.parent();
            let $currentSubNavigation = $currentTarget.siblings('.navigation__children');
            const shouldExpand = !$currentParentTarget.hasClass(navigationItemActiveClassName);

            //Hide sub navigation if an item already opened
            if(currentActiveNavItem && $currentParentTarget.index() != currentActiveNavItem.index()) {
                hideSubNavigations();
            }

            slideSubNavigationHeight($currentSubNavigation, shouldExpand);
            if(shouldExpand) {
                currentActiveNavItem = $currentParentTarget
                $currentParentTarget.addClass(navigationItemActiveClassName);
            } else {
                currentActiveNavItem = null;
                $currentParentTarget.removeClass(navigationItemActiveClassName);
            }
		}

        //Close all active sub navigations
		const hideSubNavigations = () => {
			$('.' + navigationItemActiveClassName).each((index, item) => {
                let $item = $(item);
                let $btn = $item.children('.js-navigation__toggle');
                if($btn.length > 0) {
                    $btn.trigger('click');
                }
            });
		}
		
		const updateSlideOutNavigation = (navigationState) => {
			//if we have slide out navigation active in wider screen we close it
			if(!slideOutMenuIsAvailable()) {
				if(navigationState.isOpened) {
					dispatchEvents(false);
                    showOverlay(false);
					hideSubNavigations();
					$slideOutNavigation.removeClass(showNavigationClassName);
				}
				return;
			}
			if($openByDefaultMavBtn && !$openByDefaultMavBtn.parent().hasClass('navigation__item--active') && navigationState.isOpened) {
				$openByDefaultMavBtn.click();
			}
			//handle slide out
			showSlideOutMenu(navigationState.isOpened);
		};

		//click events on overlay and slide out button
		$overlay.on('click', () => dispatchEvents(false));
		$overlayBtn.on('click', () => dispatchEvents(false));

		$navigationToggleBtns.each((index, item) => {
			if($(item).parent().data('open-by-default')) {
				$openByDefaultMavBtn = $(item);
			}
			$(item).on('click', (e) => toggleSubNavigation(e));
        });
        
		$slideOutNavigationBtn.on('click', () => {
			if(slideOutMenuIsAvailable()) {
				dispatchEvents(!navigationState.isOpened)
			}
		});

		const initSlideOut = () => {
			const shouldSlideOut = slideOutMenuIsAvailable();
            if(shouldSlideOut && !$slideOutNavigation.hasClass(navigationSlideOutClassName)) {
                setTimeout(() => {
                    $slideOutNavigation.addClass(navigationSlideOutClassName);
                }, 100)
            }
            if(!shouldSlideOut && $slideOutNavigation.hasClass(navigationSlideOutClassName)){
                $slideOutNavigation.removeClass(navigationSlideOutClassName);
			}
			updateSlideOutNavigation(navigationState());			
		}

		
		
		//Listeners for breakpoint and navigation states
		window.ML.store.breakpoint.subscribe(() => {
			initSlideOut();
		});

		window.ML.store.navigation.subscribe(() => {
			updateSlideOutNavigation(navigationState());
		});




}