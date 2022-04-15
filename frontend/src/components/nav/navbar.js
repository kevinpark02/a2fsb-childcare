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
    const calendarIcon = <FontAwesomeIcon icon={faCalendar} className="icon"/>;
    const childrenIcon = <FontAwesomeIcon icon={faBaby} className="icon"/>;
    const volunteersIcon = <FontAwesomeIcon icon={faHand} className="icon"/>;
    const logoutIcon = <FontAwesomeIcon icon={faDoorOpen} className="icon"/>;

    if (this.props.loggedIn) {
      return (
        <div className="sidebar">
          <ul className="link-list">
            <li className="calendar-link">
              <Link to={"/calendar"}>
                <span className="icon">{calendarIcon}</span>
                <span className="item">calendar</span>
              </Link>
            </li>
            <li className="children-link">
              <Link to={"/children"}>
                <span className="icon">{childrenIcon}</span>
                <span className="item">children</span>
              </Link>
            </li>
            <li className="volunteers-link">
              <Link to={"/volunteers"}>
                <span className="icon">{volunteersIcon}</span>
                <span className="item">volunteers</span>
              </Link>
            </li>
            <li className="logout-link">
              <Link onClick={this.logoutUser}>
                <span className="icon">{logoutIcon}</span>
                <span className="item">log out</span>
              </Link>
            </li>
          </ul>
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
