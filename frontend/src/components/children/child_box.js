import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';

class ChildBox extends React.Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
      e.preventDefault();
      this.props.openModal('editChild', this.props.child._id);
    }
    
    render() {
        const child = this.props.child
        console.log(child)
        if(!child){
            return null
        }
        let profilePic;
        let name = this.props.child.firstName + " " + this.props.child.lastName
        if(!child.photoUrl){
            profilePic = <Avatar className="child-profile-pic-default" fgColor="#F7F0DE" round="true" name={name} />
        } else {
            profilePic = <img className="child-profile-pic" src={`api/images/${child.photoUrl}`}></img>
        }
        return (
          <Link onClick={this.handleClick}>
            <div className="child-link">
              {profilePic}
              <button className="children-index">
                <p>{this.props.firstName}</p>
                <p>{this.props.lastName}</p>
              </button>
            </div>
          </Link>
        );
    }
}

export default withRouter(ChildBox);
