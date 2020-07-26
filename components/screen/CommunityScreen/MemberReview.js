import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon } from 'native-base'
import { View, FlatList, Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewRequests ,acceptRequest,deleteRequest} from '../../functions/community'
import MemberReviewCard from './MemberReviewCard'

const MemberReview = props => {

    const navigation = useNavigation();
    const [members, setMembers] = useState()
    useEffect(() => {
        viewRequests(props.group_id)
            .then(res => {
                setMembers(res)
                // console.log('ViewRequest : ', res)
            });
    }, []);

    return (
        <FlatList
            style={{ padding: 15 }}
            data={members}
            renderItem={({ item,index }) => (
                <MemberReviewCard group_id= {props.group_id} user_uid={item.user_uid} 
                    cardHandled = {(index) => this.setState({members: members.splice(index)})}/>
                // <Card>
                //     <TouchableOpacity style={{position: 'absolute',top: 5,right: 5}}
                //         onPress={() => deleteRequest(props.group_id,item.user_uid)}>
                //         <Icon active name="close" style={{fontSize: 18}}/>
                //     </TouchableOpacity>

                //     <View style={{ flexDirection: 'row', padding: 10,
                //                  justifyContent: 'space-between', alignItems: 'center'}}>
                //         <View style={{ flexDirection: 'row' }}>
                //             <Thumbnail source={{ uri: item.dp }} />
                //             <View style={{ marginLeft: 10 }}>
                //                 <Text onPress={() => navigation.navigate('ProfileStack', {
                //                     screen: 'ProfileScreen',
                //                     params: { uuid: item.userId }   //Change later

                //                 })}>@{item.userId}</Text>
                //                 <Text note>{item.firstname} {item.lastname}</Text>
                //             </View>
                //         </View>
                //         <Button style={{
                //             padding: 8, right: 20,
                //             backgroundColor: 'green', borderRadius: 5,
                //             height: 35 ,
                //         }}
                //         onPress={() => acceptRequest(props.group_id,item.userId)}
                //         >
                //             <Text>Accept</Text>
                //         </Button>
                //     </View>
                // </Card>
            )}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default MemberReview;