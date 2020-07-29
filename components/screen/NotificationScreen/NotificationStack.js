import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../../../constants/colors';
import NotificationScreen from './NotificationScreen';
import CommentScreen from '../FeedScreen/CommentScreen/CommentScreen';
import PostScrollScreen from '../PostScrollScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class NotificationStack extends Component {
    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    initialRouteName="NotificationScreen"
                    screenOptions={{
                        gestureEnabled: true,
                        headerStyle: { backgroundColor: colors.color5 },
                        headerTitleStyle: { color: colors.color1 },
                        headerTintColor: colors.color1
                    }}>

                    <Stack.Screen
                        name="NotificationScreen"
                        component={NotificationScreen}
                        options={{
                            title: 'Notifications',
                            headerLeft: () => {
                                return (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>    </Text>
                                        <MaterialCommunityIcons name="bell-ring" color={colors.color1} size={30} />
                                    </View>
                                )
                            }
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
                        name="PostScrollScreen"
                        component={PostScrollScreen}
                        options={{
                            headerShown: false
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}