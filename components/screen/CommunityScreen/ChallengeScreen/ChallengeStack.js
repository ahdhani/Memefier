import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

import JoinChallScreen from './JoinChallScreen';
import ChallengeScreen from './ChallengeScreen';
import MakeChallScreen from './MakeChallScreen';

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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';

export default class ChallengeStack extends Component {
    render() {
        const Stack = createStackNavigator();

        return (
            <NavigationContainer independent={true}>
                <Stack.Navigator
                    initialRouteName="ChallengeScreen"
                    screenOptions={{
                        gestureEnabled: true,
                        headerStyle: { backgroundColor: '#3F51B5' },
                        headerTitleStyle: { color: 'white' }
                    }}>

                    <Stack.Screen
                        name="ChallengeScreen"
                        component={ChallengeScreen}
                        options={{
                            title: 'Challenges'
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

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}