import {connect} from 'react-redux';
import TabRouter from "../components/tab-router";
import {selectTab, getTabs, selectedTab, removeTab} from "../reducer/tab-router";
import {push} from 'react-router-redux';

export default connect(
    (state, props) => ({
        tabs: getTabs(() => state),
        selectedIndex: selectedTab(() => state)
    }),
    (dispatch, props) => ({
        onSelect: index => () => {
            console.log("Selecting tab");
            dispatch(selectTab(index));
        },
        //TODO:  Update URL when removing a tab
        onClose: (index, path) => () => {
            console.log("Closing tab");
            dispatch(removeTab(index))
            //dispatch(push(path));
        }
    })
)(TabRouter);
