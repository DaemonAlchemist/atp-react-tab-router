import Link from "./containers/link";
import TabRouter from "./containers/tab-router";
import reducer, {stateKey, addTab, replaceTab, removeTab, selectTab, getTabs} from './reducer/tab-router';

export {Link, TabRouter, addTab, removeTab, replaceTab, selectTab, getTabs};

export default {
    reducers: {
        [stateKey]: reducer
    }
};
