import React, { Component } from 'react';

import PostScrollScreen from '../PostScrollScreen'
import TrendingScreen from './TrendingScreen'
import SearchScreen from './SearchScreen'
import CommentScreen from '../FeedScreen/CommentScreen/CommentScreen'
import ProfileStack from '../ProfileScreen/ProfileStack'
import CommunityFeed from '../CommunityScreen/CommunityFeed'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default class TrendingStack extends Component {



    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                
                    initialRouteName="TrendingScreen"
                    screenOptions={{
                        gestureEnabled: true
                    }}>

                    <Stack.Screen
                        name="TrendingScreen"
                        component={TrendingScreen}
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
                        name="CommentScreen"
                        component={CommentScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="SearchScreen"
                        component={SearchScreen}
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
                    <Stack.Screen
                        name="CommunityFeed"
                        component={CommunityFeed}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}