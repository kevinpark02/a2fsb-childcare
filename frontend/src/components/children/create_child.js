import React from "react";
import ChildBox from "./child_box";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { uploadPhoto } from '../../util/photo_api_util';
import Multiselect from "multiselect-react-dropdown";
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

        this.renderParentsOptions = this.renderParentsOptions.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
      this.props.fetchVolunteers()
        .then(() => this.props.removeChildErrors());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ errors: nextProps.errors });
    }


    handleSubmit(e) {
        e.preventDefault();
        this.renderErrors()

        if(this.state.photoFile) {
            const data = new FormData(e.target);
            console.log(data)
            data.append("file", this.state.photoFile);
            uploadPhoto(data).then(res => {
              let child = {
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  gender: this.state.gender,
                  birthday: this.state.birthday,
                  parents: this.state.parents,
                  photoId: res.data.photoId,
                  photoUrl: res.data.imagePath,
              };
              this.props.makeChild(child)
                .then(() => this.props.fetchChildren())
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
              this.props.makeChild(child)
                .then(() => this.props.fetchChildren())
        }

        if (this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.gender !== "" &&
            this.state.birthday !== "" &&
            this.state.parents.length > 0) {
              this.props.fetchChildren()
                .then(() => this.props.closeModal())
            }
    }

    handlePhotoFile(e) {
        e.preventDefault();
        // console.log(this.state)
        this.setState({
          photoFile: e.target.files[0]
        })
        console.log(this.state)
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

    renderParentsOptions() {
      let options = Object.values(this.props.volunteers);
      options.forEach(volunteer => {
        volunteer.fullName = volunteer.firstName + " " + volunteer.lastName;
      })
      return options;
    }

    handleSelect(parents) {
      this.setState({
        parents: []
      });

      parents.forEach(parent => {
        this.setState({
          parents: this.state.parents.concat([parent._id]),
        });
      });
    }

    handleRemove(parents) {
      // because I'm limiting it to two selections, parents will either be an empty array
      // or it will have one parent
      if (parents.length === 0) {
        this.setState({
          parents: []
        })
      } else {
        if (this.state.parents.indexOf(parents[0]._id) === 0) {
          this.setState({
            parents: this.state.parents.splice(0,1)
          })
        } else {
          this.setState({
            parents: this.state.parents.splice(1)
          })
        }
      }
    }

    render() {
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
                  <label className="child-error">
                    {this.state.errors["gender"]}
                  </label>
                  <br />
                  <select 
                    className="new-child-input"
                    value ={this.state.gender}
                    onChange={this.update('gender')}
                    placeholder="Please Select Gender"
                  >
                    <option value="" disabled selected>Select child's gender</option>
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
                <div className="new-child-group">
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
                    closeIcon='close'
                    style={{
                      chips: {
                        background: "#f7f0de",
                        color: 'black',
                      },
                      closeIcon: {
                        color: 'red',
                        background: 'red'
                      },
                      searchBox: {
                        "border-radius": "8px",
                        border: "none",
                        "background-color": "#c4c4c4",
                        height: "50px;",
                        margin: 'none'
                      },
                    }}
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
                <div className="errors">{this.renderErrors()}</div>
                <input
                  className="submit-button"
                  type="submit"
                  value="cancel"
                  // onClick={() => this.props.closeModal()}
                />
              </div>
            </form>
          </div>
        );
    }
}

export default withRouter(CreateChild);