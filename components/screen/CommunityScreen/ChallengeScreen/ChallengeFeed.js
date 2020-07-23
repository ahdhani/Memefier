import React from "react";
import { Container, Button, Card, CardItem, Content, Right, Icon, Left, Item, H1 } from 'native-base'
import { View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, StyleSheet,FlatList, ImageBackground } from "react-native";
// import colors from '../../../../constants/colors'

// const cardWidth = (Dimensions.get('window').width ) - 4;
// const cardHeight = cardWidth * 1.25;

export default class ChallengeFeed extends React.Component {
    state = {
        userPosts: [1, 2, 3, 4],
        uri: 'https://i.pinimg.com/originals/44/85/9d/44859db9de5e93acbaa0c89be036f628.jpg'
    }
    render() {
//         return (
//             <Container>
//                 <Content>
//                     <View style={{
//                         backgroundColor: '#fff',marginTop: 50,
//                         borderTopLeftRadius: 30, borderTopRightRadius: 30
//                     }}>
//                         <View style={{
//                             flexDirection: 'row', justifyContent: 'space-around',
//                             alignItems: 'center'
//                         }}>

                            

//                             <View style={{ alignItems: 'center' }}>
//                                 <H1 style={{ color: colors.color1 }}>
//                                     Titanic Challenge
//                                     </H1>
//                                 <Text note>25 Members</Text>
//                             </View>
//                         </View>
//                     </View>
//                     <FlatList
//                         data={this.state.userPosts}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item, index }) => (
//                             <Item>
//                                 <ImageBackground resizeMode='contain' source={{
//                                     uri: this.state.uri
//                                 }}
//                                     style={{
//                                         width: cardWidth, height: cardHeight, margin: 1,
//                                         borderRadius: 15, justifyContent: 'flex-end'
//                                     }}>
//                                     <View style={{ flexDirection: 'row', }}>
//                                         <Left>
//                                             <Text style={{
//                                                 margin: 10, color: '#fff',
//                                                 shadowColor: '#111', textShadowColor: '#111',
//                                                 textShadowRadius: 5, fontWeight: '600', fontSize: 12,
//                                             }}>
//                                                 <Icon name='trending-down' style={{ color: '#fff', fontSize: 20 }} />
//                                                 4
//                                             </Text>
//                                         </Left>
//                                         <Right>
//                                             <Text style={{
//                                                 margin: 10, color: '#fff',
//                                                 shadowColor: '#111', textShadowColor: '#111',
//                                                 textShadowRadius: 5, fontWeight: '600', fontSize: 12,
//                                             }}>
//                                                 <Icon name='trending-up' style={{ color: '#fff', fontSize: 20 }} />
//                                                 54
//                                             </Text>
//                                         </Right>
//                                     </View>
//                                 </ImageBackground>
//                             </Item>
//                         )}
//                         numColumns={2}
//                         style={{ marginTop: 20, paddingTop: 5 }}
//                     />
//                 </Content>
//             </Container>
//         );
    }

}

// const styles = StyleSheet.create({
//     itemStyle: {
//         width: '50%',
//         height: 100
//     }
// }

// );