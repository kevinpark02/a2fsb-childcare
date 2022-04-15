import React from "react";
import { withRouter } from "react-router-dom";
import ChildBox from "./child_box";

import "./children.css";


class Children extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children: []
        }
    }

    componentDidMount() {
        this.props.fetchChildren();
        // console.log(this.state)
    }
    
    // componentWillReceiverProps(newState) {
    //     this.setState({ children: newState.children });
    // }

    render() {
        const children = this.props.children
        console.log(children[0])

        const childrenIndex = children.map( child => {
                return(
                    <div>
                        <ChildBox key={child._id} 
                                  child = {child} 
                                  firstName={child.firstName} 
                                  lastName={child.lastName}/>
                    </div>
                )
        })

        if (children.length === 0) {
            return (
                <div>There are no children</div>
            )
        } else {
            return (
                <div className="all-children-wrapper">
                    <h2 className="children-title">All Children</h2>
                    <div className="children-container">
                        {childrenIndex}
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(Children);