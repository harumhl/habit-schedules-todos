import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firebase from "firebase";
import '@firebase/firestore';
import ListItem from './ListItem';

let db = null;
let data = [];

export default class HomeHomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});

    this.state = {
      dataReady: false,
      trackingItemArray: [{
        number: 0,
        name: 'name1',
        overlayVisible: false
      }, {
        number: 1,
        name: 'name2',
        overlayVisible: false
      }],
    }

    this.getToken();
    this.firebaseGetAll();
  }
    
    checkThisState() {
        console.log(this.state);
    }

  render() {
    if (this.state.dataReady === false) {
      return (
        <View>
          <Text>Loading</Text>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
            <Button title="Add New" onPress={() => this.props.navigation.navigate('AddEdit', {addEdit: "add"})} />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />

            {this.state.tracker.map((item) => {
              return (
                <ListItem key={item.id} addEdit="edit"
                      id={item.id} archived={item.archived} color={item.color} createdDate={item.createdDate} icon={item.icon} unit={item.unit} navigation={this.props.navigation} />
              );
            })}
          </View>

        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <Text style={styles.codeHighlightText}>navigation/MainTabNavigator.js</Text>
          </View>
        </View>
      </View>
    );
  }

  firebaseErrorHandler(error) {
    var errorMessage = error.message;
    alert(errorMessage);
  }

  firebaseGetAll = async () => {
    await db.collection("trackers").get()
    .then((querySnapshot) => {
      data = [];
      querySnapshot.docs.forEach(function(doc) {
         temp = doc.data();
         data.push({
           id: doc.id,
           archived: temp.archived,
           color: temp.color,
           createdDate: temp.createdDate,
           icon: temp.icon,
           unit: temp.unit
         });
      })
    })
    .catch(function(error) {
           alert(error.message);
      //this.firebaseErrorHandler(error);
    });
    this.setState({tracker: data});
    this.setState({dataReady: true});

    return data;
  }

  firebaseGet() {
    /*
    let trackerRef = db.collection("tracker");
    let docRef = trackerRef.doc("doc");
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
      firebaseErrorHandler(error);
    });

    // Get Multiple
    db.collection("cities").where("capital", "==", true)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch(function(error) {
          firebaseErrorHandler(error);
      });

      // Get All
      db.collection("cities").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      });
    */
    //return db.collection("tracker").get();
  }
  firebaseAdd() {
    db.collection("cities").add({
      name: "Tokyo",
      country: "Japan"
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        firebaseErrorHandler(error);
    });

  }
  firebaseUpdate() {
    var washingtonRef = db.collection("cities").doc("DC");

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        capital: true
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        firebaseErrorHandler(error);
    });

    /* // nested object
    // Create an initial document to update.
    var frankDocRef = db.collection("users").doc("frank");
    frankDocRef.set({
        name: "Frank",
        favorites: { food: "Pizza", color: "Blue", subject: "recess" },
        age: 12
    });

    // To update age and favorite color:
    db.collection("users").doc("frank").update({
        "age": 13,
        "favorites.color": "Red"
    })
    .then(function() {
        console.log("Document successfully updated!");
    });

    var updateTimestamp = docRef.update({
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    */
  }

  _signOutAsync = async () => {
    await firebase.auth().signOut().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthLoading');
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <Text style={styles.developmentModeText}>
          DEV
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          PROD
        </Text>
      );
    }
  }

  getToken = async() => {
    const userToken = await AsyncStorage.getItem('userToken');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  trackingItemView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  trackingItemGeneric: {
    flex: 1,
    height: 50,
    width: 100,
    overflow: 'hidden',
    backgroundColor: 'darkorchid',
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 16,
    //borderRadius: 10,
    margin: 7
  },
  tracikingItemLeft: {
    marginRight: 0,
    width: 200,
    backgroundColor: 'purple'
  },
  tracikingItemRight: {
    marginLeft: 0
  },
  trackingItemOverlay: {
    height: 20
  }
});
