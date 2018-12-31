import React from 'react';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer, TabNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import {SignInScreen, AuthLoadingScreen} from '../screens/Auth';
import AddEditScreen from '../screens/AddEditScreen';

//const AppStack = createStackNavigator({ Home: HomeScreen, Sign: SignInScreen,  });
const BottomStack = createBottomTabNavigator({ Home: HomeScreen, AddEdit: AddEditScreen });
//const AuthStack = createStackNavigator({  });

const AppNavigator = createSwitchNavigator(  {
    AuthLoading: AuthLoadingScreen,
    App: HomeScreen,//createStackNavigator({Home: HomeScreen, AddEAdit: AddEditScreen}),
    SignIn: SignInScreen,
    AddEdit: AddEditScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
