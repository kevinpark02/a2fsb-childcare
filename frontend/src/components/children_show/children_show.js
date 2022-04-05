import React from "react";
import { useRef } from 'react';
import { withRouter } from "react-router-dom";

class ChildrenShow extends React.Component {
    constructor(props){
        super(props)

    }

    componentDidMount() {
        this.props.fetchChildren();
    }



    render(){
        const children = this.props.children
        const child = children.find(child => child._id === this.props.childId);
        console.log(child)

        // const inputRef = useRef();
        // const triggerFileSelectPopup = () => inputRef.current.click();

        if (children.length === 0) {
            return null
        } else {
            return (
                <div>
                    <img></img>
                    {child.firstName} {" "} {child.lastName}
                    <br></br>
                    {child.gender}
                    <br></br>
                    <input type="file" accept='image/*'/>
                    {/* <button>Upload Profile Picture</button> */}

                </div>
            )
        }
    }
}

export default withRouter(ChildrenShow);