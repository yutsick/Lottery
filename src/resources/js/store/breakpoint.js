import { breakpointActions } from './action-names';

export default function(state, action) {
    
    let initialState = {
        currentBreakpointName: '',
    }

    switch(action.type) {
        case breakpointActions.UPDATEBREAKPOINT:
            if(initialState.currentBreakpointName != action.payload) {
                initialState.currentBreakpointName = action.payload;
                return initialState;
            }
        default:
            return initialState;
    }
}