import React, {Component} from 'react';
import './navBarSignedIn.css';
import {BrowserRouter as Router} from 'react-router-dom';

const NavBarSignedIn = ( {trySignOut} ) => {

    return (
        <Router>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="../">Bottle Green</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/history">History</a>
                        </li>
                        
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>

                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Profile
                        </a>
                        <div className="dropdown-menu" id="bootstrap-overrides" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/profile">My Profile</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" onClick = {trySignOut}>sign out</a>
                        </div>
                    </div>

                    
                </div>
            </nav>
    </div>
    </Router>
    )
}

export default NavBarSignedIn;