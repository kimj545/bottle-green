import React, {Component} from 'react';
import {firestore, firebase} from '../utils/firebase';

export default class UserHome extends Component {
    constructor(props) {
        super(props);


        this.state = {
            userUid: this.props.userUid,

        }
    }

    sortDocument(collection) {
        let d = new Date();
        let today = (d.getFullYear()) + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
        let dates = [];

        firestore.collection(collection).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.completed) {
                    dates.push(doc);
                }
            });
        });

        this.setState({dates});
    }

    getDoc(collection) { 
        firestore.collection(collection).doc(this.state.user.uid).get()
          .then(doc => {

          })
          .catch(err => {
              console.log('Error getting document', err);
        });
    }


    render() {
        return (
            <div>
                <h1>Get your Bottles Picked Up</h1>
                <div>Next Available Date:</div>
                {}
            </div>
        )
    }
}

