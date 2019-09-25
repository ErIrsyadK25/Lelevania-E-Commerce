import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HeaderMenu from '../HeaderMenu';
import { Header } from 'react-native/Libraries/NewAppScreen';

class NavBar extends Component {
    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.NavBar}>
                    <View style={styles.Drawer}>
                        <TouchableOpacity>
                            <View style={styles.Icon}>
                                <Icon name='menu' size={24} color='#FDFFFC' />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1}}>
                        <TextInput 
                            style={styles.TextInput}
                            placeholder='Cari di lelevenia'
                        />
                        <Icon name='search' size={26} color='#444' style={styles.Search} />
                    </View>

                    <View style={styles.Icons}>
                        <View style={[styles.Icon]}>
                            <TouchableOpacity>
                                <View style={styles.Icon}>
                                    <Icon name='shopping-cart' size={24} color='#FDFFFC' />
                                    <View style={styles.Notification}>
                                        <Text style={styles.NotificationText}>4</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.Icon}>
                            <TouchableOpacity>
                                <View style={styles.Icon}>
                                    <Icon name='notifications' size={24} color='#FDFFFC' />
                                    <View style={styles.Notification}>
                                        <Text style={styles.NotificationText}>6</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <HeaderMenu/>
                </View>
            </View>

        )
    }
}

export default NavBar

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#FF7D1D',
        paddingHorizontal: 12, 
    },
    NavBar: {
        flexDirection: 'row'
    },
    Menu: {

    },
    Drawer: { 
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    Icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 1.5
    },
    TextInput: {
        borderWidth: 1, 
        borderColor: '#FDFFFC', 
        borderRadius: 5, 
        backgroundColor: '#FDFFFC', 
        height: 40, 
        fontSize: 14, 
        paddingLeft: 42, 
        paddingRight: 20, 
        marginVertical: 10, 
        marginRight: 12
    },
    Icons: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    Search: {
        position: 'absolute', 
        top: 17, 
        left: 12
    },
    Notification: {
        position:'absolute', 
        width:15, 
        height:15, 
        borderRadius:25, 
        backgroundColor:'#FDFFFC', 
        bottom: 14, 
        right: 0, 
        alignItems:'center', 
        justifyContent:'center'
    },
    NotificationText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        color: '#FF7D1D'
    }
});
