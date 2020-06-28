import React, { Component } from 'react';

import FeedScreen from './FeedScreen'
import CommentScreen from './CommentScreen/CommentScreen'
import ProfileStack from '../ProfileScreen/ProfileStack'



import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class FeedStack extends Component {

    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                
                    initialRouteName="FeedScreen"
                    screenOptions={{
                        gestureEnabled: true
                    }}>

                    <Stack.Screen
                        name="FeedScreen"
                        component={FeedScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="CommentScreen"
                        component={CommentScreen}
                        options={{
                            headerShown: false
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