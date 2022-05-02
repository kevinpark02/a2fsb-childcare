import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChildBox extends React.Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(childId) {
      // e.preventDefault();
      this.props.openModal('editChild', childId);
      debugger
    }
    
    render() {
      debugger
        const child = this.props.child
        return (
          <Link onClick={() => this.handleClick(child._id)}>
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

export default withRouter(ChildBox);
