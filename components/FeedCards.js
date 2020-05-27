import React, { useState } from 'react'
import { Button, Card, Text, CardItem, Left, Icon, Body, Right, Thumbnail } from 'native-base'
import { Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { db } from '../config';

const tabHeight = (Platform.OS === 'ios') ? 55 : 60;
const cardHeight = Dimensions.get('window').height - tabHeight - 10;

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

    const [name, setName] = useState('')
    
    const fetchUser = async (user_uid) => {
        db.collection("userDetails")
            .doc(user_uid)
            .get()
            .then(user => {
                var name = user.data().firstname + ' ' + user.data().lastname
                // console.log(typeof(name))
                // return user.data().firstname
                setName(name);
            }).catch(error => console.log(error.message))

    }

    fetchUser(props.post.created_by);

    return (
        <Card style={{ height: cardHeight }}>
            <CardItem>
                <Left>
                    <Thumbnail source={require('../assets/profile.jpeg')} />
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
                source={{uri: props.post.img }}
                style={{ height: 350, flex: 1 }} />

            </CardItem>

            {/* {props.post.isReactions && <RenderReactions isReactions={props.post.isReactions} />} */}

            <CardItem>
                <Left>
                    <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>0 Dislikes</Text>
                    </Button>
                </Left>
                <Body>
                    <Button transparent>
                        <Icon active name="share" />
                        <Text>Share</Text>
                    </Button>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>0 Likes</Text>
                    </Button>
                </Right>
            </CardItem>
            <CardItem cardBody style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 10, paddingBottom: 20 }}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}> Caption : </Text>
                    {props.post.caption}
                </Text>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}> Comment : </Text>
                    0
                </Text>
            </CardItem>

        </Card>
    )
}
export default FeedCards;
