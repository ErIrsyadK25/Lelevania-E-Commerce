import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Provider} from 'react-redux'
import store from './source/publics/redux/store'
import Index from './source/screens/Index'

class App extends Component{
  constructor(properties) {
    super(properties);
    OneSignal.init("42963162-4821-48d0-8711-93527cf4055f");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  render(){
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
