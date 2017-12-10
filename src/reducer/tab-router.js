import invariant from "invariant";
import {o} from 'atp-sugar';
import {splice} from 'atp-pointfree';
import {push, LOCATION_CHANGE} from 'react-router-redux';

export const stateKey = 'atpReactTabRouter';

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

export const removeTab = index => (dispatch, getState) => {
    invariant(index >= 0, "index must be a positive integer for the replaceTab action creator");

    const curTab = selectedTab(getState);
    const tabCount = getTabs(getState).length;
    const newIndex =
        curTab !== index       ? curTab       :
        index === tabCount - 1 ? tabCount - 2 :
                                 index;

    dispatch({type: REMOVE_TAB, index});
    dispatch(push(getTabs(getState)[newIndex].path));
    dispatch(selectTab(newIndex));
};

export const selectTab = index => {
    invariant(index >= 0, "index must be a positive integer for the selectTab action creator");

    return {type: SELECT_TAB, index};
};

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
const _selectTab = (tabs, curTab, newLabel = null) => tabs.map((tab, index) => ({
    ...tab,
    label: index === curTab && newLabel !== null ? newLabel : tab.label,
    selected: index === curTab
}));

//Reducer
//TODO:  Update selected tab when using browser back and forward buttons
//TODO:  Re-open a tab when using the browser back and forward buttons
//TODO:  Handle browser nav when a tab has been replaced with another (perhaps remove replace functionality instead)
export default (state = [], action) => o(action.type).switch({
    [LOCATION_CHANGE]: () => state.length === 0 && action.payload.pathname !== "/"
        ? [{label: action.payload.pathname, path: action.payload.pathname, selected: true}]
        : state,
    [ADD_TAB]: () => _hasTab(state, action.tabEntry.path)
        ? _selectTab(state, _indexOfTab(state, action.tabEntry.path), action.tabEntry.label)
        : _selectTab(state.concat(action.tabEntry), state.length),
    [REPLACE_TAB]: () => _selectTab(splice(action.index, 1, action.tabEntry)(state), action.index),
    [REMOVE_TAB]:  () => splice(action.index, 1)(state),
    [SELECT_TAB]:  () => _selectTab(state, action.index),
    default: () => state
});
