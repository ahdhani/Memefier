import {db,storage} from '../../config'

export const createGroup = (name , admin , desc , closed = true) => {
    return db.collection('groups').add({
        name ,
        desc ,
        admin ,
        created_at : Date.now() ,
        closed ,
        members : 0
    }).then( ref => {
        console.log(ref)
        return ref.id
    })
    .catch(error => console.log(error.message));
}

export const viewRequests = (group_id) => {
    // view the requests came to a particular group
}

export const acceptRequest = (group_id , user_uid) => {
    // For accepting the request of a particular user to a particular group

}

export const rejectRequest = (group_id , user_uid) => {
    // For rejecting the request of a particular user to a particular group
}

export const subscribeGroup = (group_id , user_uid) => {
    // For requesting a particular group by a particular user
    var doc = {
        group_id,
        user_uid,
        approved : false
    }
    var uid =  group_id + '_' + user_uid
    return db.collection('group_member')
        .doc(uid)
        .set(doc)
        .then(res => res.id)
        .catch(err => console.log(err.message))
}

export const unsubscribeGroup = (group_id , user_uid) => {
    // For unsubscribing a particular group by a particular user
    // unsubscribe if already subscribed
    // delete request if pending
}

export const fetchGroups = (user_uid) => {
    // Fetch the groups a particular user is following
}
/*
Fetch the posts associated with a group
export const fetchPostGroup = () => {

}
*/