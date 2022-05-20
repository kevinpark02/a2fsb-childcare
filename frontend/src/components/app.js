import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import ChildrenContainer from "./children/children_container";
import ProfileContainer from "./profile/profile_container";
import NewChildContainer from "./children/new_child_container";
import ChildrenShowContainer from "./children_show/children_show_container";
import CalendarContainer from "./calendar/calendar_container";
import NewEventContainer from "./calendar/new_event_container";
import Modal from "../modal/modal";

import "./app.css"

const App = () => (
  <div>
    <Modal/>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/children" component={ChildrenContainer} />
      <ProtectedRoute exact path="/children" component={NewChildContainer} />
      <ProtectedRoute exact path="/children" component={ChildrenShowContainer} />
      {/* <ProtectedRoute exact path="/children" component={Modal} /> */}

      <ProtectedRoute exact path="/calendar" component={CalendarContainer} />
      <ProtectedRoute exact path="/calendar" component={NewEventContainer} />
      {/* <ProtectedRoute exact path="/calendar" component={Modal} /> */}

      
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />

    </Switch>
  </div>
);

export default App;
