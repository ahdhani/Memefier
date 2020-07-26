import React, { Component, useEffect, useState } from 'react';
import { Card, CardItem, Button, Thumbnail } from 'native-base'
import { View, Text, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUser } from '../../functions/user'

const PostReviewCard = props => {

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

                    <View style={{
                        flexDirection: 'row', padding: 10,
                        justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Thumbnail source={{ uri: item.dp }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text onPress={() => navigation.navigate('ProfileStack', {
                                    screen: 'ProfileScreen',
                                    params: { uuid: item.userId }   //Change later

                                })}>fgjxdgh</Text>
                                <Text note> fh </Text>
                            </View>
                        </View>

                        
                    </View>
                    <CardItem cardBody>
                        <Image resizeMode='contain'
                            source={{ uri: item.dp }}
                            style={{ width: screenWidth, height: postHeight }} />
                    </CardItem>
                    <CardItem style={{justifyContent: 'space-around',}}>
                        <Button style={{
                            padding: 8,paddingHorizontal: 15,
                            backgroundColor: 'red', borderRadius: 5,
                            height: 35 ,
                        }}
                        // onPress={ }
                        >
                            <Text>Reject</Text>
                        </Button>
                        <Button style={{
                            padding: 8,paddingHorizontal: 15,
                            backgroundColor: 'green', borderRadius: 5,
                            height: 35 ,
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