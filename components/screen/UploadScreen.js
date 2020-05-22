import React, { Component } from 'react'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
                                <Button transparent>
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
}