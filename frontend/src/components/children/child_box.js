import React from 'react';

class ChildBox extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return(
            <div>
                <h3>{this.props.firstName + " " + this.props.lastName}</h3>
            </div>
        );
    }
}

export default ChildBox;
