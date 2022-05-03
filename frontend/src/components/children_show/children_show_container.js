import { connect } from 'react-redux';

import { fetchChildren, removeChild, editChild } from '../../actions/child_actions';
import { closeModal } from "../../actions/modal_actions";

import ChildrenShow from './children_show';


const mSTP = (state, ownProps) => {
    return {
        childId: ownProps.childId,
        children: Object.values(state.children.all)
    }
};

const mDTP = dispatch => ({
    fetchChildren: () => dispatch(fetchChildren()),
    editChild: (child) => dispatch(editChild(child)),
    removeChild:(childId) => dispatch(removeChild(childId)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(ChildrenShow);