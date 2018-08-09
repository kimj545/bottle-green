import React, {Component} from 'react';
import {firestore, firebase} from '../utils/firebase';

export default class UserHome extends Component {
    constructor(props) {
        super(props);


        this.state = {
            userUid: this.props.userUid,
            dates: [],
            loading: true,
            index: 0,
        }

        this.sortDocument = this.sortDocument.bind(this);
        this.tryPutData = this.tryPutData.bind(this);
    }

    tryPutData() {

        let temp = [];

        firestore.collection("pickUpBottles").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.data().users.forEach((a) => {
                    temp.push(a);

                    if (this.state.userUid == a) {
                        return;
                        console.log("working");
                    }
                });
            });
        });
        
        temp.push(this.state.userUid);


        let a = (this.state.dates[this.state.index]).toString();
        console.log(temp);


        firestore.collection("pickUpBottles").doc(a).set({
            users: temp
        }, {merge: true})
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    componentDidMount() {
        let d = new Date();
        let dates = [];

        firestore.collection("pickUpBottles").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (!doc.completed) {
                    if (doc.data().time )
                    d = doc.data().time.toDate();
                    let day = (d.getFullYear()) + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
                    dates.push(day);
                }
            });

            console.log(dates);
        });

        this.sortDocument("pickUpBottles");
    }

    sortDocument(collection) {
        let d = new Date();
        let dates = [];

        firestore.collection(collection).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (!doc.completed) {
                    d = doc.data().time.toDate();
                    let day = (d.getFullYear()) + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
                    dates.push(day);
                }
            });

            console.log(dates);
        });

        this.setState({dates, loading: false});
    }


    render() {
        if (this.state.loading) {
            return (
                <div>loading</div>
            )
        }
        else {
            return (
                <div>
                    <h1>Get your Bottles Picked Up</h1>
                    <div>Next Available Date:</div>
                    <div>
                        <div>{this.state.dates[this.state.index]}</div>
                        <button onClick={() => {
                            if (0 != this.state.index) {
                                let index = this.state.index;
                                this.setState({index: index - 1});
                            }
                        }}>Date Before</button>
                        <span></span>
                        <button onClick={() => {
                            if (this.state.dates.length-1 != this.state.index) {
                                let index = this.state.index;
                                this.setState({index: index + 1});
                                
                            }
                        }}>Date After</button>

                        <button onClick={ () => {this.tryPutData()}}>Sign up for this Date</button>
                    </div>
                </div>
            )
        }
    }
}

