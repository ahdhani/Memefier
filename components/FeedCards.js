import React, { useState, useEffect } from 'react'
import { Button, Card, Text, CardItem, Left, Icon, Body, Right, Thumbnail, Input } from 'native-base'
import { Image, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../constants/colors'

import { db } from '../config';
import { connect } from 'react-redux'

import { likePost, unlikePost, dislikePost, checkReaction, countLike, countDisike } from './functions/reactions'

import { useNavigation } from '@react-navigation/native';

const tabHeight = 55;

const screenWidth = Dimensions.get('window').width;
const cardHeight = Dimensions.get('window').height - tabHeight - 10;
const postHeight = screenWidth * 1.25;

RenderReactions = (props) => {
    return (
        <CardItem style={{ justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ flex: 1 }} >
                <Thumbnail large circular source={require('../assets/profile.jpeg')} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} >
                <Thumbnail large circular source={require('../assets/profile.jpeg')} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} >
                <Thumbnail large circular source={require('../assets/profile.jpeg')} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} >
                <Thumbnail large circular source={require('../assets/profile.jpeg')} />
            </TouchableOpacity>
        </CardItem>
    );
}
// props.post.created_by

const FeedCards = (props) => {

    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [reaction, setReaction] = useState()
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [userComment, setComment] = useState('')
    const [dp, setDp] = useState('https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9')


    // const fetchData = async () => {
    //     try {
    //         const response = await fetch('http://localhost/wptest2/?rest_route=/delayedCoupons/1.0/loadAllCoupons');
    //         const data = await response.json();

    //         return data;
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    useEffect(() => {
        countLike(props.post.post_id)
            .then(setLikes)
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
        countDisike(props.post.post_id)
            .then(setDislikes)
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
        checkReaction(props.user.uid,props.post.post_id)
            .then(setReaction
                )
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
    }, []);

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

    const likeHandler = async () => {
        var reactions = await checkReaction(props.post.post_id,props.user.uid )
        console.log(reactions)
        if (reactions === 0) {
            unlikePost(props.user.uid,props.post.post_id)
            setReaction(-1)
        }
        else {
            likePost(props.user.uid,props.post.post_id)
            setReaction(0)
        }
    }

    const dislikeHandler = async () => {
        var reactions = await checkReaction(props.post.post_id,props.user.uid)
        console.log(reactions)
        if (reactions === 1) {
            unlikePost(props.user.uid,props.post.post_id)
            setReaction(-1)
        }
        else {
            dislikePost(props.user.uid,props.post.post_id)
            setReaction(1)
        }
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

            <CardItem style={{ justifyContent: 'space-around' }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => dislikeHandler()}
                >
                    <Icon name="thumbs-down" active={false}
                        style={{ color: (reaction === 1) ? colors.color3 : colors.color1, }} />
                    <Text>{reaction === 1 ? dislikes + 1 : dislikes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Icon name="share" style={{ width: 20 }} />
                    {/* <Text>Share</Text> */}
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => likeHandler()}
                >
                    <Icon name="thumbs-up" active={false}
                        style={{ color: (reaction === 0) ? colors.color3 : colors.color1 }} />
                    <Text>{reaction === 0 ? likes + 1 : likes}</Text>
                </TouchableOpacity>

            </CardItem>
            <CardItem cardBody style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}> Caption : </Text>
                    {props.post.caption}
                </Text>
                <Text onPress={() => { navigation.navigate('CommentScreen') }}>
                    <Text style={{ fontWeight: 'bold' }}> Comment : </Text>
                    0 | {props.post.post_id}
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

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 3,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#cccccc55',
    }
});

const mapStateToProps = (state) => ({
    // user: state.auth.user,
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
