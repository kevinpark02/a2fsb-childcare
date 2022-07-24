import { connect } from 'react-redux';
import { fetchPhotos } from '../../actions/photo_actions';
import { fetchVolunteers, makeVolunteer, removeVolunteer, removeVolunteerErrors } from '../../actions/volunteer_actions';
import { fetchVolunteers } from '../../actions/volunteer_actions';

import CreateVolunteer from './create_volunteer';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.user,
        newVolunteer: state.volunteers.new,
        errors: state.error.volunnteer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeVolunteer: data => dispatch(makeVolunteer(data)),
        fetchVolunteers: () => dispatch(fetchVolunteers()),
        removeVolunteerErrors: () => dispatch(removeVolunteerErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVolunteer);
