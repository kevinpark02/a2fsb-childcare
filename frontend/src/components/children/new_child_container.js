import { connect } from 'react-redux';
import { fetchPhotos } from '../../actions/photo_actions';
import { fetchChildren, makeChild, removeChild, removeChildErrors } from '../../actions/child_actions';
import { fetchVolunteers } from '../../actions/volunteer_actions';

import CreateChild from './create_child';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newChild: state.children.new,
        volunteers: state.volunteers,
        errors: state.error.child,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeChild: data => dispatch(makeChild(data)),
        fetchChildren: () => dispatch(fetchChildren()),
        fetchVolunteers: () => dispatch(fetchVolunteers()),
        removeChildErrors: () => dispatch(removeChildErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChild);
