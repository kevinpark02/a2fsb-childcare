import React from "react";
import ChildBox from "./child_box";
import { Link } from 'react-router-dom';
import "./create_child.css";

class CreateChild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            parents: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let child = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            parents: [this.props.currentUser.id]
        };

        this.props.makeChild(child)
            .then(() => this.props.fetchChildren());
        this.setState({
            firstName: "",
            lastName: "",
            gender: "",
            parents: []
        });
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    render() {
        return (
          <div className="new-child-form-container">
            <form onSubmit={this.handleSubmit}>
              <div className="new-child-form">
                <br />
                <div className="new-child-group">
                  <div className="new-child-firstname">
                    <label className="new-child-label">First Name</label>
                    {/* This is where error will render */}
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
                    {/* This is where error will render */}
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
                  {/* This is where error will render */}
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
                  {/* This is where error will render */}
                  <br />
                  <input
                    className="new-child-input"
                    type="text"
                    value={this.state.gender}
                    onChange={this.update("birthday")}
                    placeholder="Birthday"
                  />
                </div>
                <div className="new-child-group">
                  <label className="new-child-label">Parents</label>
                  {/* This is where error will render */}
                  <br />
                  <input
                    className="new-child-input"
                    type="text"
                    value={this.state.gender}
                    onChange={this.update("parents")}
                    placeholder="Parents"
                  />
                </div>
                <br />
                <input className="submit-button" type="submit" value="submit" />
                <Link to={"/children"}>
                  <button className="submit-button">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        );
    }
}

export default CreateChild;