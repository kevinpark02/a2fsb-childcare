import React from "react";
import { withRouter } from "react-router-dom";
import ChildBox from "./child_box";


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
                    <ChildBox key={child._id} firstName={child.firstName} lastName={child.lastName}/>
                    // <div>{child.firstname}</div>
                )
        })

        if (children.length === 0) {
            return (
                <div>There are no children</div>
            )
        } else {
            return (
                <div>
                    <h2>All Children</h2>
                    {childrenIndex}
                </div>
            )
        }
    }
}

export default withRouter(Children);