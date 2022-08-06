import React from "react";
import { withRouter } from "react-router-dom";
import VolunteerBox from "./volunteer_box";
import { Link } from 'react-router-dom';

import "./volunteers.css";

class Volunteers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volunteers: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchVolunteers();
        this.props.fetchPhotos();
    }

    handleClick(e) {
        e.preventDefault();
        this.props.openModal('newVolunteer');
    }
    
    render() {
        const volunteers = this.props.volunteers
        const volunteersIndex = volunteers.map( volunteer => {
                return(
                    <div>
                        <VolunteerBox key={volunteer._id} 
                                  volunteer ={volunteer}
                                  firstName={volunteer.firstName} 
                                  lastName={volunteer.lastName}
                                  openModal={this.props.openModal}/>
                    </div>
                )
        })

        if (volunteers.length === 0) {
            return (
              <div className="all-volunteers-wrapper">
                <h2 className="volunteers-title">Volunteers</h2>
                <div className="volunteers-container">
                  <Link onClick={this.handleClick} 
                        className="add-volunteer-button">
                    +
                  </Link>
                </div>
              </div>
            );
        } else {
            return (
              <div className="all-volunteers-wrapper">
                <h2 className="volunteers-title">Volunteers</h2>
                <div className="volunteers-container">
                  {volunteersIndex}
                  <Link onClick={this.handleClick} 
                        className="add-volunteer-button">
                    +
                  </Link>
                </div>
              </div>
            );
        }
    }
}

export default withRouter(Volunteers);