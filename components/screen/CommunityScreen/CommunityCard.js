import React, { Component, useEffect, useState } from 'react';
import { Card, CardItem, Button,Thumbnail } from 'native-base'
import { View, Text, } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { fetchGroupDetails } from '../../functions/community'

const CommunityCard = props => {

    const [group, setGroup] = useState({})

    useEffect(() => {
        // console.log('grp id',props.group_id)

        fetchGroupDetails(props.group_id)
            .then(res => {
                setGroup(res)
                // console.log(res)
            });

    }, []);

    return (

        <Card style={{ borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
            <CardItem style={{ marginLeft: 10, width: '100%' }}>
                <Thumbnail source={{ uri: group.dp }} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{group.name}</Text>
                    <Text style={{ color: '#aaa' }}>{group.members} members</Text>
                </View>
            </CardItem>
        </Card>
    )
}

export default CommunityCard;