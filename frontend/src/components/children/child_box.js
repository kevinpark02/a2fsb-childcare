import React from 'react';

class ChildBox extends React.Component {
    render() {
        return(
            <div>
                <h3>{this.props.firstName}</h3>
            </div>
        );
    }
}

export default ChildBox;
