import React from 'react'
import { Button, Card, Text, CardItem, Left, Icon, Body, Right, Thumbnail } from 'native-base'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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



const FeedCards = (props) => {

    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={require('../assets/profile.jpeg')} />
                    <Body>
                        <Text>{props.post.username}</Text>
                        <Text note>{props.post.category}</Text>
                    </Body>
                </Left>
                <Right>
                    <Button transparent>
                        <Icon active name="menu" />
                    </Button>
                </Right>
            </CardItem>
            <CardItem cardBody>
                <Image resizeMode='contain' source={require('../assets/profile.jpeg')} style={{ height: 350, flex: 1 }} />
            </CardItem>

            {props.post.isReactions && <RenderReactions isReactions={props.post.isReactions} />}

            <CardItem>
                <Left>
                    <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>{props.post.dislikes} Dislikes</Text>
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
                        <Text>{props.post.likes} Likes</Text>
                    </Button>
                </Right>
            </CardItem>
            <CardItem cardBody style={{ flexDirection: 'column', alignItems: 'flex-start', paddingHorizontal: 10 , paddingBottom: 20}}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}> Caption : </Text>
                    {props.post.about}
                </Text>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}> Comment : </Text>
                    {props.post.comment}
                </Text>
            </CardItem>

        </Card>
    )
}
export default FeedCards;
