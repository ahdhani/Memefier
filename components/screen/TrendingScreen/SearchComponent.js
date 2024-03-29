import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon, Item } from 'native-base'
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../constants/colors'

const SearchComponent = props => {

    const navigation = useNavigation();
    // const [list, setList] = useState()
    // const [searchLoading, setSearchLoading] = useState()
    // useEffect(() => {


    // }, []);

    return (

        <FlatList
            data={props.list}
            ListFooterComponent={() =>
                props.searchLoading &&
                <View style={{ paddingVertical: 20 }}>
                    <ActivityIndicator animating={props.searchLoading} size="small" />
                </View>
            }
            renderItem={({ item }) => (
                item.firstname ?
                    <Item onPress={() => navigation.navigate('ProfileStack', {
                        screen: 'ProfileScreen',
                        params: { uuid: item.objectID }
                    })
                    }
                        style={{ flexDirection: 'row', padding: 4 }}>
                        <Thumbnail source={{ uri: item.dp }} />
                        <View>
                            <Text style={{ marginLeft: 8, fontSize: 16 }}>@{item.userId}</Text>
                            <Text style={{ marginLeft: 8, color: '#888', fontSize: 12 }}>{item.firstname} {item.lastname}</Text>
                        </View>
                    </Item>
                    :
                    <Item

                        onPress={() => navigation.navigate('CommunityFeed', { group_id: item.objectID, })}
                        style={{ flexDirection: 'row', padding: 4 }}>
                        <Thumbnail source={{ uri: item.dp }} />
                        {/* <View> */}
                            <Text style={{ marginLeft: 8 }}>{item.name}</Text>
                            {/* <Text style={{ marginLeft: 8, color: '#aaa' }}>{item.members} {' '}
                                <Icon name='people' style={{ fontSize: 16, color: '#aaa', textAlign: 'center' }} />
                            </Text>
                        </View> */}
                    </Item>

            )}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default SearchComponent;