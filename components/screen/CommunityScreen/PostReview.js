import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon } from 'native-base'
import { View, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const postHeight = screenWidth * 1.25;

const PostReview = props => {

    const navigation = useNavigation();
    const [post, setPost] = useState()
    useEffect(() => {
        setPost(
            [{
                userId: 'Kudu',
                dp: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2FR5EGajrkyahxpXuizmSlZWt5Frq1?alt=media&token=b1b8d45a-d297-407b-bb87-d6b2ab1b3d61',
                firstname: 'hdjsba',
                lastname: 'dkjkb',
            },]
        )
    }, []);

    return (
        <FlatList
            style={{ padding: 15 }}
            data={post}
            renderItem={({ item }) => (
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
            )}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default PostReview;