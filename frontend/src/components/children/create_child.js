import React from "react";
import ChildBox from "./child_box";
import { Link } from 'react-router-dom';
import { uploadPhoto } from '../../util/photo_api_util';
import "./create_child.css";

class CreateChild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            parents: [],
            photoId: "",
            photoUrl: "",
            photoFile: null,
            errors: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.handlePhotoFile = this.handlePhotoFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ errors: nextProps.errors });
    }

    handleSubmit(e) {
        e.preventDefault();
        {this.renderErrors()}

        if(this.state.photoFile) {
            const data = new FormData(e.target);
            data.append("file", this.state.photoFile);
            uploadPhoto(data).then(res => {
              let child = {
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  gender: this.state.gender,
                  birthday: this.state.birthday,
                  parents: [this.props.currentUser.id],
                  photoId: res.data.newData.photoId,
                  photoUrl: res.data.newData.Location,
              };
              this.props.makeChild(child, this.props.history);
              //     .then(() => this.props.fetchChildren());
              //     this.setState({
              //         firstName: "",
              //         lastName: "",
              //         gender: "",
              //         birthday: "",
              //         photoId: "",
              //         photoUrl: "",
              //         photoFile: null,
              //         parents: []
              //     });
            });
        } else {
            let child = {
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  gender: this.state.gender,
                  birthday: this.state.birthday,
                  parents: [this.props.currentUser.id],
                  photoId: this.state.photoId,
                  photoUrl: this.state.photoUrl,
              };
              this.props.makeChild(child, this.props.history);
        }
    }

    handlePhotoFile(e) {
        e.preventDefault();
        this.setState({
          photoFile: e.target.files[0]
        })
  }

    renderErrors() {
      return(
        <ul>
          {Object.keys(this.state.errors).map((error, i) => (
            <li key={`error-${i}`}>{this.state.errors[error]}</li>
          ))}
        </ul>
      )
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    render() {
      console.log(this.state)
        return (
          <div className="new-child-form-container">
            <form onSubmit={this.handleSubmit} className="new-child-form">
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
                      placeholder="First name"
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
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <br />
                <div className="new-child-group">
                  <label className="new-child-label">Gender</label>
                  <label className="child-error">{this.state.errors["gender"]}</label>
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
                <div className="new-child-group">
                  <label className="new-child-label">Parents</label>
                  {/* <label className="error">{this.state.errors["firstName"]}</label> */}
                  <br />
                  <input
                    className="new-child-input"
                    type="text"
                    value={this.state.parents}
                    onChange={this.update("parents")}
                    placeholder="Parents"
                  />
                </div>
                <br />
                <div className="new-child-group">
                  <label className="new-child-label">Upload Profile Picture</label>
                  {/* <label className="child-error">
                    {this.state.errors["birthday"]}
                  </label> */}
                  <br />
                  <input
                    className="new-child-input"
                    type="file"
                    name=""
                    id=""
                    onChange={this.handlePhotoFile}
                  />
                </div>
                <input className="submit-button" type="submit" value="submit" />
                <input
                  className="submit-button"
                  type="submit"
                  value="cancel"
                  onClick={() => this.props.closeModal()}
                />
              </div>
            </form>
          </div>
        );
    }
}

export default CreateChild;