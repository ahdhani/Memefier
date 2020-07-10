import React, { Component } from 'react'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, Form } from 'native-base'
import { Image, View, StyleSheet, TextInput, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { storage } from '../../../config';
import { addPost } from '../../../redux';
import { connect } from 'react-redux';
import uuid from 'react-uuid'

class UploadScreen extends Component {
    state = {
        inputTag: '',
        hashLength: 0,
        image: null,
        postOnProgress: false,
        progress: null,

        title: 'My Meme',
        description: "Dedicated to all my friends",
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

    dispTag = () => {                                   //displays the tags in the state array
        return (
            this.state.hashtags.map((hashtag, index) => {
                return (
                    <View style={styles.tag}>
                        <View style={{ maxWidth: 250 }}>
                            <Text numberOfLines={1} style={{ color: 'white' }}>{hashtag}</Text>
                        </View>
                        <MaterialCommunityIcons
                            onPress={() => { this.refreshTag(index) }}
                            style={{ backgroundColor: 'white', borderRadius: 8, marginLeft: 4 }}
                            name="close"
                            color="#3F51B5"
                            size={15}
                        />
                    </View>
                );
            })
        )
    }

    render() {
        let { image } = this.state;
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Create</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Card>

                        <CardItem style={{ paddingBottom: 0 }}>
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

                        {this.state.image!=null ?
                            <CardItem>
                                {image && <Image resizeMode='contain' source={{ uri: image }}
                                    style={{ width: '100%', height: 400 }} />}
                            </CardItem>:null 
                        }

                        <CardItem >
                            <View style={styles.title}>
                                <Input onChangeText={(text) => this.setState({ title: text })}
                                    placeholder='Title...' placeholderTextColor='#ccc'
                                    style={{ fontSize: 15, paddingLeft: 0 }} multiline />
                            </View>
                        </CardItem>

                        <CardItem>
                            <Card style={styles.desc}>
                                <TextInput
                                    onChangeText={(text) => this.setState({ description: text })}
                                    style={{ padding: 5, marginTop: 5 }}
                                    multiline
                                    placeholder='Description...'
                                />
                            </Card>
                        </CardItem>

                        <CardItem>
                            <Card style={styles.tagBox}>
                                <View style={{ maxWidth: '90%', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', marginTop: 5, marginBottom: 5 }}>
                                    {this.dispTag()}
                                    {(this.state.hashLength < 5) ?
                                        <TextInput
                                            style={{ padding: 5 }}
                                            placeholder='Enter Tags...'
                                            returnKeyType='next'
                                            onChangeText={(text) => this.setState({ inputTag: text })}
                                            onSubmitEditing={(event) => {
                                                this.addTag(event.nativeEvent.text);
                                            }}
                                            value={this.state.inputTag}
                                        /> : null}
                                </View>
                            </Card>
                        </CardItem>

                        <CardItem style={{ flexDirection: 'column' }}>
                            <Button block onPress={this.onPost} disabled={this.state.postOnProgress}>
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
                        storage.ref('memes').child(imageName).getDownloadURL().then(url => {
                            // console.log(url);
                            this.props.addPost(url, post_desc)
                            this.setState({
                                ...this.state,
                                image: null,
                                progress: null,
                                postOnProgress: false,
                            })
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
        title: {
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingTop: 0,
            width: '100%'
        },
        desc: {
            paddingLeft: 4,
            height: 100,
            width: '100%',
            padding: 0,
            borderRadius: 8

        },
        tagBox: {
            paddingLeft: 4,
            height: 200,
            width: '100%',
            borderRadius: 8

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

export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen)