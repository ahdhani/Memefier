import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native'

import ProfileScreen from './ProfileScreen'
import FeedScreen from './FeedScreen'
import TrendingScreen from './TrendingScreen'
import UploadScreen from './UploadScreen'
import CommunityScreen from './CommunityScreen'

const Tab = createMaterialTopTabNavigator();

function MainScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarPosition='bottom'
            backBehavior='initialRoute'

            // initialLayout={ width : Dimensions.get('window').width }
            tabBarOptions={{
                activeTintColor: '#05375a',  // Color of tab when pressed
                inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
                showIcon: true,
                labelStyle: { fontSize: 10 },
                showLabel: (Platform.OS !== 'android'),
                // allowFontScaling: true,
                // initialLayout={ width: Dimensions.get('window').width }
                style: {
                    justifyContent: 'center',
                    height: (Platform.OS === 'ios') ? 55 : 60 // I didn't use this in my app, so the numbers may be off. 
                }
            }}

        >
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color,focused }) => (
                        <MaterialCommunityIcons name="home" color={color} size={focused?28:26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Trending"
                component={TrendingScreen}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color,focused }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={focused?28:26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Upload"
                component={UploadScreen}
                options={{
                    tabBarLabel: 'Upload',
                    tabBarIcon: ({ color,focused  }) => (
                        <MaterialCommunityIcons 
                        // style={{
                        //     width: 60, height: 60,
                        //     borderRadius: 30, backgroundColor: 'blue',
                        //     alignSelf: 'center', alignItems: 'center',
                        //     justifyContent: 'center',padding: 10,bottom: 20,
                        // }} 
                        name="shape-square-plus" color={color} size={focused?28:26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Community"
                component={CommunityScreen}
                options={{
                    tabBarLabel: 'Community',
                    tabBarIcon: ({ color,focused }) => (
                        <MaterialCommunityIcons name="account-multiple" color={color} size={focused?28:26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color,focused  }) => (
                        <MaterialCommunityIcons name="account" color={color} size={focused?28:26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MainScreen;