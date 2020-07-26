import React, { Component } from 'react'
import { Image, View, StyleSheet, TextInput, Alert } from 'react-native'
import { Container, Button, Card, Text, CardItem, Header,Content, Left,Body, Right, Title} from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'
import * as Animatable from 'react-native-animatable'
import { createGroupPost } from '../../functions/posts'

class CreatePost extends Component {
    state = {
        image: null,
        DescError: false,
        description: ""
    };

    handleSubmit = () => {
        if (this.state.description.length != 0 && this.state.image != null) {
            this.setState({
                DescError: false
            });
            createGroupPost(this.props.route.params.user_uid,
                this.props.route.params.group_id,this.state.image,this.state.description)
            .then(this.props.navigation.goBack())
            // this.onPost;
        }
        else {
            if (this.state.image == null) {
                Alert.alert('OOPS!', 'You haven\'t selected the image yet.')
            }
            else if (this.state.description.length == 0)
                this.setState({
                    DescError: true
                })
        }
    }
    render() {
        let { image } = this.state;
        return (
            <Container>
                <Content>
                    <Card>

                        {this.state.image == null ?
                            <CardItem>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        onPress={this._pickImage}
                                        name='image-plus'
                                        color="rgba(0,0,0,0.4)"
                                        size={200}
                                    />
                                </View>
                            </CardItem>

                            :

                            <CardItem cardBody>
                                {image && <Image resizeMode='contain' source={{ uri: image }}
                                    style={{ width: '100%', height: 400 }} />}
                            </CardItem>
                        }

                        <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            {/* <Card style={styles.inputBox}> */}
                                <TextInput
                                    onChangeText={(text) => this.setState({ description: text })}
                                    style={{ padding: 18, marginTop: 5 ,width: '100%',maxHeight: 150}}
                                    underlineColorAndroid='#ccc'
                                    multiline
                                    placeholder='Description...'
                                    maxLength={2200}
                                />
                            {/* </Card> */}
                            {this.state.DescError ?
                                <Animatable.View animation='fadeIn' duration={500}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>*Description must not be empty</Text>
                                </Animatable.View> : null
                            }
                        </CardItem>

                        <CardItem style={{ flexDirection: 'column' }}>
                            <Button
                                block
                                onPress={() => this.handleSubmit()}
                            >
                                <Text>Create</Text>
                            </Button>
                        </CardItem>

                    </Card>
                </Content>
            </Container>
        )
    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 5],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }

            // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

}

const styles = StyleSheet.create(
    {
        inputBox: {
            width: '100%',
            padding: 5,
            borderRadius: 8,
            margin: 0,
            minHeight: 135
        }
    }
);

export default CreatePost;
