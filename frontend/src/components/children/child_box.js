import React from 'react';
import { Link } from 'react-router-dom';

class ChildBox extends React.Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const child = this.props.child
        return(
            <div>
                <Link to={`/children/${child._id}`}><button className="">{this.props.firstName + " " + this.props.lastName}</button></Link>
            </div>
        );
    }
}

export default ChildBox;
