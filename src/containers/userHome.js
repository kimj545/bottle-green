import React, { Component } from 'react';
import { firestore, firebase } from '../utils/firebase';
import './userHome.css';
// import {} from '../components/calendar';

export default class UserHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userUid: this.props.userUid,
      dates: [],
      loading: false,
      index: 0
    };

    let d = new Date();
    d.setDate(d.getDate() + ((10 - d.getDay()) % 7)); // pick the next "wednesday"
    this.state.dates.push(this.formatDate(d));
    // add 4 more wednesdays
    for (let i = 0; i < 4; i++) {
      d.setDate(d.getDate() + 7);
      this.state.dates.push(this.formatDate(d));
    }

    // this.sortDocument = this.sortDocument.bind(this);
    this.tryPutData = this.tryPutData.bind(this);
  }

  formatDate(d) {
    return (
      d.getFullYear() +
      '/' +
      (d.getMonth() + 1 < 10 ? '0' : '') +
      (d.getMonth() + 1) +
      '/' +
      d.getDate()
    );
  }

  tryDeleteData() {
    let temp = [];

    firestore
      .collection('pickUpBottles')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.data().users.forEach(a => {
            if (!(this.state.userUid == a)) {
              temp.push(a);
            }
          });
        });
      });

    console.log(temp);
    let a = this.state.dates[this.state.index].toString();

    firestore
      .collection('pickUpBottles')
      .doc(a)
      .set(
        {
          users: temp
        },
        { merge: true }
      )
      .then(function() {
        console.log('Document successfully written!');
        alert('you are now not signed up for this date');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  }

  tryPutData() {
    let temp = [];

    firestore
      .collection('pickUpBottles')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.data().users.forEach(a => {
            temp.push(a);

            if (this.state.userUid == a) {
              return;
              console.log('working');
            }
          });
        });
      });

    temp.push(this.state.userUid);

    let a = this.state.dates[this.state.index].toString();
    console.log(temp);

    firestore
      .collection('pickUpBottles')
      .doc(a)
      .set(
        {
          users: temp
        },
        { merge: true }
      )
      .then(function() {
        console.log('Document successfully written!');
        alert('you are now signed up for this date');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  }

  componentDidMount() {}

  // sortDocument(collection) {
  //   let d = new Date();
  //   let dates = [];

  //   firestore
  //     .collection(collection)
  //     .get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         if (!doc.completed) {
  //           d = doc.data().time.toDate();
  //           let day =
  //             d.getFullYear() +
  //             '' +
  //             ('0' + (d.getMonth() + 1)).slice(-2) +
  //             '' +
  //             ('0' + d.getDate()).slice(-2);
  //           dates.push(day);
  //         }
  //       });

  //       console.log(dates);
  //     });

  //   this.setState({ dates, loading: false });
  // }

  render() {
    if (this.state.loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="userHome">
          <h1 className="header">Get your Bottles Picked Up</h1>
          <div className="Next">Next Available Date:</div>
          <div className="but">
            <div className="Dates">{this.state.dates[this.state.index]}</div>

            <button
              className="dBefore"
              onClick={() => {
                if (0 != this.state.index) {
                  let index = this.state.index;
                  this.setState({ index: index - 1 });
                }
              }}>
              Date Before
            </button>

            <span />

            <button
              className="dAfter"
              onClick={() => {
                if (this.state.dates.length - 1 != this.state.index) {
                  let index = this.state.index;
                  this.setState({ index: index + 1 });
                }
              }}>
              Date After
            </button>

            <button
              onClick={() => {
                this.tryPutData();
              }}>
              Sign up for this Date
            </button>

            <button
              onClick={() => {
                this.tryDeleteData();
              }}>
              Cancel Sign up for this Date
            </button>
          </div>
        </div>
      );
    }
  }
}
