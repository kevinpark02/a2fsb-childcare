import { connect } from 'react-redux';
import { makeChild } from '../../actions/child_actions';
import CreateChild from './create_child';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newChild: state.children.new
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeChild: data => dispatch(makeChild(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChild);
