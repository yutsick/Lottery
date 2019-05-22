import { navigationActions } from '../store/action-names';

export default function() {

    let $navigationItems = $('.navigation__item--active .navigation__item a');
    let $megaItems = $('.top__mega-item--active .navigation__item a');

    const activeListItemClasses = ['navigation__item--active'];

    const setNavigationItemToActive = ($link) => {
        let $activeItem = $('.js-navigation__item--active .navigation__item--active');
        if($activeItem.length > 0) {
            $activeItem.removeClass(activeListItemClasses);
        }
        let $megaActiveItem = $('.js-top__mega-item--active .navigation__item--active');
        if($megaActiveItem.length > 0) {
            $megaActiveItem.removeClass(activeListItemClasses);
        }
        let $listItem = $link.parent();
        if($listItem.length > 0) {
            $listItem.addClass(activeListItemClasses);
        }

        let $megaItem = $link.parent().parent().parent();
        if($megaItem.length > 0) {
            if($megaItem.hasClass('top__mega-item--active')) {
                let $navItemLink = $('.js-navigation__item--active a[href="' + $link.attr('href') + '"]');
                if($navItemLink.length > 0) {
                    $navItemLink.parent().addClass(activeListItemClasses);
                }
            } else {
                let $megaItemLink = $('.js-top__mega-item--active a[href="' + $link.attr('href') + '"]');
                if($megaItemLink.length > 0) {
                    $megaItemLink.parent().addClass(activeListItemClasses);
                }
            }
        }

        
    }

    const click = (e) => {
        const $link = $(e.target);
        if($link.length > 0) {
            const href = $link.attr('href');
            if(href) {
                if(window.location.href.indexOf(href)) {
                    window.ML.store.navigation.dispatch({ type: navigationActions.SHOWNAVIGATION, payload: false });
                    setNavigationItemToActive($link);
                }
            }
        }
    }

    $navigationItems.on('click', click);
    $megaItems.on('click', click);
}