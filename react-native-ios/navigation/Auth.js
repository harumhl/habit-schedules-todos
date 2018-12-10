import React from 'react';
import {ActivityIndicator, AsyncStorage, Button,
  StatusBar, StyleSheet, TextInput, View} from 'react-native';
import firebase from "firebase";

let userInfo = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseAuth();
    this._bootstrapAsync();
  }

  firebaseAuth = async () => {
    var config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    await firebase.initializeApp(config);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
      },
      givenId: '',
      givenPassword: ''
    }
  }
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput value={this.state.givenId} placeholder='ID'
                   onChangeText={(text) => this.setState({givenId: text})}
                   style={styles.input} />
        <TextInput value={this.state.givenPassword} placeholder='Password'
                   onChangeText={(text) => this.setState({givenPassword: text})}
                   onSubmitEditing={this._signInAsync}
                   style={styles.input}
                   secureTextEntry={true} />
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await firebase.auth().signInWithEmailAndPassword(this.state.givenId, this.state.givenPassword)
    .then((result) => {
      userInfo = {email: result.user.email};
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        userInfo = {email: user.email};
      } else {
        userInfo = {}; // signed out
      }
    });

    this.setState({user: userInfo});
    await AsyncStorage.setItem('userToken', this.state.user.email);
    this.props.navigation.navigate('App');
  };
}
