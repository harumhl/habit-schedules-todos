import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Graph from './Graph.js';
import firebaseAuth from './FirebaseAuth.js';

class App extends Component {
    
    constructor () {
        super();
        
        const firebase = require("firebase");
        firebaseAuth(firebase);

        var db = firebase.firestore();
        db.settings({timestampsInSnapshots: true}); // Disable deprecated features
        this.firebaseGet(db);
    }
    
    firebaseGet(db) {
         db.collection("temp").get().then((querySnapshot) => {
             console.log(querySnapshot.docs[0].data());
             querySnapshot.forEach((doc) => {
                 console.log(doc.id);
                 console.log(doc.data());
             });
         });
    }
    
    /* handleClick () {
        axios.get('https://api.github.com/users/maecapozzi')
        .then(response => this.setState({username: response.data.name}))
    } */
    
    render() {
        return (
            <div>
                <Graph />
            </div>
        );
    }
}

export default App;
