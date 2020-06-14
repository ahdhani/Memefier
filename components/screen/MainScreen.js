import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FeedStack from './FeedStack'
import TrendingStack from './TrendingStack'
import UploadScreen from './UploadScreen'
import CommunityScreen from './CommunityScreen'
import ProfileStack from './ProfileStack'
import CommentScreen from './CommentScreen'


const Tab = createMaterialTopTabNavigator();

function MainScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarPosition='bottom'
            backBehavior='initialRoute'

            tabBarOptions={{
                activeTintColor: '#9db4c0',  // Color of tab when pressed
                inactiveTintColor: '#5c6b73', // Color of tab when not pressed
                showIcon: true,
                labelStyle: { fontSize: 10 },
                showLabel: (Platform.OS !== 'android'),
                // allowFontScaling: true,
                style: {
                    justifyContent: 'center',
                    backgroundColor: '#253237',
                    height: 55,
                }
            }}

        >
            <Tab.Screen
                name="Upload"
                component={UploadScreen}
                options={{
                    tabBarLabel: 'Upload',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="shape-square-plus"
                            color={color} size={27} style={{ bottom: focused ? 3 : 0 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Community"
                component={CommunityScreen}
                options={{
                    tabBarLabel: 'Community',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account-multiple" color={color} size={27} style={{ bottom: focused ? 3 : 0 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="home" color={color} size={27} style={{ bottom: focused ? 3 : 0 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Trending"
                component={TrendingStack}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={27} style={{ bottom: focused ? 3 : 0 }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account" color={color} size={27} style={{ bottom: focused ? 3 : 0 }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MainScreen;