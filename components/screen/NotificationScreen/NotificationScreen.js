import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import { Container, Content, CardItem, Button,Card } from 'native-base';
import ListView from "deprecated-react-native-listview";
import colors from '../../../constants/colors';



export default function NotificationScreen({ navigation }) {

  const [Notifs, setNotif] = useState([
    { name: '@hani', oper: 'group', dp: 'https://images.hdqwalls.com/download/goku-dragon-ball-z-4k-uq-1600x900.jpg',time:'just now' }, 
    { name: '@shyam', oper: 'comment', dp: 'https://wallpaperset.com/w/full/f/7/e/489022.jpg',time:'5 mins ago' },
    { name: '@hani', oper: 'group', dp: 'https://images.hdqwalls.com/download/goku-dragon-ball-z-4k-uq-1600x900.jpg',time:'just now' }, 
    { name: '@shyam', oper: 'comment', dp: 'https://wallpaperset.com/w/full/f/7/e/489022.jpg',time:'5 mins ago' }
  ]);

  return (
    <Container>
      <Content>
        <View >

        <FlatList
          data={Notifs}
          renderItem={({ item }) => (
            <ListItem 
              onPress={()=>{
                if(item.oper=='comment'){
                  navigation.push('CommentScreen');
                }
                else if(item.oper=='group'){
                  navigation.push('GroupScreen');
                }
              }}
              title={`${item.name} ${item.oper}`}
              subtitle={item.time}
              leftAvatar={<Avatar rounded source={{ uri: item.dp }} size={50} />}
            />
          )}
          keyExtractor={item=>item.name}
          ItemSeparatorComponent={()=>{return(
          <View style={{height:1,width:'80%',backgroundColor:colors.color1,marginLeft:'23%'}}>

            </View>
          )}}
        />
        </View>


      </Content>
    </Container>
  );

}
