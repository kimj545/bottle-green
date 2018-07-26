import React, {Component} from 'react';
import {firebase, firestore} from '../utils/firebase';
import {Link} from 'react-router-dom';

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
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
    
          this.setState({
            loginError: errorMessage
          })
        });
    }

    render() {
        return (
            <div >
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

                    <button> Sign up </button>
                </form>

                <div>{this.state.errMsg}</div>

                <Link to="/login">Already have an account? Log In</Link>
            </div>
        )
    }
}