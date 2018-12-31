import React from 'react';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  HeaderBackButton,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firebase from "firebase";
import '@firebase/firestore';

let db = null;

const newItem = {
  id: '',
  archived: false,
  color: 'white',
  createDate: '2018-12-21',
  icon: 'fa-home',
  unit: 'minute'
}
export default class AddEditScreen extends React.Component {
  static navigationOptions = {
    title: 'Add/Edit',
    headerLeft: (
      <Button onPress={() => alert('Back?')} title="Info" color="#fff" />
      ),
  headerRight: (
      <HeaderBackButton onPress={() => this.props.navigation.goBack(null)} />
      )
  };

  constructor(props) {
    super(props);
    //const {navigation} = this.props;
      
    db = firebase.firestore();
    db.settings({timestampsInSnapshots: true});
      
    this.state = {
      id: this.props.navigation.getParam('id', newItem.id),
      archived: this.props.navigation.getParam('archived', newItem.archived),
      color: this.props.navigation.getParam('color', newItem.color),
      createDate: this.props.navigation.getParam('createDate', newItem.createDate),
      icon: this.props.navigation.getParam('icon', newItem.icon),
      unit: this.props.navigation.getParam('unit', newItem.unit)
    };
  }
    
    displayItem(title, value, ph, setstate) {
        return (
            <View>
                <Text>{title}: </Text>
                <TextInput value={value} placeholder={ph} placeholderTextColor='black'
                        onChangeText={setstate}
                        style={styles.input} />
            </View>
        );
    }

  render() {
    return (
      <View>
        <Button title="Home/Back" onPress={() => this.props.navigation.navigate("App")} />
        {this.displayItem("Name", this.state.id, "ID", (text) =>this.setState({id: text}))}
        {this.displayItem("Color", this.state.color, "color", (text) => this.setState({color: text}))}
        {this.displayItem("Icon", this.state.icon, "icon", (text) => this.setState({icon: text}))}
        {this.displayItem("Unit", this.state.unit, "unit", (text) => this.setState({unit: text}))}

        <Button title="Save" onPress={this.saveToFirebase} />
        {(this.props.navigation.getParam('addEdit') === "edit") ?
            <Button title="Delete" onPress={() => this.deleteConfirmation()} /> : null
        }
      </View>
    );
  }
    
  saveToFirebase = () => {
      db.collection("trackers").doc(this.state.id).set({
                                   id: this.state.id,
                                   archived: this.state.archived,
                                   color: this.state.color,
                                   createDate: this.state.createDate,
                                   icon: this.state.icon,
                                   unit: this.state.unit
                                   })
      .then((docRef) => {
            alert('successful');
            this.props.navigation.navigate("App");
            })
      .catch(function(error) {
             alert(error.message);
             });

  }
    
    deleteConfirmation() {
        Alert.alert(
                    'Delete Confirmation',
                    'Are you sure you want to delete the item?',
                    [
                     {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                     {text: 'YES', onPress: () => {
                                                console.warn('YES Pressed')
                                                this.deleteFromFirebase()
                     }},
                     ]
                    );

    }
    
    deleteFromFirebase() {
        db.collection("trackers").doc(this.state.id).delete()
        .then(() => {
              console.log("Document successfully deleted!");
              this.props.navigation.navigate("App");
        })
        .catch(function(error) {
               console.error("Error removing document: ", error);
        });
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
  input: {
    height: 55,
    width: 250,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    margin: 7
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
