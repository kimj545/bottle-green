// import react, firebase, and react router
import React, { Component } from 'react';
import { firebase, firestore } from './utils/firebase';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';

// import container
import Login from './containers/logIn';
import SignUp from './containers/signUp';
import Home from './containers/home';
import History from './containers/history';
import About from './containers/about';
import UserHome from './containers/userHome';
import UserProfile from './containers/userProfile';
import AboutUs from './containers/aboutUs';

// import components
import NavBar from './components/navBar';
import NavBarSignedIn from './components/navBarSignedIn';
import Footer from './components/footers';

// import css
import './App.css';

const DEFAULTSTATE = {
  user: undefined,
  errorMsg: undefined,
  personalInfo: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      errorMsg: undefined,
      personalInfo: {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
      }
    };

    // bind all the functions
    this.getDoc = this.getDoc.bind(this);
    this.trySignOut = this.trySignOut.bind(this);
    this.userProfilePageRedirect = this.userProfilePageRedirect.bind(this);

    // firebase check if user signed in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        this.getDoc();
        this.props.history.push('/');
      }
    });
  }

  // firebase add user info to data if first time signed in
  getDoc() {
    firestore
      .collection('users')
      .doc(this.state.user.uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');

          firestore
            .collection('users')
            .doc(this.state.user.uid)
            .set({
              email: this.state.user.email,
              firstName: this.state.personalInfo.firstName,
              lastName: this.state.personalInfo.lastName,
              phone: this.state.personalInfo.phone,
              address: this.state.personalInfo.address,
              city: this.state.personalInfo.city,
              zip: this.state.personalInfo.zip
            })
            .then(function() {
              console.log('Document successfully written!');
            })
            .catch(function(error) {
              console.error('Error writing document: ', error);
            });
        } else {
          console.log('Document data:', doc.data());
        }

        this.setState({ personalInfo: doc.data() });
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  // redirect to Home Page (NOT WORKING AS OF NOW)
  redirectToHome() {
    this.props.history.push('/');
  }

  userProfilePageRedirect() {
    return (
      <UserProfile
        userUid={this.state.user.uid}
        email={this.state.personalInfo.email}
        firstName={this.state.personalInfo.firstName}
        lastName={this.state.personalInfo.lastName}
        phone={this.state.personalInfo.phone}
        address={this.state.personalInfo.address}
        city={this.state.personalInfo.city}
        zip={this.state.personalInfo.zip}
      />
    );
  }

  // sign out the user
  trySignOut() {
    firebase.auth().signOut().then(() => {
        console.log('Signed Out');
        this.redirectToHome();
        this.setState({ user: undefined });
      },
      function(error) {
        console.error('Sign Out Error', error);
      }
    );
  }

  render() {
    if (this.state.user === undefined) {
      return (
        <Router >
          <div className="frontApp">
            <NavBar />
            <section className="topSection">
              <div>
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <Login
                      loggedIn={user => {
                        this.setState({ user });
                      }}
                    />
                  )}
                />

                <Route exact path="/about" component={About} />
                <Route exact path="/" component={Home} />

                <Route exact path="/aboutus" component={AboutUs} />
              </div>
            </section>

            <div className="footer">
              <span> </span>{' '}
              <a href="mailto:BottleGreen930@gmail.com">
                BottleGreen930@gmail.com
              </a>
              <div> 949-533-1196</div>
              <div> Terms </div>
              <div> Policy </div>
            </div>
          </div>
        </Router>
      );
    } else {
      return (
        <Router >
          <div className="wrapper">
            <NavBarSignedIn trySignOut={this.trySignOut} />

            <div className="main">
              <Route exact path="/history" component={History} />
              <Route exact path="/about" component={About} />
              <Route exact path="/"render={() => <UserHome userUid={this.state.user.uid} />}/>
              <Route exact path="/profile" render={this.userProfilePageRedirect}/>
              <Route exact path="/aboutus" component={AboutUs} />
            </div>

            <div className="footer">
              <span />{' '}
              <a href="mailto:BottleGreen930@gmail.com">
                BottleGreen930@gmail.com
              </a>
              <div>949-533-1196</div>
              <div> Terms </div>
              <div> Policy </div>
            </div>
          </div>
        </Router>
      );
    }
  }
}

export default App;
