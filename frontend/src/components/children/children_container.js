import { connect } from 'react-redux';
import { fetchChildren } from '../../actions/child_actions';
import Children from './children';


const mSTP = state => ({
    children: Object.values(state.children) 
});

const mDTP = dispatch => ({
    fetchChildren: () => dispatch(fetchChildren())
  });

export default connect(mSTP, mDTP)(Children);