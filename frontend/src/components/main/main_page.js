import React from "react";
import { Link } from "react-router-dom";
import "./main_page.css"

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page">
        <h1>Seedling<br></br>Scheduling</h1>
        <div>
          <Link to={"/signup"}>
            <button className="main-button" onClick={"/signup"}>
              sign up
            </button>
          </Link>
          <br></br>
          <Link to={"/login"}>
            <button className="main-button" onClick={"/login"}>
              log in
            </button>
          </Link>
          </div>
      </div>
    );
  }
}

export default MainPage;
