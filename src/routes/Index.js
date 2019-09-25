import React, {Component} from 'react'
import {View} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../components/Login'
import NavBar from '../components/NavBar';

import SplashScreen from '../components/SplashScreen'
import Register from '../components/Register'


const AppNavigator = createStackNavigator({
    Login:{
        screen:Login
    },
    SplashScreen:{
        screen:SplashScreen
    },
    Register:{
        screen:Register
    },
    NavBar:{
        screen:NavBar
    }
})

const HomeContainer = createAppContainer(AppNavigator)

export default HomeContainer