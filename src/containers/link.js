import {connect} from 'react-redux';
import Link from "../components/link";
import {push} from 'react-router-redux';

export default connect(
    (state, props) => ({

    }),
    (dispatch, props) => ({
        onClick: event => {
            //TODO:  Update tab panel links
            console.log("Tab router link click handler");
            console.log(props);
            //dispatch(push(props.to));
        }
    })
)(Link);
