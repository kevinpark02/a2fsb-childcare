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

    componentWillMount() {
        this.props.fetchChildren();
    }

    componentWillReceiverProps(newState) {
        this.setState({ children: newState.children });
    }

    render() {
        if (this.state.children.length === 0) {
            return (
                <div>There are no children</div>
            )
        } else {
            return (
                <div>
                    <h2>All Children</h2>
                    {this.state.children.map(child => (
                        <ChildBox key={child._id} firstName={child.firstname}/>
                    ))}
                </div>
            )
        }
    }
}

export default withRouter(Children);