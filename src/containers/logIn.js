import React, {Component} from 'react';
import {firebase} from '../utils/firebase';
import {Link} from "react-router-dom";
import './logIn.css';

export default class Login extends Component {
    constructor(props) {

        super(props);

        this.state = {
            email: "",
            password: "",
            errMsg: "",
        };
        
        this.tryLogin = this.tryLogin.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    tryLogin() {

        console.log(this.state.email + " " + this.state.password);
    
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(user => {
              this.props.loggedIn(user);
          })
          .catch(err => {
            this.setState({errMsg: err.message})
          })
    }

    handleChangeEvent(event) {    
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="logIn" >
                <form onSubmit = {event => {
                event.preventDefault();
                this.tryLogin();
                }}>
                    <label>Email</label>
                    <input type = "text" name="email" value={this.state.email} onChange={this.handleChangeEvent}/>

                    <label>Password</label>
                    <input type = "password" name="password" value = {this.state.password} onChange = {this.handleChangeEvent}/>

                    <div>{this.state.errMsg}</div>
                    <button> Log In </button>
                </form>

                <Link to="/signup">Dont have an account? Sign Up</Link>
            </div>
        )
    }
}