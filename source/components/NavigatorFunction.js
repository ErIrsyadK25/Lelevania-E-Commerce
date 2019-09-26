import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import Profile from '../screens/Profile';
// import EditProfile from '../Screens/EditProfile';

const AppStackNavigator = createStackNavigator({
  // Home: {
  //   screen: Home,
  // },
  Profile: {
    screen: Profile,
  },
  // EditNote: {
  //   screen: EditNote,
  // },
});

// const CustomDrawer = () =>(
//     <ComponentDrawer/>
// )

const AppDrawerNavigator = createDrawerNavigator({
  Home :{
    screen : AppStackNavigator,
    navigationOptions : {
      drawerLabel: () => null
    }
  },
},
  // {contentComponent: CustomDrawer}
)

const AppContainerDrawer = createAppContainer(AppDrawerNavigator);

export default AppContainerDrawer