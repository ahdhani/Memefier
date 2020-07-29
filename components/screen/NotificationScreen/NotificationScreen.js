import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import { Container, Content, CardItem, Button, Card } from 'native-base';
import ListView from "deprecated-react-native-listview";
import colors from '../../../constants/colors';
import { connect } from 'react-redux'
import { fetchNotifications, setSeen } from '../../functions/notifications'
import { fetchDetails } from '../../functions/user'
import { dateTimeProcessor, notificationTextProcessor } from '../../functions/general'

function NotificationScreen(props, { navigation }) {

  const fetchOperation = () => {
    fetchNotifications(props.user.uid)
      .then(async (snapshots) => {
        var arr = []
        var promises = []
        await snapshots.forEach(async doc => {
          var p = fetchDetails(doc.data().responsible)
            .then(details => {
              if (doc.data().seen == false) {
                setSeen(doc.id)
              }
              var timeAgo = dateTimeProcessor(doc.data().created_at)
              var msg = notificationTextProcessor(doc.data().type)
              arr = [...arr, { ...doc.data(), userId: details.userId, dp: details.dp, timeAgo, msg }]
            })

          promises.push(p)
        })

        // console.log("promises array len :" , promises.length)
        Promise.all(promises)
          .then(() => {
            // console.log("Setting Notifications")
            setNotifications(arr)
            setSnapshots_arr([snapshots])
          })
          .catch(err => console.log("NOTIFICATIONS : ", err.message))
      })
  }

  const [notifications, setNotifications] = useState([]);
  const [snapshots_arr, setSnapshots_arr] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchOperation();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchOperation();
    setIsRefreshing(false);

  }

  const onEndReached = (distanceFromEnd) => {
    console.log("END REACHED")
    // console.log("LAST DOC" , snapshots_arr[snapshots_arr.length - 1])
    // fetchNotifications(props.user.uid , snapshots_arr[snapshots_arr.length - 1])
    //   .then(async snapshots => {
        
    //     var promises = []
    //     await snapshots.forEach(async doc => {
    //       var p = fetchDetails(doc.data().responsible)
    //         .then(details => {
    //           if (doc.data().seen == false) {
    //             setSeen(doc.id)
    //           }
    //           var timeAgo = dateTimeProcessor(doc.data().created_at)
    //           var msg = notificationTextProcessor(doc.data().type)
    //           arr = [...arr, { ...doc.data(), userId: details.userId, dp: details.dp, timeAgo, msg }]
    //         })

    //       promises.push(p)
    //     })

    //     Promise.all(promises)
    //       .then(() => {
    //         // console.log("Setting Notifications")
    //         setNotifications([ notifications , ...arr])
    //         setSnapshots_arr([...snapshots_arr , ...snapshots])
    //       })
    //       .catch(err => console.log("NOTIFICATIONS : ", err.message))

    //   })
  }

  return (
    <Container>
      <Content>
        <View >

          <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => {
                  // if (item.oper == 'comment') {
                  //   navigation.push('CommentScreen');
                  // }
                  // else if (item.oper == 'group') {
                  //   navigation.push('GroupScreen');
                  // }
                  // DO NAVIGATION HERE
                }}
                title={`@${item.userId} ${item.msg}`}
                subtitle={item.timeAgo}
                leftAvatar={<Avatar rounded source={{ uri: item.dp }} size={50} />}
              />
            )}
            keyExtractor={(item, index) => `id_${index}`}
            refreshing={isRefreshing}
            onRefresh={() => onRefresh()}
            onEndReachedThreshold={0.5}

            onEndReached={({ distanceFromEnd }) => {
              onEndReached(distanceFromEnd)
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={{ height: 1, width: '80%', backgroundColor: colors.color1, marginLeft: '23%' }}>

                </View>
              )
            }}
          />
        </View>


      </Content>
    </Container>
  );

}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(NotificationScreen)