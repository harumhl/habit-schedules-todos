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

export default class ListItem extends React.Component {

  constructor(props) {
    super(props);
  }
    
  displayAlert(name) {
    alert(name);
  }

  displayOverlay(item) {
    let temp = this.state.trackingItemArray.slice();
    temp[item.number].overlayVisible = !temp[item.number].overlayVisible;
    this.setState({trackingItemArray: temp});
  }

  render() {
    return (
      <View key={this.props.id} style={styles.trackingItemView}>
        <TouchableOpacity onPress={() => this.displayAlert(this.props.id)}>
          <Text style={[styles.trackingItemGeneric, styles.tracikingItemLeft]}>{this.props.id}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.displayOverlay(this.props.id)}>
          <Text style={[styles.trackingItemGeneric, styles.tracikingItemRight]}>Count</Text>
        </TouchableOpacity>
      </View>
    );
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
