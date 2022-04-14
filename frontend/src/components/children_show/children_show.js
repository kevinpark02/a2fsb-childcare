import React from "react";
import { useRef } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { editChild, removeChild } from "../../actions/child_actions";

class ChildrenShow extends React.Component {
    constructor(props){
        super(props)
        const children = this.props.children;
        const child = children.find(child => child._id === this.props.childId);
        this.state = {
            firstName: child.firstName,
            lastName: child.lastName,
            gender: child.gender,
            _id: child._id,
            parents: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchChildren();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.editChild(this.state)
            .then(() => this.props.history.push(`/children`));
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleDelete(id){
        this.props.removeChild(id)
            .then(() => this.props.history.push(`/children`));
    }

    render(){
        const children = this.props.children;
        const child = children.find(child => child._id === this.props.childId);
        const childId = this.props.childId;
        console.log(child);

        // const inputRef = useRef();
        // const triggerFileSelectPopup = () => inputRef.current.click();

        if (children.length === 0) {
            return null
        } else {
            return (
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <img></img>
                            <input type="text"
                                    value={this.state.firstName}
                                    onChange={this.update("firstName")}
                                    placeholder="First Name"
                            />
                            <input type="text"
                                    value={this.state.lastName}
                                    onChange={this.update("lastName")}
                                    placeholder="Last Name"
                            />
                            <input type="text"
                                    value={this.state.gender}
                                    onChange={this.update("gender")}
                                    placeholder="Gender"
                            />
                            <input type="submit"
                            value="Submit"/>
                    </form>
                    {/*child.firstName} {" "} {child.lastName*/}
                    {/* <br></br> */}
                    {/*child.gender*/}
                    {/* <br></br> */}
                    <input type="file" accept='image/*'/>
                    {/* <button>Upload Profile Picture</button> */}
                    <br></br>
                    <button className="" onClick={() => this.handleDelete(childId)}>Delete</button>
                </div>
            )
        }
    }
}

export default withRouter(ChildrenShow);