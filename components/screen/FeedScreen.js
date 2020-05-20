import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import FeedCards from '../FeedCards'

export default class FeedScreen extends Component {

    state = {
        post : {
            username: '@arjyou',
            profileImage: '',
            category: 'Fukru Roasting',
            memeImage: '',
            error: '',
            likes: 3,
            dislikes: 4,
            about: 'Pwoli Saanam',
            comment: '2',
            isReactions: true,
            reactions: [
                {
                    index: 0,
                },
                {
                    index: 1,
                },
            ]
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Feed</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                   <FeedCards post={this.state.post}/>
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
