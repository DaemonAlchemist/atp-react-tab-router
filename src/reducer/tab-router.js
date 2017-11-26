import invariant from "invariant";
import typeOf from 'typeof';
import {o} from 'atp-sugar';
import {splice} from 'atp-pointfree';

//Action types
export const ADD_TAB = 'atpReactTabRouter/addTab';
export const REPLACE_TAB = 'atpReactTabRouter/replaceTab';
export const REMOVE_TAB = 'atpReactTabRouter/removeTab';
export const SELECT_TAB = 'atpReactTabRouter/selectTab';

//Action creators
export const addTab = tabEntry => {
    invariant(
        typeOf(tabEntry) === 'tabentry',
        "You must provide a valid TabEntry object to the addTab action creator"
    );

    return {type: ADD_TAB, tabEntry};
};

export const replaceTab = (index, tabEntry) => {
    invariant(index >= 0, "index must be a positive integer for the replaceTab action creator");
    invariant(
        typeOf(tabEntry) === 'tabentry',
        "You must provide a valid TabEntry object to the replaceTab action creator"
    );

    return {type: REPLACE_TAB, index, tabEntry};
};

export const removeTab = index => {
    invariant(index >= 0, "index must be a positive integer for the replaceTab action creator");

    return {type: REMOVE_TAB, index};
};

export const selectTab = index => {
    invariant(index >= 0, "index must be a positive integer for the selectTab action creator");

    return {type: SELECT_TAB, index};
}

const stateKey = 'atpReactTabRouter';

//Selectors
export const getTabs = getState => getState()[stateKey];

//Util
const _selectTab = (tabs, curTab) => tabs.map((tab, index) => ({
    ...tab,
    selected: index === curTab
}));

//Reducer
export default (state, action) => o(action.type).switch({
    [ADD_TAB]:     () => _selectTab(state.concat(action.tabEntry),                   state.length),
    [REPLACE_TAB]: () => _selectTab(splice(action.index, 1, action.tabEntry)(state), action.index),
    [REMOVE_TAB]:  () => _selectTab(splice(action.index, 1)(state),                  action.index),
    [SELECT_TAB]:  () => _selectTab(state,                                           action.index),
    default: () => state
});

