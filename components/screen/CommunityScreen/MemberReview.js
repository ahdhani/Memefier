import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon } from 'native-base'
import { View, FlatList, Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewRequests ,acceptRequest,deleteRequest} from '../../functions/community'

const MemberReview = props => {

    const navigation = useNavigation();
    const [members, setMembers] = useState()
    useEffect(() => {
        viewRequests(props.group_id)
            .then(res => {
                // setMembers(res)
                console.log('ViewRequest : ', res)
            });
        setMembers(
            [{
                userId: 'Kudu',
                dp: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2FR5EGajrkyahxpXuizmSlZWt5Frq1?alt=media&token=b1b8d45a-d297-407b-bb87-d6b2ab1b3d61',
                firstname: 'hdjsba',
                lastname: 'dkjkb',
            },
            {
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
            data={members}
            renderItem={({ item }) => (
                <Card>
                    <TouchableOpacity style={{position: 'absolute',top: 5,right: 5}}
                        onPress={() => deleteRequest(props.group_id,item.userId)}>
                        <Icon active name="close" style={{fontSize: 18}}/>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', padding: 10,
                                 justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Thumbnail source={{ uri: item.dp }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text onPress={() => navigation.navigate('ProfileStack', {
                                    screen: 'ProfileScreen',
                                    params: { uuid: item.userId }   //Change later

                                })}>@{item.userId}</Text>
                                <Text note>{item.firstname} {item.lastname}</Text>
                            </View>
                        </View>
                        <Button style={{
                            padding: 8, right: 20,
                            backgroundColor: 'green', borderRadius: 5,
                            height: 35 ,
                        }}
                        onPress={() => acceptRequest(props.group_id,item.userId)}
                        >
                            <Text>Accept</Text>
                        </Button>
                    </View>
                </Card>
            )}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default MemberReview;