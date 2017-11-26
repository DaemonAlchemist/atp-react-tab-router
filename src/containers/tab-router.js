import {connect} from 'react-redux';
import TabRouter from "../components/tab-router";
import {getTabs} from "../reducer/tab-router";

export default connect(
    (state, props) => ({
        tabs: getTabs(() => state)
    }),
    (dispatch, props) => ({
        onClick:
    })
)(TabRouter);
