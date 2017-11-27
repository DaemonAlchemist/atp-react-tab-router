import {connect} from 'react-redux';
import Link from "../components/link";
import {addTab, replaceTab} from '../reducer/tab-router';
import {o} from 'atp-sugar';

export default connect(
    (state, props) => ({

    }),
    (dispatch, props) => ({
        onClick: event => {
            console.log("Tab router link click handler");
            console.log(props);
            dispatch(o(props.target).switch({
                new: () => addTab({label: props.label, path: props.to}),
                replace: () => replaceTab(props.index, {label: props.label, path: props.to}),
                default: () => {
                    throw "Invalid tab router link target.  Expected one of [new|replace].  Got " + props.target
                }
            }))
        }
    })
)(Link);
