import React from "react";
import { useRef } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { editVolunteer, removeVolunteer } from "../../actions/volunteer_actions";
import Multiselect from "multiselect-react-dropdown";

class VolunteerShow extends React.Componennt {
    constructor(props) {
        super(props);
        const volunteers = this.props.volunteers;
        const volunteer = volunteer.find((volunteer) => volunteer._id == this.props.volunteerId);
        this.state = {
            firstName: volunteer.firstName,
            lastName: volunteer.lastName,
            gender: volunteer.gender,
            status: volunteer.status,
            phone: volunteer.phone,
            email: volunteer.email,
            _id: volunteer._id,
            errors: {},
        };
    }
        
    componentDidMount() {
        this.props.fetchVolunteers().then(() => this.props.removeVolunteerErrors());
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ errors: nextProps.errors });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.renderErrors();
    
        this.props.editVolunteer(this.state).then(() => this.props.fetchVolunteers());
    
        if (
            this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.gender !== "" &&
            this.state.status !== "" &&
            this.state.phone !== "" &&
            this.state.email !== ""
        ) {
            this.props.fetchVolunteers().then(() => this.props.closeModal());
        }
    }


    update(field) {
        return (e) => this.setState({ [field]: e.target.value });
    }

    renderErrors() {
        return (
        <ul>
            {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>{this.state.errors[error]}</li>
            ))}
        </ul>
        );
    }


    handleDelete(id) {
        this.props.removeVolunteer(id).then(() => this.props.closeModal());
    }

    render() {
        const volunteers = this.props.volunteers;
        const volunteer = volunteers.find((volunteer) => volunteer._id === this.props.volunteerId);
        const volunteerId = this.prps.volunteerId;

        if (volunteers.length === 0) {
            return null;
        } else {
            return (
                <div className="new-volunteer-form-container">
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            className="new-volunteer-form"
          >
            <div className="new-volunteer-form-inputs">
              <br />
              <div className="new-volunteer-group">
                <div className="new-volunteer-firstname">
                  <label className="new-volunteer-label">First Name</label>
                  <label className="volunteer-error">
                    {this.state.errors["firstName"]}
                  </label>
                  <br />
                  <input
                    className="new-volunteer-input"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.update("firstName")}
                  />
                </div>
                <div className="new-volunteer-lastName">
                  <label className="new-volunteer-label">Last Name</label>
                  <label className="volunteer-error">
                    {this.state.errors["lastName"]}
                  </label>
                  <br />
                  <input
                    className="new-volunteer-input"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.update("lastName")}
                  />
                </div>
              </div>
              <br />
              <div className="new-volunteer-group">
                <label className="new-volunteer-label">Gender</label>
                <label className="volunteer-error">
                  {this.state.errors["gender"]}
                </label>
                <br />
                <select
                  className="new-volunteer-input"
                  value={this.state.gender}
                  onChange={this.update("gender")}
                  placeholder="Please Select Gender"
                >
                  <option value="" disabled selected>
                    Select volunteer's gender
                  </option>
                  <option value="Male">Male</option>
                  <option valeu="Female">Female</option>
                </select>
              </div>
                <br />
                <div className="new-volunteer-group">
                  <label className="new-volunteer-label">Status</label>
                  <label className="volunteer-error">
                    {this.state.errors["status"]}
                  </label>
                  <br />
                  <select 
                    className="new-volunteer-input"
                    value ={this.state.status}
                    onChange={this.update('status')}
                    placeholder="Please Select Status"
                  >
                    <option value="" disabled selected>Select volunteer's status</option>
                    <option value="Single">Single</option>
                    <option valeu="Married">Married</option>
                  </select>
                </div>

                <br />
                <div className="new-volunteer-group">
                  <div className="new-volunteer-firstname">
                    <label className="new-volunteer-label">Phone</label>
                    <label className="volunteer-error">
                      {this.state.errors["phone"]}
                    </label>
                    <br />
                    <input
                      className="new-volunteer-input"
                      type="text"
                      value={this.state.phone}
                      onChange={this.update("phone")}
                      placeholder="(XXX)XXX-XXXX"
                    />
                  </div>
                </div>

                <br />
                <div className="new-volunteer-group">
                  <div className="new-volunteer-firstname">
                    <label className="new-volunteer-label">Email</label>
                    <label className="volunteer-error">
                      {this.state.errors["email"]}
                    </label>
                    <br />
                    <input
                      className="new-volunteer-input"
                      type="text"
                      value={this.state.email}
                      onChange={this.update("email")}
                      placeholder="placeholder123@gmail.com"
                    />
                  </div>
                </div>
              <br />
              <input className="submit-button" type="submit" value="submit" />
              <input
                className="submit-button"
                type="submit"
                value="cancel"
                onClick={() => this.props.closeModal()}
              />
              <input
                className="submit-button"
                type="submit"
                value="delete"
                onClick={() => this.handleDelete(volunteerId)}
              />
            </div>
          </form>
        </div>
            );
        }
    }
}

export default withRouter(VolunteerShow);