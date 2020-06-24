import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Card, CardItem, Left, Right, Body, Title, Button, Tab, Item, Tabs } from 'native-base';
import Act_Com_Tabs from './Act_Com_Tabs'


export default function ChallengeScreen({ navigation }) {
  const makeChallenge = () => {
    navigation.push('MakeChallScreen');
  }

  return (
    <Container>
      <Content>
        
        <CardItem style={{ flexDirection: 'column' }}>
          <Button block onPress={makeChallenge}>
            <Text style={{ color: "white", fontSize: 18 }}>Make a Challenge</Text>
          </Button>
        </CardItem>


        <View
          style={{
            marginTop: 0,
            borderBottomColor: '#3F51B5',
            borderBottomWidth: 4,
            marginRight: 17,
            marginLeft: 17
          }}
        />
        <Act_Com_Tabs navigation={navigation} />

      </Content>
    </Container>
  );

}