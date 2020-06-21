import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import CommunityScreen from './CommunityScreen';
import ChallengeScreen from './ChallengeScreen';
import colors from '../../../constants/colors'
// import Tab3 from './tabThree';
export default class CommunityStack extends Component {
    render() {
        return (
            <Container>
                <Tabs tabBarPosition='bottom' locked
                    tabBarUnderlineStyle={{ backgroundColor: 'black', height: 2 }}>
                    <Tab heading="Community" tabStyle={{ backgroundColor: colors.color5 }}
                        activeTabStyle={{ backgroundColor: '#142116' }}
                        activeTextStyle={{ color: colors.color1,fontSize: 20 }}
                        textStyle={{ color: colors.color3,fontSize: 18 }}>
                        <CommunityScreen />
                    </Tab>
                    <Tab heading="Challenges" tabStyle={{ backgroundColor: colors.color5 }}
                        activeTabStyle={{ backgroundColor: '#142116' }}
                        activeTextStyle={{ color: colors.color1,fontSize: 20 }}
                        textStyle={{ color: colors.color3,fontSize: 18 }}>
                        <ChallengeScreen />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}