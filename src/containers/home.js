import React, {Component} from 'react';
import {storage} from '../utils/firebase';

const storageRef = storage.ref();

export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            isDownloaded: false
        }

        storageRef.child('images/SubjCRVCol.pdf').getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'
    
            this.url = url;
          
            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;
            this.setState({isDownloaded: true});
        }).catch(function(error) {
            console.log(error)
        });
    }

    render() {
        if (this.state.isDownloaded) {
            return (
                <div>
                    <h1>Home page Quote</h1>
                    <img src="url" alt="aww" width="42" height="42" />

                </div>
            )
        } else {
            return (
                <div>
                    <h1>Home page Quote</h1>
                    <div>loading image</div>

                </div>
            )
        }
    }
    
}

