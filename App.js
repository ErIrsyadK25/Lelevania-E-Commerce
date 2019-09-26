import React, {Component} from 'react';
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
  render(){
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
