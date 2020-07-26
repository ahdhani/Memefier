import React, { Component, useEffect, useState } from 'react';
import { Card, CardItem, Button, Thumbnail, Item } from 'native-base'
import { View, Text, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUser } from '../../functions/user'


const screenWidth = Dimensions.get('window').width;
const postHeight = screenWidth * 1.25;

const PostReviewCard = props => {

    const [user, setUser] = useState({})
    navigation = useNavigation()

    useEffect(() => {

        fetchUser(props.post.group_member)
            .then(res => {
                setUser(res)
            });

    }, []);

    return (

        <Card>
            <View style={{
                flexDirection: 'row', padding: 10,
                justifyContent: 'space-between', alignItems: 'center'
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Thumbnail source={{ uri: user.dp }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text
                            onPress={() => navigation.navigate('ProfileStack', {
                                screen: 'ProfileScreen',
                                params: { uuid: props.post.group_member }
                            })}
                            style={{ fontSize: 18}}>@{user.userId}</Text>
                        <Text style={{ color: '#888' }}>{user.firstname} {user.lastname}</Text>
                    </View>
                </View>


            </View>
            <CardItem cardBody>
                <Image resizeMode='contain'
                    source={{ uri: props.post.img }}
                    style={{ width: screenWidth, height: postHeight }} />
            </CardItem>
            <CardItem style={{ justifyContent: 'space-around', }}>
                <Button style={{
                    padding: 8, paddingHorizontal: 15,
                    backgroundColor: 'red', borderRadius: 5,
                    height: 35,
                }}
                // onPress={ }
                >
                    <Text>Reject</Text>
                </Button>
                <Button style={{
                    padding: 8, paddingHorizontal: 15,
                    backgroundColor: 'green', borderRadius: 5,
                    height: 35,
                }}
                // onPress={ }
                >
                    <Text>Accept</Text>
                </Button>
            </CardItem>
        </Card>
    )
}

export default PostReviewCard;