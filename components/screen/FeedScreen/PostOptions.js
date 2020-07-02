import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';

const PostOptions = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
    //   onRequestClose={() => {console.log('close modal')}}
      >
      <View style={styles.modalBackground}>
          <TouchableOpacity>
            <Text style={{color: '#fff'}}>Report Post</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000070',
    borderRadius: 5,
  },
});

export default PostOptions;