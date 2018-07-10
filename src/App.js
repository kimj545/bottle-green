
// import react, firebase, and react router
import React, { Component } from 'react';
import {firebase, firestore} from "./utils/firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import components
import Login from './components/logIn';
import SignUp from './components/signUp';
import Home from './components/home';
import History from './components/history';
import About from './components/about';
import UserHome from './components/userHome';

// import container(s)
import NavBar from "./containers/navBar";
import NavBarSignedIn from "./containers/navBarSignedIn";

// import css
import './App.css';

const DEFAULTSTATE = {
  user: undefined,
  errorMsg: undefined,
  personalInfo: {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  }
}


class App extends Component {
  constructor(props) {

    super(props);

    this.state = {
      DEFAULTSTATE
    }

    this.getDoc = this.getDoc.bind(this);
    this.trySignOut = this.trySignOut.bind(this);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user});
        this.getDoc();
      }

    });
  }

  getDoc() { 
    firestore.collection("users").doc(this.state.user.uid).get()
      .then(doc => {
          if (!doc.exists) {
              console.log('No such document!');

              firestore.collection("users").doc(this.state.user.uid).set({
                  email: this.state.user.email,
                  firstName: this.state.personalInfo.firstName,
                  lastName: this.state.personalInfo.lastName,
                  phone: this.state.personalInfo.phone,
                  address: this.state.personalInfo.address,
                  city: this.state.personalInfo.city,
                  zip: this.state.personalInfo.zip,
              })
              .then(function() {
                  console.log("Document successfully written!");
              })
              .catch(function(error) {
                  console.error("Error writing document: ", error);
              });
          } else {
              console.log('Document data:', doc.data());
          }
      })
      .catch(err => {
          console.log('Error getting document', err);
    });
  }

  trySignOut() {
    firebase.auth().signOut().then(() => {
      console.log('Signed Out');
      this.setState({user: undefined});
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
  
  render() {
    if (this.state.user == undefined) {
      return (
        <Router>
          <div>
            <NavBar />
              <div> 
                <Route exact path = "/login" render={() => <Login loggedIn = {(user) => {this.setState({user})}} />}/>
                <Route exact path = "/signup" render={() => <SignUp num="2" signedUp = {(personalInfo) => {this.setState({personalInfo})}}/>}  />
                <Route exact path = "/about" component = {About} />
                <Route exact path = "/" component = {Home} />
              </div>
              
          </div>
        </Router>
      )
    }

    else {
      return (
        <Router>
          <div>
            <NavBarSignedIn trySignOut = {this.trySignOut} />
            logged in

            <div>
              <Route exact path = "/history" component = {History}/>
              <Route exact path = "/about" component = {About} />
              <Route exact path = "/" component = {UserHome} />
            </div>
          </div>
        </Router>
        
      )
    }
  }
}

export default App;
