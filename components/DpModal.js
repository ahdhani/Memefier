import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ImageBackground,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import { Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const cardWidth = Dimensions.get('window').width * .8;;

class DpModal extends Component {

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
            if (!result.cancelled) {        //KUDU pls add code to update dp
                // const user = this.state.user;
                // user.avatar = result.uri;
                // this.setState({ user: user });
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    render() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.loading}
                onRequestClose={() => {this.props.closeModal()}}
            >
                <TouchableHighlight style={styles.modalBackground} onPress={() => {this.props.closeModal()}}>
                    <ImageBackground
                        style={{
                            width: cardWidth,
                            height: cardWidth,
                            alignSelf: 'center',
                            backgroundColor: '#5c6b73',
                        }}
                        onPress
                        resizeMode='cover'
                        // source={{ uri: this.state.uri }}
                        source={{ uri: this.props.userDetails.dp }}

                    >
                        <Button rounded style={{
                            height: 50, width: 50,
                            position: 'absolute',
                            bottom: 5, right: 5,
                            backgroundColor: '#555555f0'
                        }} onPress={() => this._pickImage()}>
                            <Icon name='create' />
                        </Button>
                    </ImageBackground>
                </TouchableHighlight>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000070'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#00000060',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
    userDetails: state.auth.userDetails,
    // following: state.auth.following
})

const mapDispatchToProps = (dispatch) => {
    return {
        // logoutUser: () => dispatch(logoutUser()),
        // unfollow: (user_id) => dispatch(unfollow_user(user_id)),
        // follow: (user_id) => dispatch(follow_user(user_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DpModal)