import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { Container, Button, Item, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'


export default class CommunityScreen extends Component {

    state = {
        users: [
            {
                username: 'hani',
                avatar: null,
                isFollow: false,
            },
            {
                username: 'kudu',
                avatar: null,
                isFollow: false,
            },
        ]
    }

    toggleFollow = (index) => {
        let users = this.state.users;
        users[index].isFollow = !users[index].isFollow;
        this.setState({
            users: users,
        })
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Community</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <FlatList
                        data={this.state.users}
                        renderItem={({ item , index}) => (
                            <Item style={{ flexDirection: 'row', padding: 4 }}>
                                <Thumbnail source={{ uri: item.avatar }} />
                                <Text style={{ marginLeft: 8 }}>{item.username}</Text>
                                <Text style={{ marginLeft: 200 }}
                                        onPress = {()=>this.toggleFollow(index)}
                                >{item.isFollow ? 'follow ': 'unfollow'}</Text>
                            </Item>
                        )}
                        enableEmptySections={true}
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
