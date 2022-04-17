import React from "react";
import ChildBox from "./child_box";

class CreateChild extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            gender: "",
            parents: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let child = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            parents: [this.props.currentUser.id]
        };

        this.props.makeChild(child)
            .then(() => this.props.fetchChildren());
        this.setState({
            firstName: "",
            lastName: "",
            gender: "",
            parents: []
        });
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text"
                            value={this.state.firstName}
                            onChange={this.update("firstName")}
                            placeholder="Child's first name"
                        />
                        <input type="text"
                            value={this.state.lastName}
                            onChange={this.update("lastName")}
                            placeholder="Child's last name"
                        />
                        <input type="text"
                            value={this.state.gender}
                            onChange={this.update("gender")}
                            placeholder="Child's gender"
                        />
                        <input type="submit"
                            value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateChild;