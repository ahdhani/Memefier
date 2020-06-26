import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Picker, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Button, Item, Input, Header, Content, Text, Left, Body, Title, Icon, Thumbnail, Right } from 'native-base'
import colors from '../../../../constants/colors'
import { fetchAllComments, fetchAllReplies, addComment, addReply } from '../../../functions/comments'
import { fetchUser } from '../../../functions/general'
import Reply from './Reply'

import { db } from '../../../../config';
import { connect } from 'react-redux'


const Comment = (props) => {

    const [replyText, setReplyText] = useState('ha')
    const [user, setUser] = useState({
        dp: "https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9"
    })
    const [reply, setReply] = useState([])
    const [replyIndex, setReplyIndex] = useState()

    useEffect(() => {
        fetchUser(props.comment.created_by)
            .then(user => {
                setUser(user)
                // console.log(user)
            })
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });

        // console.log(props.comment.comment_id)
        if (props.replyIndex === props.index) {
            fetchAllReplies(props.comment.comment_id)
                .then(res => {
                    setReply(res)
                    // console.log("Response :\n" , res)
                })
                .catch(error => {
                    console.warn(JSON.stringify(error, null, 2));
                });
        }
    }, []);

    return (
        <Item style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <View style={{ flexDirection: 'row', width: '100%' }} >
                <Thumbnail small resizeMode='cover' defaultSource={require('../../../../assets/dp/default.png')}
                    source={{ uri: user.dp }} style={{ margin: 5, marginTop: 10 }} />
                <View style={{ margin: 5 }}>
                    <Text style={{ color: '#fff' }}>@{user.userId}</Text>
                    <Text style={{ color: '#fff' }}>{props.comment.content}</Text>
                </View>
                <Text style={{ position: 'absolute', right: 20, margin: 10, color: colors.color3 }}
                    onPress={() => props.setReplyIndex(props.index)}
                >Reply</Text>
            </View>

            {props.replyIndex === props.index ?
                <FlatList
                    data={reply}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Reply reply={item} />
                    )}
                    style={{ left: 50, width: '100%' }}
                    ListFooterComponent={() => (
                        <View style={{
                            flexDirection: 'row', backgroundColor: '#253237',
                            alignItems: 'center', width: '100%'
                        }}>
                            <Thumbnail resizeMode='cover' source={{ uri: props.userDp }}
                                defaultSource={require('../../../../assets/dp/default.png')}
                                style={{ marginHorizontal: 5 }} small />
                            <View>
                                <Text style={{ color: '#fff', marginLeft: 6 }}>@{props.userId}</Text>
                                <Input style={{ color: '#fff', width: 200 }}
                                    placeholder='Reply...'
                                    onChange={(event) => setReplyText(event.target.value)}
                                    value={replyText} 
                                    // onSubmitEditing={(text) => setReplyText(text)}
                                />
                            </View>

                            <Icon name='send' style={{ margin: 15 }} onPress={() => {
                                console.log('Reply  : ',replyText)
                                // addReply(props.comment.comment_id, replyText, props.uuid)
                                // setReply(
                                //     [...reply, { content: replyText,comment_id: props.comment.comment_id, created_by: props.uuid }]
                                // )
                            }
                            } />
                        </View>
                    )}

                />
                :
                null
            }


        </Item>
    )
}

export default Comment
