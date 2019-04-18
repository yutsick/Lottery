import { navigationActions } from './action-names';

export default function(state, action) {
    
    let initialState = {
        isOpened: false,
    }

    switch(action.type) {
        case navigationActions.SHOWNAVIGATION:
            initialState.isOpened = action.payload;
            return initialState;
        default:
            return initialState;
    }
}