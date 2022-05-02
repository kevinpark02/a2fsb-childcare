import { connect } from 'react-redux';
import { fetchChildren } from '../../actions/child_actions';
import Children from './children';
import { openModal } from '../../actions/modal_actions';


const mSTP = state => ({
    children: Object.values(state.children.all) 
});

const mDTP = dispatch => ({
    fetchChildren: () => dispatch(fetchChildren()),
    openModal: (modal, childId) => dispatch(openModal(modal, childId)),
  });

export default connect(mSTP, mDTP)(Children);