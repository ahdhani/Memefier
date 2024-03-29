import React, { Component } from 'react';


import CommunityFeed from './CommunityFeed'
import CreatePost from './CreatePost'
import CommunityScreen from './CommunityScreen'
import ProfileStack from '../ProfileScreen/ProfileStack'
import AdminScreen from './AdminScreen'
import CreateCommunity from './CreateCommunity'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class CommunityStack extends Component {



    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator

                    initialRouteName="CommunityScreen"
                    screenOptions={{
                        gestureEnabled: true
                    }}>

                    <Stack.Screen
                        name="CommunityScreen"
                        component={CommunityScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="CommunityFeed"
                        component={CommunityFeed}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="CreatePost"
                        component={CreatePost}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="AdminScreen"
                        component={AdminScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="CreateCommunity"
                        component={CreateCommunity}
                        options={{
                            title: 'Make a Group',
                            headerStyle: { backgroundColor: '#3F51B5' },
                            headerTitleStyle: { color: 'white' }
                        }}
                    />
                    <Stack.Screen
                        name="ProfileStack"
                        component={ProfileStack}
                        options={{
                            headerShown: false
                        }}
                    />


                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}