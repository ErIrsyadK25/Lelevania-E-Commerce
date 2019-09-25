import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';

class HeaderMenu extends Component {
    state = {
        Menu: [
            {
                id:0,
                category:'Home'
            },
            {
                id:1,
                category:'Top 100'
            },
            {
                id:2,
                category:'Daily Deals'
            },
            {
                id:3,
                category:'E-Mart'
            },
            {
                id:4,
                category:'Official Store'
            },
        ]
    }

    render() {
        return (
            <ScrollView>
                    <FlatList
                        data={this.state.Menu}
                        keyExtractor={ ({id}) => id.toString()}
                        horizontal={true}
                        renderItem={ ({item}) => 
                        <View style={styles.Container}>
                            <TouchableOpacity style={styles.Touch}>
                                <Text style={styles.Text}>{item.category}</Text>
                            </TouchableOpacity>
                        </View> 
                    }
                    />
            </ScrollView>
        )
    }
}

export default HeaderMenu

const styles = StyleSheet.create({
    Container: {
        flexDirection:'row', 
        backgroundColor:'#FF7D1D', 
        marginHorizontal: 15, 
        marginBottom: 8,
        marginTop: 4
    },
    Touch: {
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    },
    Text: {
        color: '#FDFFFC'
    }
})