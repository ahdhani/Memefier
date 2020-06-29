import React, { Component } from 'react';

import PostScrollScreen from '../PostScrollScreen'
import ProfileScreen from './ProfileScreen'
import EditProfileScreen from './EditProfileScreen'
import CommentScreen from '../FeedScreen/CommentScreen/CommentScreen'
import UploadScreen from '../UploadScreen/UploadScreen'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class ProfileStack extends Component {


    render() {
        // const { uuid } = this.props.route.params;

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
                        initialParams={{ uuid: null }}
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
                    <Stack.Screen
                        name="CommentScreen"
                        component={CommentScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="UploadScreen"
                        component={UploadScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}