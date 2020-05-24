import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import FeedCards from '../FeedCards'

export default class FeedScreen extends Component {

    state = {
        post: [{
            id: 0,
            username: '@arjyou',
            profileImage: '',
            category: 'Fukru Roasting',
            memeImage: '',
            error: '',
            likes: 3,
            dislikes: 4,
            about: 'Pwoli Saanam',
            comment: '2',
            isReactions: false,
            reactions: [
                {
                    index: 0,
                    Reactioncount: 1,
                },
                {
                    index: 1,
                    Reactioncount: 1,
                },
            ],
            hashtags: [

            ],
        },
        {
            id: 1,
            username: '@kudu',
            profileImage: '',
            category: 'Fukru Roasting',
            memeImage: '',
            error: '',
            likes: 3,
            dislikes: 4,
            about: 'Pwoli Saanam lnksfa aslkdnf akslfd aflknfsa aslkasf afslkn kefjnsa sdfd;gj adlkfn asldkfn',
            comment: '2',
            isReactions: true,
            reactions: [
                {
                    index: 0,
                    Reactioncount: 1,
                },
                {
                    index: 1,
                    Reactioncount: 1,
                },
            ],
            hashtags: [

            ],
        },
        ]
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
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.post}
                        renderItem={({ item }) => <FeedCards post={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </Container>
        )
    }

}

