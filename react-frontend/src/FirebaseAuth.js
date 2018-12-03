function firebaseAuth(firebase) {
    firebase.initializeApp({
       apiKey: "",
       authDomain: "",
       databaseURL: "",
       projectId: "",
       storageBucket: "",
       messagingSenderId: ""
    });
    
    firebase.auth().signInAnonymously().catch(function(error) { console.log(error); });
    
    firebase.auth().onAuthStateChanged(function(user) {
       if (user) {} // User is signed in.
       else {} // User is signed out.
    });
}

export default firebaseAuth;
