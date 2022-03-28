import { connect } from 'react-redux';
import { fetchChildren } from '../../actions/child_actions';
import Children from './children';

const mapStateToProps = (state) => {
    return {
        children: Object.values(state.children.all) 
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchChildren: () => dispatch(fetchChildren)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Children);