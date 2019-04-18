import debounce from 'lodash.debounce';
import { breakpointActions } from '../store/action-names';
export default function () {
	const getCurrentMediaQueryName = () => {
        let mediaQueryName = window.getComputedStyle(
            document.querySelector( 'body' ), ':before'
        ).getPropertyValue( 'content' ).replace( /\"/g, '' );
            window.ML.store.breakpoint.dispatch({ type: breakpointActions.UPDATEBREAKPOINT, payload: mediaQueryName });
    };
    window.addEventListener( 'resize', debounce(getCurrentMediaQueryName, 200) );
    getCurrentMediaQueryName();
}