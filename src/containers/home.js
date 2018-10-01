import React, { Component } from 'react';
import { storage } from '../utils/firebase';
import './home.css';
import SignUp from './signUp';


const storageRef = storage.ref();

export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            isDownloaded: false
        }

        storageRef.child('images/SubjCRVCol.pdf').getDownloadURL().then(function (url) {
            // `url` is the download URL for 'images/stars.jpg'

            this.url = url;

            // Or inserted into an <img> element:
            var img = document.getElementById('myimg');
            img.src = url;
            this.setState({ isDownloaded: true });
        }).catch(function (error) {
            console.log(error)
        });
    }

    render() {
        if (this.state.isDownloaded) {
            return (
                <div className='frontPge'>
                </div>

            )
        } else {
            return (
                <div>
                    <SignUp className="sUp" />
                    <div className="green">
                        Use our app to reduce your plastic waste output in
                <span> 4 easy steps </span>
                    </div>  

                    <div class="items">
                        <div class="item">
                            <div> <img src='/static/imgs/basket.png' /></div>
                            <div>
                                <p>Once you register, we'll drop off a collection bin with instructions for recycling</p>
                                <div class="bar"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div><img src='/static/imgs/bottle.png'/></div>
                            <div>
                                <p>Collect plastic, glass, and aluminum cans and bottles until your basket is nearly full</p>
                                <div class="bar"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div><img src='/static/imgs/request.png'/></div>
                            <div>
                                <p>Using your online account, request a pickup and leave your basket outside on your assigned day</p>
                                <div class="bar"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div><img src='/static/imgs/funds.png'/></div>
                            <div>
                                <p>Divert plastic waste from dumps and raise money for great causes in Irvine</p>
                                <div class="bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

