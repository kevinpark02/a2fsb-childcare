import { connect } from 'react-redux';
import Calendar from "./calendar";
import { openModal } from "../../actions/modal_actions";
import { fetchEvents } from "../../actions/event_actions";

const mSTP = state => ({
    events: state.events
});

const mDTP = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
    fetchEvents: () => dispatch(fetchEvents()),

});

export default connect(mSTP, mDTP)(Calendar);