import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Graph from './Graph.js';

class App extends Component {
    
    constructor () {
        super()
        
        // Firebase
        const firebase = require("firebase");
        require("firebase/firestore");
        /*
        const functions = require("firebase-functions");
        console.log(functions.config());
        firebase.initializeApp({
           apiKey: functions.config().regression-on-sm-frontend.apikey,
           authDomain: functions.config().regression-on-sm-frontend.authdomain,
           projectId: functions.config().regression-on-sm-frontend.projectid
        });
        // Initialize Cloud Firestore through Firebase
        var db = firebase.firestore();
        // Disable deprecated features
        db.settings({timestampsInSnapshots: true});
        
        
        db.collection("temp").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
          });
        });*/

        this.state = {
            username: ''
        }
        this.handleClick = this.handleClick.bind(this)
    }
    
    firebaseAuth() {
        
    }
    
    handleClick () {
        axios.get('https://api.github.com/users/maecapozzi')
        .then(response => this.setState({username: response.data.name}))
    }

    render() {
        return (
            <div>
                <script src="https://www.gstatic.com/firebasejs/5.5.5/firebase-app.js"></script>
                <script src="https://www.gstatic.com/firebasejs/5.5.5/firebase-firestore.js"></script>
                <Graph />

                <div className='button-container'>
                    <button className='button' onClick={this.handleClick}>
                        Click Me
                    </button>
                    <p>{this.state.username}</p>
                </div>
            </div>
        );
    }
}

export default App;
