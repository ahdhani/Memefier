import React, { useState, useEffect } from 'react'
import { Button, Card, Text, CardItem, Left, Icon, Body, Right, Thumbnail, Input } from 'native-base'
import { Image, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../../../constants/colors'
import Reaction from './Reaction'

import { db } from '../../../config';
import { connect } from 'react-redux'

import { useNavigation } from '@react-navigation/native';

const tabHeight = 55;

const screenWidth = Dimensions.get('window').width;
const cardHeight = Dimensions.get('window').height - tabHeight - 10;
const postHeight = screenWidth * 1.25;

// RenderReactions = (props) => {
//     return (
//         <CardItem style={{ justifyContent: 'space-around' }}>
//             <TouchableOpacity style={{ flex: 1 }} >
//                 <Thumbnail large circular source={require('../assets/profile.jpeg')} />
//             </TouchableOpacity>
//             <TouchableOpacity style={{ flex: 1 }} >
//                 <Thumbnail large circular source={require('../assets/profile.jpeg')} />
//             </TouchableOpacity>
//             <TouchableOpacity style={{ flex: 1 }} >
//                 <Thumbnail large circular source={require('../assets/profile.jpeg')} />
//             </TouchableOpacity>
//             <TouchableOpacity style={{ flex: 1 }} >
//                 <Thumbnail large circular source={require('../assets/profile.jpeg')} />
//             </TouchableOpacity>
//         </CardItem>
//     );
// }
// props.post.created_by

const FeedCards = (props) => {

    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [userComment, setComment] = useState('')
    const [dp, setDp] = useState('https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9')

    // useEffect(() => {

    // }, []);

    const fetchUser = async (user_uid) => {
        db.collection("userDetails")
            .doc(user_uid)
            .get()
            .then(user => {
                var name = user.data().firstname + ' ' + user.data().lastname
                // console.log(typeof(name))
                // return user.data().firstname
                // console.log(user.data())
                setName(name);
                setDp(user.data().dp)
            }).catch(error => console.log(error.message))
    }

    fetchUser(props.post.created_by);

    return (
        <Card style={{ height: cardHeight, justifyContent: 'space-between' }} >
            <CardItem>
                <Left>
                    <Thumbnail source={{ uri: dp }} />
                    <Body>
                        <Text>{name}</Text>
                        <Text note>category</Text>
                    </Body>
                </Left>
                <Right>
                    <Button transparent>
                        <Icon active name="menu" />
                    </Button>
                </Right>
            </CardItem>
            <CardItem cardBody>

                <Image resizeMode='contain'
                    source={{ uri: props.post.img }}
                    style={{ width: screenWidth, height: postHeight }} />

            </CardItem>

            {/* {props.post.isReactions && <RenderReactions isReactions={props.post.isReactions} />} */}

            <Reaction postId={props.post.post_id} userId={props.user.uid}/>
            <CardItem cardBody style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}> Caption : </Text>
                    {props.post.caption}
                </Text>
                <Text onPress={() => {
                    navigation.navigate('CommentScreen', {
                        postId: props.post.post_id,
                        uuid: props.user.uid,
                        userId: props.userDetails.userId,
                    })
                }}>
                    <Text style={{ fontWeight: 'bold' }}> Comment : </Text>
                    More Comments{props.user.uid}
                </Text>

            </CardItem>
            <View style={{ height: 60, flexDirection: 'row', backgroundColor: '#253237' }}>
                <Input style={{ color: '#fff' }}
                    placeholder='Comment...'
                    onChangeText={(text) => setComment(text)}
                    value={userComment} />
                <Icon name='send' style={{ margin: 15 }} />
            </View>


        </Card>
    )
}

const mapStateToProps = (state) => ({
    userDetails: state.auth.userDetails,
    user: state.auth.user,
    // following: state.auth.following
})
const mapDispatchToProps = (dispatch) => {
    return {
        // fetchPosts_: () => dispatch(fetchPosts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedCards)
// export default FeedCards;
