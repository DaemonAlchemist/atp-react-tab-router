import {connect} from 'react-redux';
import TabRouter from "../components/tab-router";
import {selectTab, getTabs, selectedTab, removeTab} from "../reducer/tab-router";

export default connect(
    (state, props) => ({
        tabs: getTabs(() => state),
        selectedIndex: selectedTab(() => state)
    }),
    (dispatch, props) => ({
        onSelect: index => () => {
            dispatch(selectTab(index));
        },
        onClose: (index, path) => () => {
            dispatch(removeTab(index))
        }
    })
)(TabRouter);
