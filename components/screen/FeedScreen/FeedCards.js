import React, { useState, useEffect, useRef } from 'react'
import { Button, Card, Text, CardItem, Left, Icon, Body, Right, Input } from 'native-base'
import { Image, View, Dimensions, TouchableOpacity, } from 'react-native'
import colors from '../../../constants/colors'
import Reaction from './Reaction'
import PostOptions from './PostOptions'
import { fetchAllComments, addComment } from '../../functions/comments'
import { dateTimeProcessor } from '../../functions/general'
import { fetchGroupDetails } from '../../functions/community'
import { Avatar } from 'react-native-elements';

import { db } from '../../../config';
import { connect } from 'react-redux'

import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
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
    const commentInput = useRef();
    const [name, setName] = useState('')
    // const [name, setName] = useState('')
    const [optionsModal, setOptionsModal] = useState(false)
    const [userComment, setComment] = useState('')
    const [commentOpen, setCommentOpen] = useState(false)
    const [dp, setDp] = useState('https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9')


    const closePostOptions = () => {
        setOptionsModal(false);
    }

    const fetchUser = async (user_uid, category) => {

        if (category == 1) {
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
        } else {
            fetchGroupDetails(user_uid)
                .then(data => {
                    setName(data.name)
                    setDp(data.dp)
                })
        }


    }

    fetchUser(props.post.created_by, props.post.category);

    return (
        <Card style={{ marginBottom: -5, paddingBottom: 10 }} >
            <PostOptions loading={optionsModal} close={() =>
                closePostOptions()} />
            <CardItem>
                <Left>
                    <Avatar rounded source={{ uri: dp }} size={50} />
                    <Body>
                        <Text onPress={() => navigation.navigate('ProfileStack', {
                            screen: 'ProfileScreen',
                            params: { uuid: props.post.created_by, }

                        })}>{name}</Text>
                        {/* <Text note>category</Text> */}
                    </Body>
                </Left>
                <Right>
                    <Button transparent onPress={() => setOptionsModal(true)}>
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

            <Reaction postId={props.post.post_id} userId={props.user.uid}
                dislikeCount={props.post.dislikeCount} likeCount={props.post.likeCount}
                commentCount={props.post.commentCount} commentOpen={() => {
                    setCommentOpen(true);
                }

                } />
            <View style={{
                paddingHorizontal: 10, marginHorizontal: 15,
                backgroundColor: '#eef', borderRadius: 5,
                paddingBottom: 10
            }}
            >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CommentScreen', {
                        postId: props.post.post_id,
                        uuid: props.user.uid,
                        userId: props.userDetails.userId,
                        userDp: props.userDetails.dp,
                    })
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>
                            {props.post.caption}
                        </Text>
                        <Text style={{ color: colors.textNote, fontSize: 12 }}>
                            {dateTimeProcessor(props.post.created_at)}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>
                            More Comments
                        </Text>
                        {props.post.commentCount > 1 &&
                            <Text style={{ color: colors.textNote, fontSize: 12 }}>{props.post.commentCount} Comments
                                <Icon type='AntDesign' name='down' style={{ fontSize: 14 }} />
                            </Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            {
                commentOpen &&
                <View style={{
                    height: 60, flexDirection: 'row', backgroundColor: '#253237',
                    position: 'absolute', bottom: 0, width: screenWidth,
                    zIndex: 6, elevation: 6
                }}>
                    <Input
                        autoFocus
                        blurOnSubmit
                        returnKeyType='send'
                        onSubmitEditing={() =>
                            addComment(props.post.post_id, userComment, props.user.uid)
                                .then(() => {
                                    setComment('');
                                    setCommentOpen(false);
                                })
                        }

                        onBlur={() => setCommentOpen(false)}
                        style={{ color: '#fff' }}
                        placeholder='Comment...'
                        onChangeText={(text) => setComment(text)}
                        value={userComment} />
                    <Icon name='send' style={{ margin: 15 }}
                        onPress={() => {
                            addComment(props.post.post_id, userComment, props.user.uid)
                                .then(() => {
                                    setComment('');
                                    setCommentOpen(false);
                                })
                        }} />
                </View>
            }

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
