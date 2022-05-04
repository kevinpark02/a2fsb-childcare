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
        console.log(name)
        if(!child.photoUrl){
            // AvatarGenerator.generate({ name: "Ameer Jhan", size: 64 }).then(avatar => {
            // profilePic = AvatarGenerator.writeAvatar(avatar, "./default-avatar.jpg");
            // });
            // profilePic = <Avatar facebookId="100008343750912" size="100" />
            profilePic = <Avatar fgColor="#F7F0DE" round="true" name={name} />
        } else {
            profilePic = <img className="child-profile-pic" src={`api/images/${child.photoUrl}`}></img>
        }
        return (
          <Link onClick={this.handleClick}>
            <div className="child-link">
              {/* <div className="child-temp-pic"></div> */}
              {/* <img className="child-profile-pic" src={profilePic}></img> */}
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
