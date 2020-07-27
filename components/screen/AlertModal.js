import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'native-base';
import colors from '../../constants/colors'

const AlertModal = props => {
    const {
        loading,
        text,
        progress,
        iconName,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    {progress != 100 ?
                        <ActivityIndicator
                            animating={loading}
                            color='#672b78'
                            size={35} />
                        :
                        <View>
                            <Text style={{ color: '#fff', fontSize: 22 }}>{text} {'  '}
                                <Icon name={iconName} style={{ color: '#fff',color: 'green' }} />
                            </Text>
                        </View>
                    }
                </View>
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
        backgroundColor: '#00000070'
    },
    activityIndicatorWrapper: {
        backgroundColor: colors.color5t,
        height: 150,
        width: '50%',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default AlertModal;