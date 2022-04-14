import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faBaby, faHand, faDoorOpen } from "@fortawesome/free-solid-svg-icons";


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
    const calendarIcon = <FontAwesomeIcon icon={faCalendar} className="navbar-menu-link navbar-menu-icon"/>;
    const childrenIcon = <FontAwesomeIcon icon={faBaby} className="navbar-menu-link navbar-menu-icon"/>;
    const volunteersIcon = <FontAwesomeIcon icon={faHand} className="navbar-menu-link navbar-menu-icon"/>;
    const logoutIcon = <FontAwesomeIcon icon={faDoorOpen} className="navbar-menu-link navbar-menu-icon"/>;

    if (this.props.loggedIn) {
      return (
        <div className="navbar-container">          
          <Link to={"/calendar"} className="navbar-menu-link">
            {calendarIcon}
            calendar
          </Link>
          <Link to={"/children"} className="navbar-menu-link">
            {childrenIcon}
            children
          </Link>
          <Link to={"/volunteers"} className="navbar-menu-link">
            {volunteersIcon}
            volunteers
          </Link>
          <button onClick={this.logoutUser}>
            {logoutIcon}log out
          </button>
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
