import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { CardItem, Text, Icon, } from 'native-base'
import colors from '../../../constants/colors'
import { likePost, unlikePost, dislikePost, checkReaction, } from '../../functions/reactions'
import { useNavigation } from '@react-navigation/native';


const Like = (props) => {

    const navigation = useNavigation();
    const [reaction, setReaction] = useState()

    useEffect(() => {
        checkReaction(props.postId, props.userId)
            .then(reactions => {
                setReaction(reactions)
            })
            .catch(error => {
                console.warn(JSON.stringify(error, null, 2));
            });
    }, []);

    const likeHandler = async () => {
        var reactions = await checkReaction(props.postId, props.userId)
        if (reactions === 0) {
            unlikePost(props.userId, props.postId)
            setReaction(-1)
        }
        else {
            likePost(props.userId, props.postId)
            setReaction(0)
        }
    }

    const dislikeHandler = async () => {
        var reactions = await checkReaction(props.postId, props.userId)
        if (reactions === 1) {
            unlikePost(props.userId, props.postId)
            setReaction(-1)
        }
        else {
            dislikePost(props.userId, props.postId)
            setReaction(1)
        }
    }

    return (
        <CardItem style={{ justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.button}
                onPress={() => dislikeHandler()}
            >
                <Icon name="thumbs-down" active={false}
                    style={{ color: (reaction === 1) ? colors.color3 : '#ddd', }} />
                {reaction === 1 ?
                    <Text>{props.dislikeCount + 1}</Text>
                    :
                    <Text>{props.dislikeCount}</Text>
                }
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text>See Comments {props.commentCount}</Text>
                {/* <Icon name="share" style={{ width: 20 }} /> */}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => likeHandler()}
            >
                <Icon name="thumbs-up" active={false}
                    style={{ color: (reaction === 0) ? colors.color3 : "#ddd" }} />
                {reaction === 0 ?
                    <Text>{props.likeCount + 1}</Text>
                    :
                    <Text>{props.likeCount}</Text>
                }
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
