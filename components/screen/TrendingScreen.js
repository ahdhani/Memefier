import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Container, Button, Card, Text, Item, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'


export default class TrendingScreen extends Component {

    state = {
        searchText: '',
        searchResult: [],
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
                    <Text style={{ margin: 20 }}>Discover</Text>

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
