import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon } from 'native-base'
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewRequests, acceptRequest, deleteRequest } from '../../functions/community'
import MemberReviewCard from './MemberReviewCard'

const MemberReview = props => {

    const navigation = useNavigation();
    const [members, setMembers] = useState()
    useEffect(() => {
        viewRequests(props.group_id)
            .then(res => {
                setMembers(res)
            });
    }, []);

    return (

        <View>
            <FlatList
                style={{ padding: 15 }}
                data={members}
                renderItem={({ item, index }) => (
                    <MemberReviewCard group_id={props.group_id} user_uid={item.user_uid}
                        cardHandled={() => setMembers(members.filter((obj , ind) => index !== ind))} />
                )}
                enableEmptySections={true}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default MemberReview;