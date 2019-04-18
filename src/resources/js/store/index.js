import { createStore } from 'redux';
import breakpointStore from './breakpoint';
import navigationStore from './navigation';

const storeConfiguration = () => {
    return {
        breakpoint: createStore(breakpointStore),
        navigation: createStore(navigationStore),
    };
}

export default storeConfiguration;