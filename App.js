import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import storeConfig from './src/store';

import pushNotification from './src/services/PushNotification';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ReviewScreen from './src/screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount() {
    pushNotification();
  }

  render() {
    //console.log(storeConfig.store);

    const MainNavigation = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: { 
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          reviewTab: { 
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }              
            })
          }
        }, {
          tabBarPosition: 'bottom',
          swipeEnabled: false,
          animationEnabled: false,
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
          },
        })
      }
    }, {
      lazyLoad: true,
      swipeEnabled: false,
      animationEnabled: false,
      tabBarOptions: {
        lazyLoad: true,
        lazy: true
      },
      navigationOptions: {
          tabBarVisible: false,
          lazy: true,
          lazyLoad: true,
          swipeEnabled: false,
          animationEnabled: false,
        }
      }
    )
    return (
      <Provider store={storeConfig.store}>
        <View style={styles.container}>
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
