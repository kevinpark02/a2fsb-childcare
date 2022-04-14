import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-container">
          <div>

          </div>
          <FontAwesomeIcon icon={solid("user-secret")} />
          <Link to={"/calendar"} className="navbar-menu-link">
            calendar
          </Link>
          <Link to={"/children"} className="navbar-menu-link">
            children
          </Link>
          <Link to={"/volunteers"} className="navbar-menu-link">
            volunteers
          </Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
