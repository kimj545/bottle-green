import React, {Component} from 'react';

export default class UserProfile extends Component {
    constructor(props) {
        super();


        this.state = {props}
        console.log(this.props)
    }

    componentWillReceiveProps({props}) {
        this.setState({...this.state,props})
      }

    render() {
        return (
            <div>
                hi
                <div>Email: {this.props.email}</div>
                <div>First Name: {this.props.firstName}</div>
                <div>Last Name: {this.props.lastName}</div>
                <div>Phone: {this.props.phone}</div>
                <div>Address: {this.props.address}</div>
                <div>City: {this.props.city}</div>
                <div>Zip: {this.props.zip}</div>
            </div>
        )
    }
}