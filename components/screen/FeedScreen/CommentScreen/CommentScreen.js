import React, { Component } from 'react'
import { View, StyleSheet, Picker, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Button, Item, Input, Header, Content, Text, Left, Body, Title, Icon, Thumbnail, Right } from 'native-base'
import colors from '../../../../constants/colors'
import { fetchAllComments, fetchAllReplies, addComment, addReply } from '../../../functions/comments'
import { fetchUserId } from '../../../functions/general'
import Comment from './Comment'


export default class CommentScreen extends Component {

    state = {
        commentText: '',
        comments: [],
    }

    componentDidMount = async () => {
        let comments = await fetchAllComments(this.props.route.params.postId)
        // console.log(comments)
        this.setState({ comments: comments })

    }

    render() {

        const { postId } = this.props.route.params;
        const { userId } = this.props.route.params;
        const { uuid } = this.props.route.params;

        return (
            <Container style={{ backgroundColor: '#253237' }}>
                <Header style={{ backgroundColor: '#252337' }}>
                    <Left >
                        <Icon style={{ marginLeft: 10, color: '#fff' }} name='ios-arrow-round-back'
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </Left>
                    <Body>
                        <Title>Comments</Title>
                    </Body>
                </Header>
                <View style={{
                    backgroundColor: '#253237',
                    padding: 10,
                    flex: 1
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Thumbnail resizeMode='cover'
                            source={require('../../../../assets/dp/default.png')}
                            style={{ marginHorizontal: 5 }} small />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#fff', marginLeft: 6 }}>@{userId}</Text>
                            <Input style={{ color: '#fff', }}
                                placeholder='Add your comments...'
                                onChangeText={(text) => this.setState({ commentText: text })}
                                value={this.state.commentText} />
                        </View>

                        <Icon name='send' style={{ margin: 15 }} onPress={() => {
                            //
                            addComment(postId,this.state.commentText,uuid)
                            this.setState({ comments: [...this.state.comments, 
                                { content: this.state.commentText,postId: postId,created_by: uuid }], commentText: '' })
                        }
                        } />
                    </View>
                    <FlatList
                        data={this.state.comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Comment comment={item} index={index} userId={userId} uuid={uuid}/>
                        )}
                    />

                </View>
            </Container>
        )
    }

}
