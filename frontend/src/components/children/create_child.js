import React from "react";
import ChildBox from "./child_box";
import { Link } from 'react-router-dom';
import Multiselect from "multiselect-react-dropdown";
import "./create_child.css";

class CreateChild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            parents: [],
            errors: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.renderParentsOptions = this.renderParentsOptions.bind(this);
        this.handleActions = this.handleActions.bind(this);

    }

    componentDidMount() {
      this.props.fetchVolunteers()
        .then(() => this.props.removeChildErrors())
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ errors: nextProps.errors });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.renderErrors()
        let child = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            birthday: this.state.birthday,
            parents: this.state.parents
        };

        this.props.makeChild(child)
            .then(() => this.props.fetchChildren());
        this.setState({
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            parents: [],
            errors: {}
        });
    }

    renderErrors() {
      return(
        <ul>
          {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>{this.state.errors[error]}</li>
          ))}
        </ul>
      )
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    renderParentsOptions() {
      let options = Object.values(this.props.volunteers);
      options.forEach(volunteer => {
        volunteer.fullName = volunteer.firstName + " " + volunteer.lastName;
      })
      return options;
    }

    handleActions(parents) {
      this.setState({
        parents: []
      });

      parents.forEach(parent => {
        this.setState({
          parents: this.state.parents.concat([parent._id]),
        });
      });
      console.log(this.state.parents);
    }

    render() {
        const options= Object.values(this.props.volunteers);
        return (
          <div className="new-child-form-container">
            <form onSubmit={this.handleSubmit} className="new-child-form">
              <div className="new-child-form-inputs">
                <br />
                <div className="new-child-group">
                  <div className="new-child-firstname">
                    <label className="new-child-label">First Name</label>
                    <label className="child-error">
                      {this.state.errors["firstName"]}
                    </label>
                    <br />
                    <input
                      className="new-child-input"
                      type="text"
                      value={this.state.firstName}
                      onChange={this.update("firstName")}
                      placeholder="First name"
                    />
                  </div>
                  <div className="new-child-lastName">
                    <label className="new-child-label">Last Name</label>
                    <label className="child-error">
                      {this.state.errors["lastName"]}
                    </label>
                    <br />
                    <input
                      className="new-child-input"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.update("lastName")}
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <br />
                <div className="new-child-group">
                  <label className="new-child-label">Gender</label>
                  <label className="child-error">
                    {this.state.errors["gender"]}
                  </label>
                  <br />
                  <input
                    className="new-child-input"
                    type="text"
                    value={this.state.gender}
                    onChange={this.update("gender")}
                    placeholder="Child's gender"
                  />
                </div>
                <br />
                <div className="new-child-group">
                  <label className="new-child-label">Birthday</label>
                  <label className="child-error">
                    {this.state.errors["birthday"]}
                  </label>
                  <br />
                  <input
                    className="new-child-input"
                    type="date"
                    value={this.state.birthday}
                    onChange={this.update("birthday")}
                    placeholder="Birthday"
                  />
                </div>
                <div className="new-child-group">
                  <label className="new-child-label">Parents</label>
                  <label className="error">{this.state.errors["parents"]}</label>
                  <br />
                  <Multiselect
                    displayValue="fullName"
                    onKeyPressFn={function noRefCheck() {}}
                    onRemove={(value) => this.handleActions(value)}
                    onSearch={function noRefCheck() {}}
                    onSelect={(value) => this.handleActions(value)}
                    options={this.renderParentsOptions()}
                    selectionLimit={2}
                  />
                </div>
                <br />
                <input className="submit-button" type="submit" value="submit" />
                <input
                  className="submit-button"
                  type="submit"
                  value="cancel"
                  onClick={() => this.props.closeModal()}
                />
              </div>
            </form>
          </div>
        );
    }
}

export default CreateChild;