import { connect } from 'react-redux';

import { fetchChildren, removeChild, editChild } from '../../actions/child_actions';
import { fetchVolunteers } from '../../actions/volunteer_actions';
import { removeChildErrors } from '../../actions/child_actions';
import { closeModal } from "../../actions/modal_actions";

import ChildrenShow from './children_show';


const mSTP = (state, ownProps) => {
    debugger
    return {
        childId: ownProps.childId,
        children: Object.values(state.children.all),
        volunteers: state.volunteers,
        errors: state.error.child,
    }
};

const mDTP = dispatch => ({
    fetchChildren: () => dispatch(fetchChildren()),
    editChild: (child) => dispatch(editChild(child)),
    removeChild:(childId) => dispatch(removeChild(childId)),
    closeModal: () => dispatch(closeModal()),
    fetchVolunteers: () => dispatch(fetchVolunteers()),
    removeChildErrors: () => dispatch(removeChildErrors()),
 });

export default connect(mSTP, mDTP)(ChildrenShow);