import React, { useState, useEffect } from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native'
import { CardItem, Text, Icon,} from 'native-base'
import colors from '../../../constants/colors'
import { likePost, unlikePost, dislikePost, checkReaction, countLike, countDisike } from '../../functions/reactions'

const Like = (props) => {

    const [reaction, setReaction] = useState()
    const [likes, setLikes] = useState()
    const [dislikes, setDislikes] = useState()

    useEffect(() => {
        
        checkReaction(props.postId, props.userId)
            .then(reactions => {
                setReaction(reactions)
                // console.log("Reactions:  ", reactions)

            })
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
        countLike(props.postId)
            .then(like => {
                // console.log("like" , like)
                setLikes(like)
            })
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
        countDisike(props.postId)
            .then(setDislikes)
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
    });

    const likeHandler = async () => {
        var reactions = await checkReaction(props.postId, props.userId)
        // console.log(reactions)
        if (reactions === 0) {
            unlikePost(props.userId, props.postId)
            setLikes(likes-1)
            setReaction(-1)
        }
        else {
            likePost(props.userId, props.postId)
            if(reaction===1)
                setDislikes(dislikes-1)
            setReaction(0)
            setLikes(likes+1)
        }
    }

    const dislikeHandler = async () => {
        var reactions = await checkReaction(props.postId, props.userId)
        // console.log(reactions)
        if (reactions === 1) {
            unlikePost(props.userId, props.postId)
            setDislikes(dislikes-1)
            setReaction(-1)
        }
        else {
            dislikePost(props.userId, props.postId)
            if(reaction===0)
                setLikes(likes-1)
            setReaction(1)
            setDislikes(dislikes+1)
        }
    }

    return (
        <CardItem style={{ justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.button}
                onPress={() => dislikeHandler()}
            >
                <Icon name="thumbs-down" active={false}
                    style={{ color: (reaction === 1) ? colors.color3 : '#ddd', }} />
                <Text>{dislikes}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Icon name="share" style={{ width: 20 }} />
                {/* <Text>Share</Text> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => likeHandler()}
            >
                <Icon name="thumbs-up" active={false}
                    style={{ color: (reaction === 0) ? colors.color3 : "#ddd"}} />
                <Text>{likes}</Text>
            </TouchableOpacity>

        </CardItem>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 3,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#eee',
        zIndex: 3,
        elevation: 3,
    }
});

export default Like
