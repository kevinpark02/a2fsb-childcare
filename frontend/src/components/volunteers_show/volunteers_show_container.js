import { connect } from "react-redux";

import { fetchVolunteers, removeVolunteer, editVolunteer } from '../../actions/volunteer_actions';
import { removeVolunteerErrors } from '../../actions/volunteer_actions';
import { closeModal } from "../../actions/modal_actions";

import VolunteersShow from './volunteers_show';

const mSTP = (state, ownProps) => {
    return {
        volunteerId: ownProps.volunteerId,
        volunteers: Object.values(state.volunteers.all),
        errors: state.error.volunteer,
    }
};

const mDTP = dispatch => ({
    fetchVolunteers: () => dispatch(fetchVolunteers()),
    editVolunteer: (volunteer) => dispatch(editVolunteer(volunteer)),
    removeVolunteer:(volunteerId) => dispatch(removeVolunteer(volunteerId)),
    closeModal: () => dispatch(closeModal()),
    removeVolunteerErrors: () => dispatch(removeVolunteerErrors()),
 });

 export default connect(mSTP, mDTP)(VolunteersShow);