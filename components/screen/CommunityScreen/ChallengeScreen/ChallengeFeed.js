import React, { Component } from 'react'
import { View, Text, Dimensions, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { Container, Button, Card, CardItem, Content, Right, Icon, Left, Item, H1 } from 'native-base'
import { connect } from 'react-redux';
import colors from '../../../../constants/colors'

const cardWidth = (Dimensions.get('window').width) - 4;
const cardHeight = cardWidth * 1.25;

class ChallengeFeed extends Component {
    state = {
        groupDetails: {},
        userPosts: [1, 2, 3, 4],
        uri: 'https://i.imgur.com/0lxMhP1_d.webp?maxwidth=728&fidelity=grand',
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Content>


                    <Left>


                        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Titanic Challenge</Text>
                            <Text style={{ fontSize: 12 }} >Offered by Coursera</Text>
                        </View>



                    </Left>
                    <CardItem style={{ justifyContent: 'space-between', marginLeft: 80, marginRight: 80 }}>
                        <Button style={{

                            height: 35, width: 80, justifyContent: 'center'
                        }} onPress={() => navigate('JoinChallScreen')}>
                            <Text style={{ color: '#fff' }}>Info</Text>
                        </Button>
                        <Button style={{

                            height: 35, width: 80, justifyContent: 'center'
                        }} onPress={() => navigate('CreatePost')}>
                            <Text style={{ color: '#fff' }}>Join</Text>
                        </Button>
                    </CardItem>








                    <FlatList
                        data={this.state.userPosts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Item
                            //  onPress={() => this.props.navigation.navigate('PostScrollScreen', {
                            //     post: this.state.userPosts,
                            //     index: index,
                            // })}
                            >
                                <ImageBackground resizeMode='contain' source={{
                                    uri: this.state.uri
                                }}
                                    style={{
                                        // flex: 1,width: '100%',
                                        width: cardWidth, height: cardHeight, margin: 1, marginBottom: 10,
                                        borderRadius: 15, justifyContent: 'flex-end'
                                    }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Left>
                                            <Text style={{
                                                margin: 10, color: '#fff',
                                                shadowColor: '#111', textShadowColor: '#111',
                                                textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                            }}>
                                                <Icon name='trending-down' style={{ color: '#fff', fontSize: 20 }} />
                                            4
                                        </Text>
                                        </Left>
                                        <Right>
                                            <Text style={{
                                                margin: 10, color: '#fff',
                                                shadowColor: '#111', textShadowColor: '#111',
                                                textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                            }}>
                                                <Icon name='trending-up' style={{ color: '#fff', fontSize: 20 }} />
                                            54
                                        </Text>
                                        </Right>
                                    </View>
                                </ImageBackground>
                            </Item>
                        )}
                        numColumns={1}
                        style={{ marginTop: 20, paddingTop: 5 }}
                    />
                </Content>
            </Container>
        );
    }
}

export default ChallengeFeed;
