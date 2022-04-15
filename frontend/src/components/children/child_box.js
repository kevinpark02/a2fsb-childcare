import React from 'react';
import { Link } from 'react-router-dom';

class ChildBox extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const child = this.props.child
        return (
          <Link to={`/children/${child._id}`}>
            <div className="child-link">
              <div className="child-temp-pic"></div>
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
