import { connect } from 'react-redux';
import { fetchVolunteers } from '../../actions/volunteer_actions';
import Volunteers from './volunteers';
import { openModal } from '../../actions/modal_actions';
import { fetchPhotos } from '../../actions/photo_actions';

const mSTP = state => ({
    volunteers: Object.values(state.volunteers.all)
});

const mDTP = dispatch => ({
    fetchVolunteers: () => dispatch(fetchVolunteers()),
    fetchPhotos: () => dispatch(fetchPhotos()),
    openModal: (modal, volunteerId) => dispatch(openModal(modal, volunteerId)),
});

export default connect(mSTP, mDTP)(Volunteers);