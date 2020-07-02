import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Text,
} from 'react-native';

const PostOptions = props => {

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={props.loading}
        // onRequestClose={() => this.props.close()}
        >
            <TouchableHighlight style={styles.modalBackground} onPress={() => props.close()} >
                <View style={styles.modal}>
                    <TouchableOpacity style={{ paddingTop: 20, paddingLeft: 20 }}
                        onPress={() => { }}>
                        <Text style={styles.textFont}>Report Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingTop: 20, paddingLeft: 20 }}
                        onPress={() => { }}>
                        <Text style={styles.textFont}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 20 }}
                        onPress={() => { }}>
                        <Text style={styles.textFont}>Report Post</Text>
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0005'
    },
    modal: {
        flexDirection: 'column',
        backgroundColor: '#222e',
        borderRadius: 5,
        width: '50%'
    },
    textFont: {
        fontSize: 16,
        color: '#fff',
    }
});

export default PostOptions;