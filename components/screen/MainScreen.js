import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../../constants/colors'

import FeedStack from './FeedScreen/FeedStack'
import TrendingStack from './TrendingScreen/TrendingStack'
import CommunityStack from './CommunityScreen/CommunityStack'
import ProfileStack from './ProfileScreen/ProfileStack'
import ChallengeStack from './ChallengeScreen/ChallengeStack'


const Tab = createMaterialTopTabNavigator();

function MainScreen() {
    return (


        <Tab.Navigator
            initialRouteName="Feed"
            tabBarPosition='bottom'
            backBehavior='initialRoute'

            tabBarOptions={{
                activeTintColor: colors.color1,  // Color of tab when pressed
                inactiveTintColor: colors.color3, // Color of tab when not pressed
                indicatorStyle: {
                    borderBottomColor: colors.color3,
                    borderBottomWidth: 2,
                },
                showIcon: true,
                showLabel: (Platform.OS !== 'android'),
                labelStyle: {
                    fontSize: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style: {
                    justifyContent: 'center',
                    backgroundColor: '#253237',
                    height: 55,
                }
            }}

        >

            <Tab.Screen
                name="ChallengeStack"
                component={ChallengeStack}

                options={{
                    tabBarLabel: 'Challenge',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account-multiple" color={color} size={27} style={{ bottom: focused ? 3 : 0 }} />
                    ),
                }}
            />

            <Tab.Screen
                name="CommunityStack"
                component={CommunityStack}
                options={{
                    tabBarLabel: 'Community',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="shape-square-plus"
                            color={color} size={27} style={{ bottom: focused ? 3 : 0 }} />
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