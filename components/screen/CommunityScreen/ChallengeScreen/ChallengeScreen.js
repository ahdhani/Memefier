//Challenge Screen

import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { Container, Content, CardItem, Button } from 'native-base';
import Act_Com_Tabs from './Act_Com_Tabs';
import colors from './../../../../constants/colors';



export default function ChallengeScreen({ navigation }) {
  const makeChallenge = () => {
    navigation.push('MakeChallScreen');
  }

  return (
    <Container>
      <Content>

        <CardItem style={{ flexDirection: 'column' }}>
          <TouchableOpacity style={{width:'100%'}}>
            <Button block onPress={makeChallenge} style={{ backgroundColor: colors.color5 }}>
              <Text style={{ color: colors.color1, fontSize: 18 }}>Make a Challenge</Text>
            </Button>
          </TouchableOpacity>
        </CardItem>

        <View                                 //The line
          style={{
            marginTop: 0,
            borderBottomColor: colors.color3,
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