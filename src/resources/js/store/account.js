import { accountActions } from './action-names';

export default function(state, action) {
    
    let initialState = {
        isOpened: false,
    }

    switch(action.type) {
        case accountActions.SHOWACCOUNT:
            initialState.isOpened = action.payload;
            return initialState;
        default:
            return initialState;
    }
}