import React from "react";
import { withRouter } from "react-router-dom";
import ChildBox from "./child_box";
import { Link } from 'react-router-dom';

import "./children.css";


class Children extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children: []
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchChildren();
    }

    handleClick(e) {
        e.preventDefault();
        this.props.openModal('newChild');
    }
    
    render() {
        const children = this.props.children
        const childrenIndex = children.map( child => {
                return(
                    <div>
                        <ChildBox key={child._id} 
                                  child ={child} 
                                  firstName={child.firstName} 
                                  lastName={child.lastName}/>
                    </div>
                )
        })

        if (children.length === 0) {
            return (
              <div className="all-children-wrapper">
                <h2 className="children-title">Children</h2>
                <div className="children-container">
                  <Link onClick={this.handleClick} 
                        className="add-child-button">
                    +
                  </Link>
                </div>
              </div>
            );
        } else {
            return (
              <div className="all-children-wrapper">
                <h2 className="children-title">Children</h2>
                <div className="children-container">
                  {childrenIndex}
                  <Link onClick={this.handleClick} 
                        className="add-child-button">
                    +
                  </Link>
                </div>
              </div>
            );
        }
    }
}

export default withRouter(Children);