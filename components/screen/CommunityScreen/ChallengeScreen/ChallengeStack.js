import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import JoinChallScreen from './JoinChallScreen';
import ChallengeScreen from './ChallengeScreen';
import MakeChallScreen from './MakeChallScreen';

const screens = {
    ChallengeScreen: {
        screen: ChallengeScreen,
        navigationOptions:{
            title:'Challenges'
        } 
    },
    JoinChallScreen: { 
        screen: JoinChallScreen,
        navigationOptions:{
            title:'Titanic Challenge'
        } 
    },
    MakeChallScreen: { 
        screen: MakeChallScreen,
        navigationOptions:{
            title:'Make a Challenge'
        }  
    }
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerStyle:{backgroundColor:'#3F51B5'},
        headerTitleStyle: {color: 'white'}
    }
});


export default createAppContainer(HomeStack);;