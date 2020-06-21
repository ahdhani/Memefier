import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Picker, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Button, Item, Input, Header, Content, Text, Left, Body, Title, Icon, Thumbnail, Right } from 'native-base'
import colors from '../../../../constants/colors'
import { fetchAllComments, fetchAllReplies, addComment, addReply } from '../../../functions/comments'
import { fetchUserId } from '../../../functions/general'

import { db } from '../../../../config';
import { connect } from 'react-redux'


const Comment = (props) => {

    const [replyText, setReplyText] = useState('')
    const [userId, setUserId] = useState('')
    const [replyIndex, setReplyIndex] = useState()

    useEffect(() => {

        fetchUserId(props.comment.created_by)
            .then(setUserId)
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
    }, []);

    return (
        <Item style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}
        // onPress={() => this.props.navigation.navigate('PostScrollScreen')}
        >
            <View style={{ flexDirection: 'row', width: '100%' }} >
                <Thumbnail small resizeMode='cover'
                    source={require('../../../../assets/dp/default.png')} style={{ margin: 5, marginTop: 10 }} />
                {/* <Thumbnail source={{ uri:  }} />  */}
                <View style={{ margin: 5 }}>
                    <Text style={{ color: '#fff' }}>@{userId}</Text>
                    <Text style={{ color: '#fff' }}>{props.comment.content}</Text>
                </View>
                <Text style={{ position: 'absolute', right: 20, margin: 10, color: colors.color3 }}
                    onPress={() => setReplyIndex(props.index)}
                >Reply</Text>
            </View>


            {/* <FlatList
                // data={item.replies}     /////Reply data
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{
                        flexDirection: 'row', alignItems: 'flex-start',
                    }}
                    >
                        <Thumbnail small resizeMode='cover'
                            source={require('../../../../assets/dp/default.png')} style={{ margin: 5, marginTop: 10 }} />
                        // <Thumbnail source={{ uri:  }} /> 
                        <View style={{ margin: 5, flexGrow: 1 }}>
                            <Text style={{ color: '#fff' }}>@userID</Text>
                            <Text style={{ color: '#fff' }}>{item.reply}</Text>
                        </View>
                    </View>
                )}
                style={{ left: 50, width: '100%' }}
                ListFooterComponent={() => (
                    replyIndex === index ?
                        <View style={{
                            flexDirection: 'row', backgroundColor: '#253237',
                            alignItems: 'center', width: '100%'
                        }}>
                            <Thumbnail resizeMode='cover' source={require('../../../../assets/dp/default.png')}
                                style={{ marginHorizontal: 5 }} small />
                            <View>
                                <Text style={{ color: '#fff', marginLeft: 6 }}>@ahdhani</Text>
                                <Input style={{ color: '#fff', width: 200 }}
                                    placeholder='Reply...'
                                    onChangeText={(text) => setReplyText(text)}
                                    value={replyText} />
                            </View>

                            <Icon name='send' style={{ margin: 15 }} onPress={(index) => this.addReply(index)} />
                        </View>
                        : null
                )}

            /> */}


        </Item>
    )
}

export default Comment

// const mapStateToProps = (state) => ({
//     // user: state.auth.user,
//     // user: state.auth.user,
//     // following: state.auth.following
// })
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // fetchPosts_: () => dispatch(fetchPosts())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Comment)
