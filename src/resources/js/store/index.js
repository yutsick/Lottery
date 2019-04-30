import { createStore } from 'redux';
import breakpointStore from './breakpoint';
import navigationStore from './navigation';
import accountStore from './account';

const storeConfiguration = () => {
    return {
        breakpoint: createStore(breakpointStore),
        navigation: createStore(navigationStore),
        account: createStore(accountStore)
    };
}

export default storeConfiguration;