<<<<<<< HEAD
import React from 'react';
import { View } from 'react-native';

import NavBar from './src/components/NavBar';


const App = () => {
  return (
    <View>
      <NavBar/>
    </View>
  );
};
=======
import React, {Component} from 'react';

import {Provider} from 'react-redux'
import store from './src/configs/redux/store'
import Index from './src/routes/Index'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
>>>>>>> master

export default App;
