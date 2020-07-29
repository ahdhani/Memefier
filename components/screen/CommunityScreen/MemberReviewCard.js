import React, { Component, useEffect, useState } from 'react';
import { Card, CardItem, Button, Thumbnail,Icon } from 'native-base'
import { View, Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUser } from '../../functions/user'
import { deleteRequest, acceptRequest } from '../../functions/community'
import colors from '../../../constants/colors'

const MemberReviewCard = props => {

    const [user, setUser] = useState({})
    navigation = useNavigation()

    useEffect(() => {

        fetchUser(props.user_uid)
            .then(res => {
                setUser(res)
            });

    }, []);

    return (

        <Card>
            <TouchableOpacity style={{ position: 'absolute', top: 7, right: 7 }}
                onPress={() => deleteRequest(props.group_id, props.user_uid)
                    .then(props.cardHandled())
                }>
                <Icon active name="close" style={{ fontSize: 18 }} />
            </TouchableOpacity>

            <View style={{
                flexDirection: 'row', padding: 10,
                justifyContent: 'space-between', alignItems: 'center'
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Thumbnail source={{ uri: user.dp }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text onPress={() => navigation.navigate('ProfileStack', {
                            screen: 'ProfileScreen',
                            params: { uuid: props.user_uid }   

                        })} style={{ fontSize: 18 }}>@{user.userId}</Text>
                        <Text style={{ color: '#aaa' }}>{user.firstname} {user.lastname}</Text>
                    </View>
                </View>
                <Button style={{
                    padding: 8, right: 20,
                    backgroundColor: colors.green, borderRadius: 5,
                    height: 35,
                }}
                    onPress={() => acceptRequest(props.group_id, props.user_uid)
                        .then(props.cardHandled())
                    }
                >
                    <Text>Accept</Text>
                </Button>
            </View>
        </Card>
    )
}

export default MemberReviewCard;