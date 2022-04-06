import { connect } from 'react-redux';

import { fetchChildren, removeChild } from '../../actions/child_actions';

import ChildrenShow from './children_show';


const mSTP = (state, ownProps) => ({
    childId: ownProps.match.params.id,
    children: Object.values(state.children.all)
    
});

const mDTP = dispatch => ({
    fetchChildren: () => dispatch(fetchChildren())
});

export default connect(mSTP, mDTP)(ChildrenShow);