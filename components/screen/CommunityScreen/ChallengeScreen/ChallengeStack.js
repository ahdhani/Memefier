
// import { createStackNavigator } from 'react-navigation-stack';

import JoinChallScreen from './JoinChallScreen';
import ChallengeScreen from './ChallengeScreen';
import MakeChallScreen from './MakeChallScreen';
import ChallengeFeed from './ChallengeFeed';
import CreatePost from './CreatePost';
import colors from './../../../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const screens = {
//     ChallengeScreen: {
//         screen: ChallengeScreen,
//         navigationOptions:{
//             title:'Challenges'
//         } 
//     },
//     JoinChallScreen: { 
//         screen: JoinChallScreen,
//         navigationOptions:{
//             title:'Titanic Challenge'
//         } 
//     },
//     MakeChallScreen: { 
//         screen: MakeChallScreen,
//         navigationOptions:{
//             title:'Make a Challenge'
//         }  
//     }
// }

// const HomeStack = createStackNavigator(screens,{

//     defaultNavigationOptions:{
//         headerStyle:{backgroundColor:'#3F51B5'},
//         headerTitleStyle: {color: 'white'}        
//     }
// });


// export default createAppContainer(HomeStack);


import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class ChallengeStack extends Component {
    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    initialRouteName="ChallengeScreen"
                    screenOptions={{
                        gestureEnabled: true,
                        headerStyle: { backgroundColor: colors.color5 },
                        headerTitleStyle: { color: colors.color1 },
                        headerTintColor: colors.color1
                    }}>

                    <Stack.Screen
                        name="ChallengeScreen"
                        component={ChallengeScreen}
                        options={{
                            title: 'Challenges',
                            headerLeft: () => {
                                return (
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>    </Text>
                                        <MaterialCommunityIcons name="sword-cross" color={colors.color1} size={35} />
                                    </View>
                                )
                            }
                        }}
                    />
                    <Stack.Screen
                        name="JoinChallScreen"
                        component={JoinChallScreen}
                        options={{
                            title: 'Titanic Challenge'
                        }}
                    />
                    <Stack.Screen
                        name="MakeChallScreen"
                        component={MakeChallScreen}
                        options={{
                            title: 'Make a Challenge'
                        }}
                    />
                    <Stack.Screen
                        name="ChallengeFeed"
                        component={ChallengeFeed}
                        options={{
                            title: ''
                        }}
                    />
                    <Stack.Screen
                        name="CreatePost"
                        component={CreatePost}
                        options={{
                            title: 'Join Titanic Challenge'
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}