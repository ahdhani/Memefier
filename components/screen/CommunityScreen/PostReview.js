import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon } from 'native-base'
import { View, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostReviewCard from './PostReviewCard';
import { fetchGroupPostsForReview} from '../../functions/posts'

const screenWidth = Dimensions.get('window').width;
const postHeight = screenWidth * 1.25;

const PostReview = props => {

    const navigation = useNavigation();
    const [post, setPost] = useState()
    useEffect(() => {
        fetchGroupPostsForReview(props.group_id)
        .then(res => console.log('result: ', res)
            
        )
        // setPost(
        //     [{
        //         userId: 'Kudu',
        //         dp: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2FR5EGajrkyahxpXuizmSlZWt5Frq1?alt=media&token=b1b8d45a-d297-407b-bb87-d6b2ab1b3d61',
        //         firstname: 'hdjsba',
        //         lastname: 'dkjkb',
        //     },]
        // )
    }, []);

    return (
        <FlatList
            style={{ padding: 15 }}
            data={post}
            renderItem={({ item }) => (
                <PostReviewCard />
            )}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default PostReview;