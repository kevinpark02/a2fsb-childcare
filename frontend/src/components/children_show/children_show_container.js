import { connect } from 'react-redux';

import { fetchChildren, removeChild, editChild } from '../../actions/child_actions';
import { openModal } from '../../actions/modal_actions';

import ChildrenShow from './children_show';


const mSTP = (state, ownProps) => ({
    childId: ownProps.match.params.id,
    children: Object.values(state.children.all)
    
});

const mDTP = dispatch => ({
    fetchChildren: () => dispatch(fetchChildren()),
    editChild: (child) => dispatch(editChild(child)),
    removeChild:(childId) => dispatch(removeChild(childId)),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mSTP, mDTP)(ChildrenShow);