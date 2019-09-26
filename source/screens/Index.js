import React, {Component} from 'react'
import {View} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../components/Login'
import AddAddress from '../components/AddAddress'
import Cart from '../components/Cart'
import ChangePassword from '../components/ChangePassword'
import ChangeBio from '../components/ChangeBio'
import CheckOut from '../components/CheckOut'
import DetailProduct from '../components/DetailProduct'
import EditProfile from '../components/EditProfile'
import EditAddress from '../components/EditAddress'
import ForgotPassword from '../components/ForgotPassword'
import SplashScreen from '../components/SplashScreen'
import Header from '../components/Header'
import Profile from '../components/Profile'
import ProductCategory from '../components/ProductCategory'
import Register from '../components/Register'

import Home from '../components/Home'
import Notifications from '../components/Notifications'

const AppNavigator = createStackNavigator({
    Login:{
        screen:Login
    },
    Profile:{
        screen:Profile
    },
    Category: {
        screen:ProductCategory
    },
    SplashScreen:{
        screen:SplashScreen
    },
    CheckOut:{
        screen:CheckOut
    },
    EditProfile:{
        screen:EditProfile
    },
    AddAddress:{
        screen:AddAddress
    },
    EditAddress:{
        screen:EditAddress
    },
    ChangePassword:{
        screen:ChangePassword
    },
    ChangeBio:{
        screen:ChangeBio
    },
    Cart:{
        screen:Cart
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    SplashScreen:{
        screen:SplashScreen
    },
    Register:{
        screen:Register
    },
    Home:{
        screen:Home
    }
})

const HomeContainer = createAppContainer(AppNavigator)

export default HomeContainer