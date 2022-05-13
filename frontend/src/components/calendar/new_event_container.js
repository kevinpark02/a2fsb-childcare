import { connect } from 'react-redux';
import { fetchEvents, makeEvent, removeEventErrors } from "../../actions/event_actions";
import { fetchChildren } from "../../actions/child_actions";
import { fetchVolunteers } from '../../actions/volunteer_actions';

const mapStateToProps = (state) => {
    return {
        events: state.events,
        volunteers: state.volunteers,
        children: state.children.all,
        errors: state.error.child
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchEvents: () => dispatch(fetchEvents()),
        makeEvent: data => dispatch(makeEvent(data)),
        fetchChildren: () => dispatch(fetchChildren()),
        removeEventErrors: () => dispatch(removeEventErrors()),
        fetchVolunteers: () => dispatch(fetchVolunteers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);

