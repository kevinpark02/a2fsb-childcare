import React from "react";
import VolunteerBox from "./volunteer_box";
import { withRouter, Link  } from "react-router-dom";
import { uploadPhoto } from '../../util/photo_api_util';
import Multiselect from "multiselect-react-dropdown";
import "./create_volunteer.css";

class CreateVolunteer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            status: "",
            phone: "",
            email: "",
            photoId: "",
            photoUrl: "",
            photoFile: null,
            errors: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);

        this.handlePhotoFile = this.handlePhotoFile.bind(this);
        
        // did not include renderParentOptions, handleSelect, handleRemove
        // since we do not seem to need those options
    }

    componentDidMount() {
        this.props.fetchVolunteers()
            .then(() => this.props.removeVolunteerErrors());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ errors: nextProps.errors });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.renderErrors()

        if(this.state.photoFile) {
            const data = new FormData(e.target);
            data.append("file", this.state.photoFile);
            uploadPhoto(data).then(res => {
              let volunteer = {
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  gender: this.state.gender,
                  status: this.state.status,
                  phone: this.state.phone,
                  email: this.state.email,
                  photoId: res.data.photoId,
                  photoUrl: res.data.imagePath,
              };
              this.props.makeVolunteer(volunteer)
                .then(() => this.props.fetchVolunteers())
            });
        } else {
            let volunteer = {
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  gender: this.state.gender,
                  status: this.state.status,
                  phone: this.state.phone,
                  email: this.state.email,
                  photoId: this.state.photoId,
                  photoUrl: this.state.photoUrl,
              };
              this.props.makeVolunteer(volunteer)
                .then(() => this.props.fetchVolunteers())
        }

        if (this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.gender !== "" &&
            this.state.status !== "" &&
            this.state.phone !== "" &&
            this.state.email.length > 0) {
              this.props.fetchVolunteers()
                .then(() => this.props.closeModal())
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
        return (
            <div className="new-volunteer-form-container">
            <form onSubmit={this.handleSubmit} className="new-volunteer-form">
              <div className="new-volunteer-form-inputs">
                <br />
                <div className="new-volunteer-group">
                  <div className="new-volunteer-firstname">
                    <label className="new-volunteer-label">First Name</label>
                    <label className="volunteer-error">
                      {this.state.errors["firstName"]}
                    </label>
                    <br />
                    <input
                      className="new-volunteer-input"
                      type="text"
                      value={this.state.firstName}
                      onChange={this.update("firstName")}
                      placeholder="First name"
                    />
                  </div>
                  <div className="new-volunteer-lastName">
                    <label className="new-volunteer-label">Last Name</label>
                    <label className="volunteer-error">
                      {this.state.errors["lastName"]}
                    </label>
                    <br />
                    <input
                      className="new-volunteer-input"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.update("lastName")}
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <br />
                <div className="new-volunteer-group">
                  <label className="new-volunteer-label">Gender</label>
                  <label className="volunteer-error">
                    {this.state.errors["gender"]}
                  </label>
                  <br />
                  <select 
                    className="new-volunteer-input"
                    value ={this.state.gender}
                    onChange={this.update('gender')}
                    placeholder="Please Select Gender"
                  >
                    <option value="" disabled selected>Select volunteer's gender</option>
                    <option value="Male">Male</option>
                    <option valeu="Female">Female</option>
                  </select>
                </div>
                <br />
                <div className="new-volunteer-group">
                  <label className="new-volunteer-label">Status</label>
                  <label className="volunteer-error">
                    {this.state.errors["status"]}
                  </label>
                  <br />
                  <select 
                    className="new-volunteer-input"
                    value ={this.state.status}
                    onChange={this.update('status')}
                    placeholder="Please Select Status"
                  >
                    <option value="" disabled selected>Select volunteer's status</option>
                    <option value="Single">Single</option>
                    <option valeu="Married">Married</option>
                  </select>
                </div>

                <br />
                <div className="new-volunteer-group">
                  <div className="new-volunteer-firstname">
                    <label className="new-volunteer-label">Phone</label>
                    <label className="volunteer-error">
                      {this.state.errors["phone"]}
                    </label>
                    <br />
                    <input
                      className="new-volunteer-input"
                      type="text"
                      value={this.state.phone}
                      onChange={this.update("phone")}
                      placeholder="(XXX)XXX-XXXX"
                    />
                  </div>
                </div>

                <br />
                <div className="new-volunteer-group">
                  <div className="new-volunteer-firstname">
                    <label className="new-volunteer-label">Email</label>
                    <label className="volunteer-error">
                      {this.state.errors["email"]}
                    </label>
                    <br />
                    <input
                      className="new-volunteer-input"
                      type="text"
                      value={this.state.email}
                      onChange={this.update("email")}
                      placeholder="placeholder123@gmail.com"
                    />
                  </div>
                </div>

                <br />
                <div className="new-volunteer-group">
                  <label className="new-volunteer-label">Upload Profile Picture</label>
                  <br />
                  <input
                    className="new-volunteer-input"
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

export default withRouter(CreateVolunteer);