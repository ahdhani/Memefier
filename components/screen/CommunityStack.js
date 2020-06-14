import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import CommunityScreen from './CommunityScreen';
import ChallengeScreen from './ChallengeScreen';
// import Tab3 from './tabThree';
export default class CommunityStack extends Component {
  render() {
    return (
      <Container>
        {/* <Header hasTabs /> */}
        <Tabs >
          <Tab heading="Community">
            <CommunityScreen />
          </Tab>
          <Tab heading="Challenges">
            <ChallengeScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}