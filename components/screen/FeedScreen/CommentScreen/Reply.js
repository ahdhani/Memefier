import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Picker, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Button, Item, Input, Header, Content, Text, Left, Body, Title, Icon, Thumbnail, Right } from 'native-base'
import colors from '../../../../constants/colors'
import { fetchAllComments, fetchAllReplies, addComment, addReply } from '../../../functions/comments'
import { fetchUser } from '../../../functions/general'

import { db } from '../../../../config';
import { connect } from 'react-redux'


const Reply = (props) => {

    const [user, setUser] = useState()

    useEffect(() => {

        async () => await fetchUser(props.reply.created_by)
            .then(setUser)
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
        console.log(user)
    }, []);

    // if (replyIndex === index)
    return (
        <View style={{
            flexDirection: 'row', alignItems: 'flex-start',
        }}
        >
            <Thumbnail small resizeMode='cover'
                source={{ uri: user.dp }} style={{ margin: 5, marginTop: 10 }} />
            <View style={{ margin: 5, flexGrow: 1 }}>
                <Text style={{ color: '#fff' }}>@{user.userId}</Text>
                <Text style={{ color: '#fff' }}>{props.reply.content}</Text>
            </View>
        </View>
    )
}

export default Reply
