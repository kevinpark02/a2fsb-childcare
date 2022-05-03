import React from "react";
import { useRef } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { editChild, removeChild } from "../../actions/child_actions";
import Multiselect from "multiselect-react-dropdown";

class ChildrenShow extends React.Component {
    constructor(props){
        super(props)
        const children = this.props.children;
        const child = children.find(child => child._id === this.props.childId);
        this.state = {
            firstName: child.firstName,
            lastName: child.lastName,
            gender: child.gender,
            birthday: child.birthday,
            parents: child.parents,
            _id: child._id,
            errors: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchChildren();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.editChild(this.state)
            .then(this.props.fetchChildren());
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleDelete(id){
        this.props.removeChild(id)
            .then(() => this.props.history.push(`/children`));
    }

    render(){
        const children = this.props.children;
        const child = children.find(child => child._id === this.props.childId);
        const childId = this.props.childId;

        if (children.length === 0) {
            return null
        } else {
            return (
              // <div>
              //     <form onSubmit={(e) => this.handleSubmit(e)}>
              //         <img></img>
              //             <input type="text"
              //                     value={this.state.firstName}
              //                     onChange={this.update("firstName")}
              //                     placeholder="First Name"
              //             />
              //             <input type="text"
              //                     value={this.state.lastName}
              //                     onChange={this.update("lastName")}
              //                     placeholder="Last Name"
              //             />
              //             <input type="text"
              //                     value={this.state.gender}
              //                     onChange={this.update("gender")}
              //                     placeholder="Gender"
              //             />
              //             <input type="submit"
              //             value="Submit"/>
              //     </form>
              //     <input type="file" accept='image/*'/>
              //     <br></br>
              //     <button className="" onClick={() => this.handleDelete(childId)}>Delete</button>
              // </div>
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
                    {/* <div className="new-child-group">
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
                    <br /> */}
                    <input
                      className="submit-button"
                      type="submit"
                      value="submit"
                    />
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