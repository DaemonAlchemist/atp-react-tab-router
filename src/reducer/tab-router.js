import invariant from "invariant";
import {o} from 'atp-sugar';
import {splice} from 'atp-pointfree';

//Action types
export const ADD_TAB = 'atpReactTabRouter/addTab';
export const REPLACE_TAB = 'atpReactTabRouter/replaceTab';
export const REMOVE_TAB = 'atpReactTabRouter/removeTab';
export const SELECT_TAB = 'atpReactTabRouter/selectTab';

//Action creators
export const addTab = tabEntry => {
    invariant(tabEntry.label, "A label is required to create a tab router entry");
    invariant(tabEntry.path, "A path is required to create a tab router entry");

    return {type: ADD_TAB, tabEntry};
};

export const replaceTab = (index, tabEntry) => {
    invariant(tabEntry.label, "A label is required to create a tab router entry");
    invariant(tabEntry.path, "A path is required to create a tab router entry");

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

export const stateKey = 'atpReactTabRouter';

//Selectors
const _getTabs = tabs => tabs.map((tab, index) => ({...tab, index}));
export const getTabs = getState => _getTabs(getState()[stateKey]);

const _indexOfTab = (tabs, path) => _getTabs(tabs)
    .filter(tab => tab.path === path)
    .concat({index: undefined})[0]
    .index;
export const indexOfTab = (getState, path) => _indexOfTab(getTabs(getState), path);

const _hasTab = (tabs, path) => typeof _indexOfTab(tabs, path) !== 'undefined';
export const hasTab = (getState, path) => _hasTab(getTabs(getState), path);

export const selectedTab = getState => getTabs(getState)
    .filter(tab => tab.selected)
    .concat({index: undefined})[0].index;

//Util
const _selectTab = (tabs, curTab) => tabs.map((tab, index) => ({
    ...tab,
    selected: index === curTab
}));

//Reducer
export default (state = [], action) => o(action.type).switch({
    [ADD_TAB]: () => _hasTab(state, action.tabEntry.path)
        ? _selectTab(state, _indexOfTab(state, action.tabEntry.path))
        : _selectTab(state.concat(action.tabEntry), state.length),
    [REPLACE_TAB]: () =>
        _selectTab(splice(action.index, 1, action.tabEntry)(state), action.index),
    [REMOVE_TAB]:  () => state[action.index].selected
        ? _selectTab(
            splice(action.index, 1)(state),
            action.index === state.length - 1 ? state.length - 2 : action.index
        )
        : splice(action.index, 1)(state),
    [SELECT_TAB]:  () =>
        _selectTab(state, action.index),
    default: () => state
});
