import React from "react";
import { useRef } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { editChild, removeChild } from "../../actions/child_actions";
import Multiselect from "multiselect-react-dropdown";

class ChildrenShow extends React.Component {
  constructor(props) {
    super(props);
    const children = this.props.children;
    const child = children.find((child) => child._id === this.props.childId);
    debugger
    this.state = {
      firstName: child.firstName,
      lastName: child.lastName,
      gender: child.gender,
      birthday: child.birthday,
      parents: child.parents,
      _id: child._id,
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderParentsOptions = this.renderParentsOptions.bind(this);
    this.renderExistingParentsOptions = this.renderExistingParentsOptions.bind(this);
  }

  componentDidMount() {
    this.props.fetchVolunteers();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editChild(this.state).then(() => this.props.fetchChildren());
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  renderParentsOptions() {
    let options = Object.values(this.props.volunteers);
    options.forEach((volunteer) => {
      volunteer.fullName = volunteer.firstName + " " + volunteer.lastName
    });
    return options;
  }

  renderExistingParentsOptions() {
      debugger
      let existingOptions = [];
      const parents = this.state.parents;
      const volunteers = this.props.volunteers;

      if (Object.values(volunteers).length === 0) {
          return existingOptions;
      } else {
          parents.forEach(parent => {
            existingOptions.push(volunteers[parent])
          })
    
          existingOptions.forEach(parent => {
              parent.fullName = parent.firstName + " " + parent.lastName
          });
    
          return existingOptions;
      }

  }

  handleDelete(id) {
    this.props.removeChild(id).then(() => this.props.history.push(`/children`))
  }

  handleSelect(parents) {
    this.setState({
      parents: [],
    });

    parents.forEach((parent) => {
      this.setState({
        parents: this.state.parents.concat([parent._id]),
      });
    });
  }

  handleRemove(parents) {
    // because I'm limiting it to two selections, parents will either be an empty array
    // or it will have one parent
    if (parents.length === 0) {
      this.setState({
        parents: [],
      });
    } else {
      if (this.state.parents.indexOf(parents[0]._id) === 0) {
        this.setState({
          parents: this.state.parents.splice(0, 1),
        });
      } else {
        this.setState({
          parents: this.state.parents.splice(1),
        });
      }
    }
  }

  render() {
    const children = this.props.children;
    const child = children.find((child) => child._id === this.props.childId);
    const childId = this.props.childId;

    if (children.length === 0) {
      return null;
    } else {
      return (
        <div className="new-child-form-container">
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            className="new-child-form"
          >
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
                <select
                  className="new-child-input"
                  value={this.state.gender}
                  onChange={this.update("gender")}
                  placeholder="Please Select Gender"
                >
                  <option value="" disabled selected>
                    Select child's gender
                  </option>
                  <option value="Male">Male</option>
                  <option valeu="Female">Female</option>
                </select>
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
              <br />
              <div className="new-child-group">
                <label className="new-child-label">Parents</label>
                <label className="child-error">
                  {this.state.errors["parents"]}
                </label>
                <br />
                <Multiselect
                  displayValue="fullName"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={(value) => this.handleRemove(value)}
                  onSearch={function noRefCheck() {}}
                  onSelect={(value) => this.handleSelect(value)}
                  options={this.renderParentsOptions()}
                  selectedValues={this.renderExistingParentsOptions()}
                  selectionLimit={2}
                  closeIcon="close"
                  style={{
                    chips: {
                      background: "#f7f0de",
                      color: "black",
                    },
                    closeIcon: {
                      color: "red",
                      background: "red",
                    },
                    searchBox: {
                      "border-radius": "8px",
                      border: "none",
                      "background-color": "#c4c4c4",
                      height: "50px;",
                      margin: "none",
                    },
                  }}
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
              <input
                className="submit-button"
                type="submit"
                value="delete"
                onClick={() => this.handleDelete(childId)}
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(ChildrenShow);