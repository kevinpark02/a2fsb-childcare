import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from "react-modal";
import Datetime from "react-datetime";
// import "path/to/node_modules/react-datetime/css/react-datetime.css";
import "../../../node_modules/react-datetime/css/react-datetime.css";
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
      errors: {},
    };

    this.update = this.update.bind(this);
    this.calUpdate = this.calUpdate.bind(this);

  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  calUpdate(date, type) {
      if (type === "setupTime") {
          this.setState({ ["setupTime"]: new Date(date._d)})
        } else if (type === "startTime") {
          this.setState({ ["startTime"]: new Date(date._d)})
        } else if (type === "endTime") {
          this.setState({ ["endTime"]: new Date(date._d)})
      }
  }

  render() {
      console.log(this.state)
    return (
      <div className="new-child-form-container">
        <form onSubmit={this.handleSubmit} className="new-child-form">
          <div className="new-child-form-inputs">
            <br />
            <div className="new-child-group">
              <label className="new-child-label">Event Name</label>
              <label className="child-error">
                {this.state.errors["eventName"]}
              </label>
              <br />
              <input
                className="new-child-input"
                value={this.state.eventName}
                onChange={this.update("eventName")}
                placeholder="Please Select Gender"
              />
            </div>
            <br />
            <div className="new-child-group">
              <label className="new-child-label">Setup Time</label>
              <label className="child-error">
                {this.state.errors["setupTime"]}
              </label>
              <br />
              <Datetime
                value={this.state.setupTime}
                onChange={(date) => this.calUpdate(date, "setupTime")}
              />
            </div>
            <br />
            <div className="new-child-group">
              <label className="new-child-label">Start Time</label>
              <label className="child-error">
                {this.state.errors["startTime"]}
              </label>
              <br />
              <Datetime
                value={this.state.startTime}
                onChange={(date) => this.calUpdate(date, "startTime")}
              />
            </div>
            <div className="new-child-group">
              <label className="new-child-label">End Time</label>
              <label className="child-error">
                {this.state.errors["endTime"]}
              </label>
              <br />
              <Datetime
                value={this.state.endTime}
                onChange={(date) => this.calUpdate(date, "endTime")}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateEvent);