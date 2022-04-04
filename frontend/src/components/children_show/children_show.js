import React from "react";
import { withRouter } from "react-router-dom";

class ChildrenShow extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.fetchChildren();
    }

    render(){
        console.log(this.props.childId)
        console.log(this.props.children)
        const children = this.props.children
        const child = children.find(child => child._id === this.props.childId);
        console.log(child)
        if (children.length === 0) {
            return null
        } else {
            return (
                <div>
                    <img></img>
                    {child.firstName} {" "} {child.lastName}
                </div>
            )
        }
    }
}

export default withRouter(ChildrenShow);