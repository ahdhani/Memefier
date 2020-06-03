import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Container, Button, Card, Text, Item, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import { db } from '../../config';

const cardWidth = Dimensions.get('window').width / 2;
const cardHeight = cardWidth * 1.25;

export default class TrendingScreen extends Component {

    state = {
        searchText: '',
        searchResult: [],
        searchLoading: false,
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

        if (text != '') {
            this.setState({
                searchLoading: true,
                searchText: text,
            })
            var search_list = []
            db.collection('userDetails')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        if (doc.data().firstname.includes(text) || doc.data().lastname.includes(text)) {
                            search_list = [...search_list, doc.data()]

                        }
                    })
                    this.setState({
                        searchResult: search_list,
                        searchLoading: false,
                    })
                })
                .catch(error => console.log(error.message))

        }
        else {
            this.setState({
                searchResult: [],
                searchText: '',
            })
        }
    }

    toggleFollow = (index) => {
        let trendingPosts = this.state.trendingPosts;
        trendingPosts[index].isFollow = !trendingPosts[index].isFollow;
        this.setState({
            trendingPosts: trendingPosts,
        })
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

                <FlatList
                    style={{
                        position: 'absolute', top: 60,
                        elevation: 2, zIndex: 2,
                        backgroundColor: '#fffffff0',
                        width: '100%', borderBottomLeftRadius: 5,
                        elevation: 5
                    }}
                    ListFooterComponent={() =>
                        this.state.searchLoading &&
                        <View style={{ paddingVertical: 20 }}>
                            <ActivityIndicator animating={this.state.searchLoading} size="small" />
                        </View>
                    }
                    data={this.state.searchResult}
                    renderItem={({ item }) => (
                        <Item style={{ flexDirection: 'row', padding: 4 }}>
                            <Thumbnail source={require('../../assets/profile.jpeg')} />
                            <Text style={{ marginLeft: 8 }}>{item.firstname} {item.lastname}</Text>
                        </Item>
                    )}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                />

                <FlatList
                    data={this.state.trendingPosts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Item>
                            <ImageBackground resizeMode='contain' source={require('../../assets/profile.jpeg')}
                                style={{
                                    width: cardWidth, height: cardHeight,
                                    elevation: 5, zIndex: 5
                                }}>
                                <View style={{ flexDirection: 'row', top: 200 }}>
                                    <Left>
                                        <Text style={{
                                            margin: 20, color: '#fff',
                                            shadowColor: '#111', textShadowColor: '#111',
                                            textShadowRadius: 10, fontWeight: '800',
                                        }}>{item.name}</Text>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.toggleFollow(index)
                                            }}
                                        >
                                            <Text style={{
                                                margin: 20, color: '#fff',
                                                shadowColor: '#111', textShadowColor: '#111',
                                                textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                            }}>{item.isFollow ? 'Follow' : 'Unfollow'}</Text>
                                        </TouchableOpacity>

                                    </Right>
                                </View>
                            </ImageBackground>
                        </Item>
                    )}
                    numColumns={2}
                // enableEmptySections={true}
                />

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
