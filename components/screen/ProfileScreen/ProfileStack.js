import React, { Component } from 'react';

import PostScrollScreen from '../PostScrollScreen'
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
                        name="PostScrollScreen"
                        component={PostScrollScreen}
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