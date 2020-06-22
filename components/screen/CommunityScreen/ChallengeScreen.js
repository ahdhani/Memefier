import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import { Container, Header, Content, Card, CardItem, Left, Right, Body, Title, Button, Tab, Item, Tabs } from 'native-base';
import Act_Com_Tabs from './Act_Com_Tabs'

export default class ChallengeScreen extends Component {
  render() {
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

          <CardItem style={{flexDirection: 'column' }}>
            <Button block onPress={this.makeChallenge}>
              {/* makeChallenge not defined yet */}
              <Text style={{ color: "white", fontSize: 18 }}>Make a Challenge</Text>
            </Button>
          </CardItem>

          <View                                    //the line
            style={{
              marginTop:0,
              borderBottomColor: '#3F51B5',
              borderBottomWidth: 4,
              marginRight:17,
              marginLeft:17
            }}
          />

          <Act_Com_Tabs />                       

        </Content>
      </Container>
    );
  }
}