import React from 'react';
import {
  AsyncStorage,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import firebase from "firebase";

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trackingItemArray: [{
        number: 0,
        name: 'name1',
        overlayVisible: false
      }, {
        number: 1,
        name: 'name2',
        overlayVisible: false
      }]
    }
  }
  static navigationOptions = {
    header: null,
  };

  render() {
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
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />

            {this.trackingItem()}
            {this.overlay()}
          </View>

        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _signOutAsync = async () => {
    await firebase.auth().signOut().catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
};

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools.
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  displayAlert(name) {
    alert(name);
  }

  displayOverlay(item) {
    let temp = this.state.trackingItemArray.slice();
    temp[item.number].overlayVisible = !temp[item.number].overlayVisible;
    this.setState({trackingItemArray: temp});
  }

  trackingItem() {
    return this.state.trackingItemArray.map((item) => {
      return (
        <View key={item.name} style={styles.trackingItemView}>
          <TouchableOpacity onPress={() => this.displayAlert(item.name)}>
            <Text style={[styles.trackingItemGeneric, styles.tracikingItemLeft]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.displayOverlay(item)}>
            <Text style={[styles.trackingItemGeneric, styles.tracikingItemRight]}>Count</Text>
          </TouchableOpacity>
        </View>
      );
    })
  }

  overlay() {
    return this.state.trackingItemArray.map((item) => {
      return (
        <View key={item.name} >
          {item.overlayVisible ?
            <Text style={[styles.trackingItemGeneric, styles.trackingItemOverlay]}>Enter number</Text>
            : null }
        </View>
      );
    })
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
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
