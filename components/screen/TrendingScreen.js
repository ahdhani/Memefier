import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { Container, Button, Card, Text, Item, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
// import { TouchableOpacity } from 'react-native-gesture-handler'


export default class TrendingScreen extends Component {

    state = {
        searchText: '',
        searchResult: [],
        trendingPosts: [
            {
                name: 'hani',
                postImage: null,
                isFollow: true,

            },
            {
                name: 'kudu',
                postImage: null,
                isFollow: false,

            },
            {
                name: 'hashm',
                postImage: null,
                isFollow: true,

            },
            {
                name: 'hayan',
                postImage: null,
                isFollow: true,

            },
            {
                name: 'melvin',
                postImage: null,
                isFollow: true,

            },
            {
                name: 'hani',
                postImage: null,
                isFollow: true,

            },
        ]
    }

    onChangeTextSearch = (text) => {
        this.setState({
            searchText: text,
        })

        //Change from HERE
        if (text == 'Z') {
            this.setState({
                searchResult: [
                    {
                        username: 'hani',
                        profileImage: ''
                    },
                    {
                        username: 'kudu',
                        profileImage: ''
                    },
                ]
            })
        }
    }

    toggleFollow = (index) => {
        // let trendingPosts= this.state.trendingPosts;
        // trendingPosts[index].isFollow = !trendingPosts[index].isFollow;
        // this.setState({
        //     trendingPosts: trendingPosts,
        // })
    }
    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Body>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search"
                                onChangeText={text => this.onChangeTextSearch(text)}
                                value={this.state.searchText}
                                underlineColorAndroid="transparent"
                                onBlur={() => this.setState({
                                    searchResult: [],
                                    searchText: '',
                                })} />
                            <Icon name="ios-people" />
                        </Item>
                    </Body>
                </Header>
                <Content>
                    <FlatList
                        data={this.state.searchResult}
                        renderItem={({ item }) => (
                            <Item style={{ flexDirection: 'row', padding: 4 }}>
                                <Thumbnail source={require('../../assets/profile.jpeg')} />
                                <Text style={{ marginLeft: 8 }}>{item.username}</Text>
                            </Item>
                        )}
                        enableEmptySections={true}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <FlatList
                        data={this.state.trendingPosts}
                        renderItem={({ item }) => (
                            <Item>
                                <ImageBackground resizeMode='contain' source={require('../../assets/profile.jpeg')}
                                    style={{ width: 200, height: 250 }}>
                                    {/* <View style={{ flexDirection: 'row', top: 200 }}> */}
                                        {/* <Left>
                                            <Text style={{
                                                margin: 20, color: '#fff',
                                                shadowColor: '#111', textShadowColor: '#111',
                                                textShadowRadius: 10, fontWeight: '800',
                                            }}>{item.name}</Text>
                                        </Left>
                                        <Right>
                                            <TouchableOpacity 
                                            onPress={(index) => this.toggleFollow(index)}
                                            >
                                                <Text style={{
                                                    margin: 20, color: '#fff',
                                                    shadowColor: '#111', textShadowColor: '#111',
                                                    textShadowRadius: 10, fontWeight: '800',
                                                }}>{this.state.isFollow ? 'Follow' : 'Unfollow'}</Text>
                                            </TouchableOpacity>

                                        </Right> */}
                                    {/* </View> */}
                                </ImageBackground>
                            </Item>
                        )}
                        numColumns={2}
                        // enableEmptySections={true}
                        keyExtractor={(item, index) => index.toString()}
                    />


                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
