import React, {Component} from 'react';
import {firebase, firestore} from '../utils/firebase';
import {Link} from 'react-router-dom';
import './signUp.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            city: "",
            zip: "",
            errMsg: ""
        }

        this.trySignup = this.trySignup.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);

    }

    handleChangeEvent(event) {    
        this.setState({[event.target.name]: event.target.value});
    }

    trySignup() {

        if (this.state.firstName == "" || this.state.lastName == "" || this.state.address == "" || this.state.zip == "") {
            this.setState({errMsg: "please fill out all the fields"});
            return;
        } else if (this.state.firstName != (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)    ) {
            this.setState({errMsg: "the phone number if invalid"});
            return;
        } else if (this.state.city != "irvine" || this.state.city != "Irvine") {
            this.setState({errMsg: "As of Right Now, we only allow cities from Irvine. Please input 'Irvine' for the city field"});
            return;
        }  
        
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
    
          this.setState({
            errMsg: errorMessage
          })
        });
    }

    render() {
        return (
            <div className="sign-Up" >
                <form onSubmit = {event => {
                event.preventDefault();
                this.trySignup();
                let personalInfo = {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phone: this.state.phone,
                    address: this.state.address,
                    city: this.state.city,
                    zip: this.state.zip
                }
                this.props.signedUp(personalInfo);
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

                    <div>
                        <label>Number of </label>
                        <input type = "text" name="zip" value={this.state.zip} onChange={this.handleChangeEvent}/>
                    </div>

                    <button> Sign up </button>
                </form>

                <div>{this.state.errMsg}</div>

                <Link to="/login">Already have an account? Log In</Link>
            </div>
        )
    }
}