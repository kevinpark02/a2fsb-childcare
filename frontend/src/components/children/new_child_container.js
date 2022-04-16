import { connect } from 'react-redux';
import { makeChild } from '../../actions/child_actions';
import CreateChild from './create_child';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newChild: state.children.new
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeChild: data => dispatch(makeChild(data)),
        openModal: modal => dispatch(openModal(modal)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChild);
