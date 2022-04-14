import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import "./signup-form.css"

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      gender: "",
      phone: "",
      email: "",
      password: "",
      password2: "",
      registrationCode: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    {this.renderErrors()}
    let user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        phone: this.state.phone,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        registrationCode: this.state.registrationCode,
    };

    this.props.signup(user, this.props.history);
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

  render() {
    return (
      <div className="signup-form-container">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="signup-form">
            <br />
            <div className="signup-group">
              <div className="signup-firstName">
                <label className="signup-label">
                  First Name
                </label>
                <label className="error">{this.state.errors["firstName"]}</label>
                <br/>
              <input
                className="signup-input"
                type="text"
                value={this.state.firstName}
                onChange={this.update("firstName")}
                placeholder="First name"
              />
              </div>
              <div className="signup-lastName">
                <label className="signup-label">
                  Last Name
                </label>
                <label className="error">{this.state.errors["lastName"]}</label>
                <br/>
              <input
                className="signup-input"
                type="text"
                value={this.state.lastName}
                onChange={this.update("lastName")}
                placeholder="Last name"
              />
              </div>
            </div>
            {/* <br />
            <div className="signup-group">
              <label className="signup-label">
                Gender
              </label>
              <label className="error">{this.state.errors["gender"]}</label>
              <br/>
            <input
              className="signup-input"
              type="text"
              value={this.state.gender}
              onChange={this.update("gender")}
              placeholder="Gender"
            />
            </div> */}
            <br />
            <div className="signup-group">
              <label className="signup-label">
                Phone
              </label>
              <label className="error">{this.state.errors["phone"]}</label>
              <br/>
            <input
              className="signup-input"
              type="text"
              value={this.state.phone}
              onChange={this.update("phone")}
              placeholder="Phone"
            />
            </div>
            <br />
            <div className="signup-group">
              <label className="signup-label">
                Email
              </label>
              <label className="error">{this.state.errors["email"]}</label>
              <br/>
            <input
              className="signup-input"
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            </div>
            <br />
            <div className="signup-group">
              <label className="signup-label">
                Password
              </label>
              <label className="error">{this.state.errors["password"]}</label>
              <br/>
            <input
              className="signup-input"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            </div>
            <br />
            <div className="signup-group">
              <label className="signup-label">
                Confirm Password
              </label>
              <label className="error">{this.state.errors["password2"]}</label>
              <br/>
            <input
              className="signup-input"
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
            />
            </div>
            <br />
            <div className="signup-group">
              <label className="signup-label">
                Registration Code
              </label>
              <label className="error">{this.state.errors["registrationCode"]}</label>
              <br/>
            <input
              className="signup-input"
              type="text"
              value={this.state.registrationCode}
              onChange={this.update("registrationCode")}
              placeholder="Enter the registration code"
            />
            </div>
            <br />
            <input className="submit-button" type="submit" value="Submit" />
            <Link to={"/"}>
                <button className="submit-button">
                  Cancel
                </button>
              </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
