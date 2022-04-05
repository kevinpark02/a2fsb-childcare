import React from "react";
import { withRouter } from "react-router-dom";

class ChildrenShow extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                Hi
            </div>
        )
    }
}

export default withRouter(ChildrenShow);