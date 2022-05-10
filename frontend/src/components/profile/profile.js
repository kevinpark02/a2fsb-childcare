import React from 'react';
import ChildBox from '../children/child_box';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            children: []
        }
    }

    componentWillMount() {
        this.props.fetchUserChildren(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({ children: newState.children });
    }

    render() {
        if (this.state.children.length === 0) {
            return (
                <div>This user has no children</div>
            )
        } else {
            return (
                <div>
                    <h2>All of This User's Children</h2>
                    {this.state.children.map(child => (
                        <ChildBox key={child._id} firsName={child.firstname} />
                    ))}
                </div>
            );
        }
    }
}

export default Profile;