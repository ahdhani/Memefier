import React, { Component } from 'react';

import ProfileFeedScreen from './ProfileFeedScreen'
import ProfileScreen from './ProfileScreen'
import EditProfileScreen from './EditProfileScreen'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class ProfileStack extends Component {



    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                
                    initialRouteName="ProfileScreen"
                    screenOptions={{
                        gestureEnabled: true
                    }}>

                    <Stack.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="ProfileFeedScreen"
                        component={ProfileFeedScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="EditProfileScreen"
                        component={EditProfileScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}