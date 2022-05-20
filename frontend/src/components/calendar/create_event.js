import React from 'react';
import { withRouter } from 'react-router-dom';
import "../children/children.css"

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: "",
            setupTime: "",
            startTime: "",
            endTime: "",
            children: [],
            volunteers: [],
            chef: [],
            errors: {}
        }
    }

    render() {
        return (
            <div className="new-child-form-container">This will be the event form</div>
        )
    }
}

export default withRouter(CreateEvent);