import React, { Component } from 'react'
import { Container, Button, Card, Text, CardItem, Input, Header, Spinner, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, Form } from 'native-base'
import { Image, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { storage } from '../../../../config';
import { addPost } from '../../../../redux';
import { connect } from 'react-redux';
import uuid from 'react-uuid'
import * as Animatable from 'react-native-animatable'

class CreatePost extends Component {
    state = {
        inputTag: '',
        hashLength: 0,
        image: null,
        postOnProgress: false,
        progress: null,
        titleError: false,

        title: '',
        description: "",
        hashtags: [],


        post: {                 // NEED TO BE CHANGED TO THIS STATE FROM ABOVE
            id: 0,
            username: '@arjyou',
            profileImage: null,
            category: 'Fukru Roasting',
            memeImage: null,
            error: '',
            likes: 3,
            dislikes: 4,
            about: 'Pwoli Saanam',
            comment: '2',
            isReactions: false,
            reactions: [
                {
                    index: 0,
                    Reactioncount: 1,
                },
                {
                    index: 1,
                    Reactioncount: 1,
                },
            ],
            hashtags: [

            ]
        },
    };

    addTag = (text) => {                                  //adds the tag input to state array
        this.setState({
            hashtags: [...this.state.hashtags, text],
            inputTag: '',
            hashLength: this.state.hashLength + 1
        });
    }

    refreshTag = (index) => {                            //set the state array after removing deleted tag
        this.state.hashtags.splice(index, 1);
        this.setState({
            hashtags: this.state.hashtags,
            hashLength: this.state.hashLength - 1
        })
    }

    render() {
        let { image } = this.state;
        return (
            <Container>
                
                <Content>
                    <Card>

                        <CardItem>
                            <Left>
                                <Thumbnail resizeMode='cover' source={{ uri: this.props.userDetails.dp }} />
                                <Body>
                                    <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 21, fontWeight: '500' }}>@{this.props.userDetails.userId}</Text>
                                    {/* <Text note>Roasting fukru</Text> */}
                                </Body>
                            </Left>
                            <Right >
                                <Button transparent>
                                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                        <Button transparent
                                            style={{ width: 50 }}
                                            block
                                            onPress={this._pickImage}
                                        >
                                            <MaterialCommunityIcons name='image-plus' color="rgba(0,0,0,0.4)" size={32} />
                                        </Button>
                                    </View>
                                </Button>
                            </Right>
                        </CardItem>

                        <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Card style={styles.inputBox}>
                                <Input onChangeText={(text) => this.setState({ title: text })}
                                    placeholder='Title...' placeholderTextColor='#ccc'
                                    style={{ fontSize: 15, paddingLeft: 0 }} multiline maxLength={50} />
                            </Card>
                            {this.state.titleError ?
                                <Animatable.View animation='fadeIn' duration={500}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>*Title must not be empty</Text>
                                </Animatable.View> : null
                            }
                        </CardItem>

                        {this.state.image != null &&
                            <CardItem cardBody>
                                {image && <Image resizeMode='contain' source={{ uri: image }}
                                    style={{ width: '100%', height: 400 }} />}
                            </CardItem>
                        }

                        <CardItem >
                            <Card style={styles.inputBox}>
                                <TextInput
                                    onChangeText={(text) => this.setState({ description: text })}
                                    style={{ padding: 5, marginTop: 5 }}
                                    multiline
                                    placeholder='Description...'
                                    maxLength={2200}
                                />
                            </Card>
                        </CardItem>

                        <CardItem>
                            <Card style={styles.inputBox}>
                                <View style={{ maxWidth: '90%', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', marginTop: 5, marginBottom: 5 }}>
                                    {this.state.hashtags.map((hashtag, index) => {
                                        return (
                                            <TouchableOpacity style={styles.tag} onPress={() => { this.refreshTag(index) }}>
                                                <Text style={{ color: 'white' }}>{hashtag}</Text>
                                                <MaterialCommunityIcons
                                                    style={{ backgroundColor: 'white', borderRadius: 8, marginLeft: 5 }}
                                                    name="close"
                                                    color="#3F51B5"
                                                    size={15}
                                                />
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                                {(this.state.hashLength < 5) &&
                                    <TextInput
                                        style={{ padding: 5, marginVertical: 5 }}
                                        placeholder='Hashtags...'
                                        returnKeyType='next'
                                        onChangeText={(text) => this.setState({ inputTag: text })}
                                        onSubmitEditing={(event) => {
                                            this.addTag(event.nativeEvent.text);
                                        }}
                                        value={this.state.inputTag}
                                    />}
                            </Card>
                        </CardItem>

                        <CardItem style={{ flexDirection: 'column' }}>
                            <Button
                                block
                                onPress={() => {
                                    if (this.state.title.length != 0 && this.state.image != null) {
                                        this.setState({
                                            titleError: false
                                        });
                                        this.onPost;
                                    }
                                    else {
                                        if (this.state.image == null) {
                                            Alert.alert('OOPS!', 'You haven\'t selected the image yet.')
                                        }
                                        else if (this.state.title.length == 0)
                                            this.setState({
                                                titleError: true
                                            })
                                    }
                                }}
                                disabled={this.state.postOnProgress}
                            >
                                <Text>Post</Text>
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

    onPost = async () => {

        if (this.state.image != null) {
            this.setState({             //Code added by Hani
                ...this.state,
                postOnProgress: true,
            })
            // console.log("Image present and upload clicked")
            // Hard Coded post description and image_name
            const imageName = uuid()
            var post_desc = this.state.description
            // console.log("IMAGE_URI : ", this.state.image)
            try {
                const response = await fetch(this.state.image);
                const blob = await response.blob();

                const uploadTask = storage.ref().child("memes/" + imageName).put(blob);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Progress function
                        var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        this.setState({ progress: progress })
                        console.log("Progress : ", progress)
                    },
                    (error) => {
                        console.error(error.message);
                    },
                    () => {
                        storage.ref('memes').child(imageName).getDownloadURL().then(async url => {
                            // console.log(url);
                            await this.props.addPost(url, post_desc)
                            this.setState({
                                ...this.state,
                                image: null,
                                progress: null,
                                postOnProgress: false,
                            })
                            this.props.navigation.goBack()
                        })
                    })
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

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (img_url, caption) => dispatch(addPost(img_url, caption))
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.auth.userDetails,
    following: state.auth.following
})

const styles = StyleSheet.create(
    {
        inputBox: {
            width: '100%',
            padding: 5,
            borderRadius: 8,
            margin: 0
        },
        tag: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: 1,
            padding: 5,
            borderRadius: 6,
            backgroundColor: '#3F51B5'
        }
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)