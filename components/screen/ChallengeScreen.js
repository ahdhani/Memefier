import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, FlatList, Text } from 'react-native'
import { Container, Header, Content, Card, CardItem, Left, Right, Body, Title, Button, Tab, Item, Tabs } from 'native-base';
import colors from '../../constants/colors'

export default class ChallengeScreen extends Component {
  render() {
    var challenges = [];

    for (let i = 0; i < 5; i++) {
      challenges.push(
        <Card style={{ padding: 15, borderRadius: 8 }}>
          <CardItem>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Titanic Challenge</Text>
              <Text style={{ fontSize: 12 }} >Offered by Coursera</Text>
            </View>
            <Right>
              <Text >Ends in 5hrs</Text>
              <Button height={30} width={75} onPress={this.onJoin}>
                {/*onJoin not defined yet*/}
                <Text style={{ color: "white", fontSize: 17 }}>     Join</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      )
    }

    return (
      <Container>
        <Header>
          <Body>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <MaterialCommunityIcons name="boxing-glove" size={30} color="white" />
              <Title>  Challenges</Title>
            </View>
          </Body>
        </Header>
        <Content>
          <CardItem style={{ flexDirection: 'column' }}>
            <Button block onPress={this.makeChallenge}>
              {/* makeChallenge not defined yet */}
              <Text style={{ color: "white", fontSize: 18 }}>Make a Challenge</Text>
            </Button>
          </CardItem>

          <Tabs tabBarPosition='bottom' locked
            tabBarUnderlineStyle={{ backgroundColor: 'white', height: 2 }}>
            <Tab heading="Community" tabStyle={{ backgroundColor: colors.color5 }}
              activeTabStyle={{ backgroundColor: '#142116' }}
              activeTextStyle={{ color: colors.color1, fontSize: 20 }}
              textStyle={{ color: colors.color3, fontSize: 18 }}>
              
            </Tab>
            <Tab heading="Challenges" tabStyle={{ backgroundColor: colors.color5 }}
              activeTabStyle={{ backgroundColor: '#142116' }}
              activeTextStyle={{ color: colors.color1, fontSize: 20 }}
              textStyle={{ color: colors.color3, fontSize: 18 }}>
              
            </Tab>
          </Tabs>

          {challenges}

        </Content>
      </Container>
    );
  }
}