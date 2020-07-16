import React, { Component, useEffect, useState } from 'react';
import { Card, CardItem, Button,  } from 'native-base'
import { View, Text,} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { fetchGroupDetails } from '../../functions/community'

const CommunityCard = props => {

    const [group, setGroup] = useState()

    useEffect(() => {
        console.log('grp id',props.group_id)

        fetchGroupDetails(props.group_id)
            .then(res => { 
                setGroup(res)
                console.log(res)
            });

    }, []);

    return (

        <CardItem style={{ marginVertical: -5 }}>
            <Card style={{ padding: 0, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}
            >
                <CardItem style={{ marginLeft: 15 }}>
                    <Button style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65}
                    // onPress={() => this.props.navigation.navigate('CommunityFeed')} 
                    >
                    </Button>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>zfzsf</Text>
                        <Text style={{ color: 'rgba(0,0,0,0.35)' }}>dzxfg members</Text>
                    </View>
                </CardItem>
            </Card>
        </CardItem>
    )
}

export default CommunityCard;