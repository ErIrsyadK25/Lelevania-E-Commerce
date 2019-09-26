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

export default App;
