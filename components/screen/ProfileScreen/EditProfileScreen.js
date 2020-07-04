import React, { Component } from 'react'
import { View, StyleSheet, Picker, TextInput, Image, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Root, Container, Button, Form, Label, Item, Input, Header, Content, Text, Left, DatePicker, Body, Right, Title, Icon, Spinner } from 'native-base'
import LoaderModal from '../LoaderModal'
import {changeDisplayPicture} from '../../../redux'

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { connect } from "react-redux";
import { db, storage } from '../../../config'
import { updateUserDetails } from '../../../redux';


class EditProfileScreen extends Component {

    state = {
        userId: this.props.userDetails.userId,
        firstname: this.props.userDetails.firstname,
        lastname: this.props.userDetails.lastname,
        bio: this.props.userDetails.bio,
        dp: this.props.userDetails.dp,
        gender: this.props.userDetails.gender,
        dob: new Date(1999, 1, 1),
        userIdValid: true,
        isLoading: false,
        progress: 0,
        datePickerVisible: false,
        dpLoaded: true,
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
                this.setState({ dpLoaded: false })

                // console.log("URI :" , result.uri)
                // this.setState({ dp: result.uri });
                const IMG_URI = result.uri;
                console.log("IMG URI : " , IMG_URI)
                const imageName = this.props.user.uid;
                try {
                    const response = await fetch(IMG_URI);
                    const blob = await response.blob();

                    const uploadTask = storage.ref().child("dp/" + imageName).put(blob);
                    // setLoading(true)
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
                        // Profile picture uploaded success ===============================================================
                        () => {
                            // setLoading(false)
                            storage.ref('dp').child(imageName).getDownloadURL().then(url => {
                                this.setState({
                                    dp: url,
                                    dpLoaded: true,
                                })
                                this.props.changeDisplayPicture(url)
                            })
                        })
                } catch (error) {
                    console.log("ERR :", error.message)
                }
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    onChangeUserId = async (text) => {              //Please resolve the await problem 
        //setstate clashes two consecutive query
        console.log('text ', text)
        console.log('user ', this.state.userId)
        this.setState({ userId: text }, async () => {
            console.log('userAfter ', this.state.userId)
            if (this.state.userId != '') {
                await db.collection('userId').doc(this.state.userId)
                    .get()
                    .then((doc) => {
                        if (doc.exists && this.state.userId !== this.props.userDetails.userId) {
                            this.setState({
                                userIdValid: false
                            });
                        } else {
                            // doc.data() will be undefined in this case
                            this.setState({
                                userIdValid: true
                            });
                        }
                    })
                    .catch(error => console.log("ERR:", error.message))
            }
            else {
                this.setState({
                    userIdValid: false
                });
            }
        });

    }

    isValidUserId = () => {
        // if (this.state.userId != '') {
        //     return this.state.userIdValid
        // }
        // else {
        //     this.setState({
        //         userIdValid: false
        //     }, () => alert('Invalid User ID'));
        //     return false
        // }

        if(this.state.userIdValid)
            return true
        else{
            alert('Invalid User ID')
            return false
        }
    }

    saveUserdetails = async () => {

        this.setState({
            isLoading: true,
        })
        console.log(this.isValidUserId(),' ', (this.state.lastname !== '') , '  ', (this.state.firstname !== ''))
        if (this.isValidUserId() && (this.state.lastname !== '') && (this.state.firstname !== '')) {
            await this.props.updateUser({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                bio: this.state.bio,
                userId: this.state.userId,
                dp: this.state.dp,
                gender: this.state.gender,
                dob: this.state.dob,
            })
            this.props.navigation.goBack();

        }
        // console.log(this.props.userDetails)

        this.setState({ isLoading: false });
    }
    // { if.this.props.mail ? 
    //     [
    //         <Route key={0} path="inbox" component={Inbox} />,
    //         <Route key={1} path="contacts" component={Contacts} />
    //     ]
    // : null }

    // { if.this.props.mail ? 
    //     <React.Fragment>
    //         <Route path="inbox" component={Inbox} />,
    //         <Route path="contacts" component={Contacts} />
    //     </React.Fragment>
    // : null }

    // spinner = () => {
    //     return (<Spinner />
    //     <Text>{this.state.progress}</Text>)
    // }

    render() {

        return (
            <Container>
                <LoaderModal loading={this.state.isLoading} />
                <Header style={{ backgroundColor: '#252337' }}>
                    <Left >
                        <Icon style={{ marginLeft: 10, color: '#fff' }} name='ios-arrow-round-back'
                            onPress={() => this.props.navigation.goBack()} />
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                </Header>
                <Content style={{
                    backgroundColor: '#253237',
                }}>
                    <View style={{
                        alignContent: 'center',
                        padding: 10,
                    }}>
                        <TouchableOpacity style={{
                            alignSelf: 'center', width: 150,
                            height: 150, borderRadius: 75,
                            marginVertical: 30,
                        }} onPress={() => this._pickImage()}
                        >
                            <Image
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 75,
                                    backgroundColor: '#5c6b73',
                                }}
                                resizeMode='cover'
                                source={{ uri: this.state.dp }}

                            />
                        </TouchableOpacity>

                        {!this.state.dpLoaded ?
                            <View>
                                <Spinner />
                                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 10 }}>{this.state.progress}%</Text>
                            </View>
                            : null}



                        <Form>
                            <Item stackedLabel error={this.state.userIdValid === false}>
                                <Label>UserID</Label>
                                <Input style={{ color: '#fff' }}
                                    autoCapitalize='none'
                                    error="#f99"
                                    value={this.state.userId}
                                    onChangeText={(text) => this.onChangeUserId(text)} />
                            </Item>
                            <View style={{ flexDirection: 'row' }} >
                                <Item stackedLabel style={{ flex: 1 }} error={(this.state.firstname === '')}>
                                    <Label>First Name</Label>
                                    <Input style={{ color: '#fff' }}
                                        error="#f99"
                                        onChangeText={(text) => this.setState({ firstname: text })}
                                        value={this.state.firstname} />
                                </Item>
                                <Item stackedLabel style={{ flex: 1 }} error={(this.state.lastname === '')}>
                                    <Label>Last Name</Label>
                                    <Input style={{ color: '#fff' }}
                                        error="#f99"
                                        onChangeText={(text) => this.setState({ lastname: text })}
                                        value={this.state.lastname} />
                                </Item>
                            </View>
                            <View style={{ marginLeft: 15, marginTop: 10 }}>
                                <Label style={{
                                    color: '#555', fontSize: 15,
                                }}>Bio</Label>
                                <TextInput numberOfLines={5} multiline maxLength={50} style={{
                                    color: '#fff', height: 100,
                                    textAlignVertical: 'top', borderWidth: 1,
                                    borderColor: '#ffffff88', marginTop: 5,
                                    padding: 10
                                }}
                                    onChangeText={(text) => this.setState({ bio: text })}
                                    error="#f99"
                                    value={this.state.bio} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }} >
                                <View style={{ flex: 1, marginLeft: 14, marginTop: 8 }}>
                                    <Label style={{ color: '#555', fontSize: 15, }}>Date of birth</Label>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ datePickerVisible: true })}
                                        style={{ height: 50 }}
                                    >
                                        <Input
                                            style={{ color: '#fff' }}
                                            editable={false}
                                            value={this.state.dob.toLocaleDateString()}
                                        />
                                    </TouchableOpacity>

                                    {this.state.datePickerVisible &&
                                        (<DateTimePicker
                                            mode={"date"} // THIS DOES NOT WORK ON ANDROID. IT DISPLAYS ONLY A DATE PICKER.
                                            display='spinner' // Android Only  
                                            is24Hour={false} // Android Only 
                                            value={this.state.dob}
                                            maximumDate={new Date(2010, 1, 1)}
                                            minimumDate={new Date(1970, 1, 1)}
                                            onChange={(event, value) => {
                                                if (event.type !== "set")
                                                    this.setState({
                                                        dob: new Date(2000, 1, 1),
                                                        datePickerVisible: Platform.OS === 'ios' ? true : false,
                                                    });
                                                else {
                                                    this.setState({
                                                        dob: value,
                                                        datePickerVisible: Platform.OS === 'ios' ? true : false,
                                                    });
                                                }
                                            }}
                                        />)}
                                </View>
                                <View style={{ flex: 1, marginLeft: 5, marginTop: 8 }}>
                                    <Label style={{ color: '#555', fontSize: 15, }}>Gender</Label>
                                    <Picker
                                        selectedValue={this.state.gender}
                                        style={{ height: 50, color: '#fff' }}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}
                                    >
                                        <Picker.Item label="Male" value={0} />
                                        <Picker.Item label="Female" value={1} />
                                        <Picker.Item label="Transgender" value={2} />
                                        <Picker.Item label="Others" value={3} />
                                    </Picker>
                                </View>
                            </View>
                        </Form>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button style={{ margin: 30, zIndex: 5, elevation: 5 }}
                                dark rounded block onPress={() => this.saveUserdetails()}>
                                <Icon name='ios-arrow-round-forward' />
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        backgroundColor: '#05375a50',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        elevation: 2,
        zIndex: 2,
    },
    logo: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginTop: 50,
    },
});

const mapStateToProps = (state) => ({
    userDetails: state.auth.userDetails,
    user: state.auth.user,
})
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (data) => dispatch(updateUserDetails(data)) ,
        changeDisplayPicture : (img_url) => dispatch(changeDisplayPicture(img_url))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)