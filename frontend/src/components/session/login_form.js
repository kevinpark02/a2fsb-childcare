import React from "react";
import { withRouter, Link } from "react-router-dom";

import "./login_form.css"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/children");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    {this.renderErrors()}
    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
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
    console.log(this.state.errors);
    return (
      <div className="login-form-container">
        <h1 className="login-title">Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="login-group">
              <label className="login-label">
                Email
              </label>
              <label className="error">{this.state.errors["email"]}</label>
              <br/>
              <input
                className="login-input"
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
            </div>
            <br />
            <div className="login-group">
              <label className="login-label">
                Password
              </label>
              <label className="error">{this.state.errors["password"]}</label>
              <br/>
              <input
                className="login-input"
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
            </div>
            <br />
            <div className="button-area">
              <input className="submit-button" type="submit" value="Log in" />
              <Link to={"/"}>
                <button className="submit-button">
                  Cancel
                </button>
              </Link>
            </div>
            
            
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
