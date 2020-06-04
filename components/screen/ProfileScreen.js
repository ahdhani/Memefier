import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Container, Button, Card, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, H1 } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
// imports for state management
import { connect } from 'react-redux';
import { logoutUser, unfollow_user, follow_user } from '../../redux';
import { storage } from '../../config'

class ProfileScreen extends Component {

    state = {
        user: {
            username: 'kjdsb',
            password: 'laksnf',
            phone: '9526724541',
            firstname: 'askln',
            lastname: 'kasn',
            gender: 'M',
            dob: '2000-01-01',
            avatar: null,
        } ,
        image: null,
        postOnProgress: false,
        progress: null
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
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                const user = this.state.user;
                user.avatar = result.uri;
                this.setState({ user: user });
                this.setState({             //Code added by Hani
                    ...this.state,
                    postOnProgress: true,
                })
/*
                const imageName = 'user'

                try {
                    const response = await fetch(this.state.user.avatar);
                    const blob = await response.blob();
                    
                    const uploadTask  = storage.ref().child("dp/" + imageName).put(blob);
    
                    uploadTask.on('state_changed' , 
                    (snapshot) => {
                        // Progress function
                        var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
                        this.setState({progress: progress})
                        console.log("Progress : " , progress)
                        
                    } ,
                    (error) => {
                        console.log("error");
                    } , 
                    () => {
                        storage.ref('memes').child(imageName).getDownloadURL().then( url => {
                            console.log(url);
                            // this.props.addPost(url , post_desc)
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
     */
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
                
                const uploadTask  = storage.ref().child("memes/" + imageName).put(blob);

                uploadTask.on('state_changed' , 
                (snapshot) => {
                    // Progress function
                    var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
                    this.setState({progress: progress})
                    console.log("Progress : " , progress)
                    // if(progress==100)  //Code added by Hani  //////
                    // this.setState({
                    //     ...this.state,
                    //     image: null,
                    //     progress: null,
                    //     postOnProgress: false,
                    // })
                } ,
                (error) => {
                    console.error(error.message);
                } , 
                () => {
                    storage.ref('memes').child(imageName).getDownloadURL().then( url => {
                        // console.log(url);
                        this.props.addPost(url , post_desc)
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

    signOutClicked = () => {
        this.props.logoutUser()
    }

    // Sarath uid : hxvrXBCpjXY1H7NvdHqZQEohH7o2

    followUser = () => {
        console.log("Follow user clicked");
        this.props.follow("hxvrXBCpjXY1H7NvdHqZQEohH7o2");
    }

    unfollowUser = () => {
        console.log("Unfollow clicked");
        this.props.unfollow("hxvrXBCpjXY1H7NvdHqZQEohH7o2");
    }

    render() {
        // Condition : !this.props.isAuthenticated
        // if (false) {
        // GOTO SignIn
        // }
        // else
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        <Button info onPress={() => this.signOutClicked()}>
                            <Text>SignOut</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <H1 style={{ alignSelf: 'center', marginTop: 30 }}>Rank 0</H1>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ justifyContent: 'center' }}>
                            <H1 style={{ alignSelf: 'center' }}>0</H1>
                            <Text note>Followers</Text>
                        </View>

                        <TouchableOpacity style={{ alignSelf: 'center', marginVertical: 30 }}
                            onPress={() => this._pickImage()}>
                            <Image
                                style={{
                                    paddingVertical: 30,
                                    width: 150,
                                    height: 150,
                                    alignSelf: 'center',
                                    borderRadius: 75,
                                    backgroundColor: '#ccc'
                                }}
                                resizeMode='cover'
                                source={{ uri: this.state.user.avatar }}

                            />
                            {!this.state.user.avatar &&
                                <Icon name='add' style={{ alignSelf: 'center', position: 'absolute', top: 65 }} />}
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'center' }}>
                            <H1 style={{ alignSelf: 'center' }}>{this.props.following.length}</H1>
                            <Text note>Following</Text>
                        </View>
                    </View>

                    <H1 style={{ alignSelf: 'center', }}>
                        {this.props.userDetails.firstname} {this.props.userDetails.lastname}
                    </H1>
                    <Text note style={{ alignSelf: 'center' }}>Description</Text>

                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        // height: 150,
        // width: 150,
        alignSelf: 'center',
        margin: 40,
    },
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userDetails: state.auth.userDetails,
    following: state.auth.following
})

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        unfollow: (user_id) => dispatch(unfollow_user(user_id)),
        follow: (user_id) => dispatch(follow_user(user_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)