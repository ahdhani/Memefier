import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Picker, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Button, Item, Input, Header, Content, Text, Left, Body, Title, Icon, Thumbnail, Right } from 'native-base'
import colors from '../../../../constants/colors'
import { fetchAllComments, fetchAllReplies, addComment, addReply } from '../../../functions/comments'
import { fetchUser } from '../../../functions/general'

import { db } from '../../../../config';
import { connect } from 'react-redux'


const Comment = (props) => {

    const [replyText, setReplyText] = useState('ha')
    const [user, setUser] = useState()
    const [reply, setReply] = useState([])
    const [replyIndex, setReplyIndex] = useState()

    useEffect(() => {
        fetchUser(props.comment.created_by)
            .then(user => console.log("USER : " , user))
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });

        // console.log(props.comment.comment_id)
        fetchAllReplies(props.comment.comment_id)
            .then(res => {
                setReply(res)
                // console.log("Response :\n" , res)
            })
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
        // var replies = [{
        //     content: 'huhu',
        //     created_by: 'TNB7jMDAKrRVJAtnvDLkf5K7jIB3',
        //     comment_id: '4qnfPIOheetLW7MTUZIl',
        // },];
        
        // console.log(reply)


    }, []);

    return (
        <Item style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <View style={{ flexDirection: 'row', width: '100%' }} >
                <Thumbnail small resizeMode='cover'
                    source={{ uri: user.dp }} style={{ margin: 5, marginTop: 10 }} />
                <View style={{ margin: 5 }}>
                    {/* <Text style={{ color: '#fff' }}>@aalknf</Text> */}
                    <Text style={{ color: '#fff' }}>@{user.userId}</Text>
                    <Text style={{ color: '#fff' }}>{props.comment.content}</Text>
                </View>
                <Text style={{ position: 'absolute', right: 20, margin: 10, color: colors.color3 }}
                    onPress={() => setReplyIndex(props.index)}
                >Reply</Text>
            </View>


            <FlatList
                data={reply}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-start',
                    }}
                    >
                        <Thumbnail small resizeMode='cover'
                            source={require('../../../../assets/dp/default.png')} style={{ margin: 5, marginTop: 10 }} />
                        <View style={{ margin: 5, flexGrow: 1 }}>
                            {/* <Text style={{ color: '#fff' }}>@{item.created_by}</Text> */}
                            <Text style={{ color: '#fff' }}>@</Text>
                            <Text style={{ color: '#fff' }}>{item.content}</Text>
                        </View>
                    </View>
                )}
                style={{ left: 50, width: '100%' }}
                ListFooterComponent={() => (
                    // replyIndex === props.index ?
                    <View style={{
                        flexDirection: 'row', backgroundColor: '#253237',
                        alignItems: 'center', width: '100%'
                    }}>
                        <Thumbnail resizeMode='cover' source={require('../../../../assets/dp/default.png')}
                            style={{ marginHorizontal: 5 }} small />
                        <View>
                            <Text style={{ color: '#fff', marginLeft: 6 }}>@{user.userId}</Text>
                            <Input style={{ color: '#fff', width: 200 }}
                                placeholder='Reply...'
                                // onChangeText={(text) => setReplyText(text)}
                                // value={replyText} 
                                onSubmitEditing={(text) => setReplyText(text)}
                            />
                        </View>

                        <Icon name='send' style={{ margin: 15 }} onPress={() => {
                            addReply(props.comment.comment_id, replyText, props.userId)
                            reply ?
                                setReply(
                                    [...reply, { content: replyText, postId: props.comment.comment_id, created_by: props.userId }]
                                )
                                :
                                setReply(
                                    [{ content: replyText, postId: props.comment.comment_id, created_by: props.userId },]
                                )
                        }
                        } />
                    </View>
                    // : null
                )}

            />


        </Item>
    )
}

export default Comment
