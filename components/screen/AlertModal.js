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
        visible,
        text,
        progress,
        iconName,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={visible}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    {progress !=100 ?
                        <View>
                            <ActivityIndicator
                                animating={visible}
                                color='#672b78'
                                size={35} />
                                <Text style={{color: '#fff',fontWeight: 'bold'}}>{progress}%</Text>
                        </View>
                        :
                        <View>
                            <Text style={{ color: '#fff', fontSize: 22 }}>{text} {'  '}
                                <Icon name={iconName} style={{ color: '#fff', color: 'green' }} />
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