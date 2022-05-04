import React from 'react';
import { Link } from 'react-router-dom';

class ChildBox extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const child = this.props.child
        // console.log(child)
        if(!child){
            return null
        }
        return (
          <Link to={`/children/${child._id}`}>
            <div className="child-link">
              {/* <div className="child-temp-pic"></div> */}
              <img className="child-profile-pic" src={`api/images/${child.photoUrl}`}></img>
              <button className="children-index">
                <p>{this.props.firstName}</p>
                <p>{this.props.lastName}</p>
              </button>
            </div>
          </Link>
        );
    }
}

export default ChildBox;
