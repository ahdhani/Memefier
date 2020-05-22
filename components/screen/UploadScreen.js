import React, { Component } from 'react'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, Form } from 'native-base'
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { storage } from '../../config'


export default class UploadScreen extends Component {
    state = {
        image: null,
    };

    // componentDidMount = () => {
    //     this.setState({
    //         image: 'null'
    //     })
    // }

    render() {
        let { image } = this.state;

        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Discover</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>

                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('../../assets/profile.jpeg')} />
                                <Body>
                                    <Text>@arjyou</Text>
                                    <Text note>Roasting fukru</Text>
                                </Body>
                            </Left>
                            <Right>
                                <Button transparent onPress={this.onPost}>
                                    <Text>Post</Text>
                                </Button>

                            </Right>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'column' }}>
                            {image && <Image resizeMode='contain' source={{ uri: image }}
                                style={{ width: '100%', height: 400 }} />}
                            <Button transparent block onPress={this._pickImage}>
                                <Text>Select Image</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    onPost = async () => {
        if (this.state.image != null) {
            console.log("Image present and upload clicked")
            // Hard Coded post description and image_name
            const imageName = "picture_000"
            var post_desc = "Hi all! good morning"
            console.log("IMAGE_URI : ", this.state.image)
            try {
                const response = await fetch(this.state.image);
                const blob = await response.blob();
                
                var ref = storage.ref().child("memes/" + imageName);
                ref.put(blob);
            } catch (error) {
                // Make a state variable error and append the `error.message` from here to it
                console.log(error.message);
            }

            // return ref.put(response)

        } else {
            console.log("Image uri not present Raise Error")
        }

    }
}