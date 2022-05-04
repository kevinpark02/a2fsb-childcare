import { connect } from 'react-redux';
import { fetchChildren, makeChild } from '../../actions/child_actions';
import { fetchPhotos } from '../../actions/photo_actions';
import CreateChild from './create_child';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newChild: state.children.new,
        errors: state.error.child,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeChild: data => dispatch(makeChild(data)),
        fetchChildren: () => dispatch(fetchChildren()),
        // fetchPhotos: () => dispatch(fetchPhotos())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChild);
