import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';

class VolunteerBox extends React.Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.openModal('editVolunteer', this.props.volunteer._id);
    }

    render() {
        const volunteer = this.props.volunteer
        if(!volunteer){
            return null
        }
        let profilePic;
        let name = this.props.volunteer.firstName + " " + this.props.volunteer.lastName
        if(!volunteer.photoUrl){
            profilePic = <Avatar className="volunteer-profile-pic-default" fgColor="#F7F0DE" round="true" name={name} />
        } else {
            profilePic = <img className="volunteer-profile-pic" src={`api/images/${volunteer.photoUrl}`}></img>
        }
        return (
          <Link onClick={this.handleClick}>
            <div className="volunteer-link">
              {profilePic}
              <button className="volunteerren-index">
                <p>{this.props.firstName}</p>
                <p>{this.props.lastName}</p>
              </button>
            </div>
          </Link>
        );
    }
}

export default withRouter(VolunteerBox);