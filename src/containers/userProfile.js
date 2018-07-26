import React, {Component} from 'react';
import {firebase, firestore} from '../utils/firebase';

export default class UserProfile extends Component {
    constructor(props) {
        super();


        this.state = {
            props,
            atChangeProfile: false,
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            city: "",
            zip: "",
            personalInfo: []
        }
        console.log(this.props)
    }

    componentWillReceiveProps({props}) {
        this.setState({...this.state,props})
    }

    tryUpdateInfo() {
        firestore.collection("users").doc(this.state.props.userUid).set({
            
        }, {merge: true})
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    render() {

        if (!this.state.atChangeProfile) {
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

                    <button onClick={() => {this.setState({atChangeProfile: true})}}>changeProfile</button>
                </div>
            )
        } else {
            return (
                <div>
                    <form onSubmit = {event => {
                event.preventDefault();
                let personalInfo = {};

                if (this.state.email != "") {
                    personalInfo.email = this.state.email;
                }
                if (this.state.firstName != "") {
                    personalInfo.firstName = this.state.firstName;
                }
                if (this.state.lastName != "") {
                    personalInfo.lastName = this.state.lastName;
                }
                if (this.state.phone != "") {
                    personalInfo.phone = this.state.phone;
                }
                if (this.state.address != "") {
                    personalInfo.address = this.state.address;
                }
                if (this.state.city != "") {
                    personalInfo.city = this.state.city;
                }
                if (this.state.zip != "") {
                    personalInfo.zip = this.state.zip;
                }

                console.log(personalInfo);

                this.setState({personalInfo});


                this.tryUpdateInfo();
                }}>
                    <div>
                        <label>Email</label>
                        <input type = "text" name="email" value={this.state.email} onChange={this.handleChangeEvent}/>
                    </div>

                    <div>
                        <label>Password</label>
                        <input type = "password" name="password" value = {this.state.password} onChange = {this.handleChangeEvent}/>
                    </div>

                    <div>
                        <label>First Name</label>
                        <input type = "text" name="firstName" value={this.state.firstName} onChange={this.handleChangeEvent}/>
                    </div>

                    <div>
                        <label>Last Name</label>
                        <input type = "text" name="lastName" value={this.state.lastName} onChange={this.handleChangeEvent}/>
                    </div>

                    <div>
                        <label>Phone number</label>
                        <input type = "text" name="phone" value={this.state.phone} onChange={this.handleChangeEvent}/>
                    </div>

                    <div>
                        <label>Home Address</label>
                        <input type = "text" name="address" value={this.state.address} onChange={this.handleChangeEvent}/>
                    </div>

                    <div>
                        <label>City</label>
                        <input type = "text" name="city" value={this.state.city} onChange={this.handleChangeEvent}/>
                    </div>
                    
                    <div>
                        <label>Zip Code</label>
                        <input type = "text" name="zip" value={this.state.zip} onChange={this.handleChangeEvent}/>
                    </div>

                    <button> change Profile </button>
                </form>

                <button onClick={() => {this.setState({atChangeProfile: false})}}>go Back to Profile</button>
                </div>
            )
        }
    }
}