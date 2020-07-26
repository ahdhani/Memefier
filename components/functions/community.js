import {db,storage} from '../../config'
import {algoliaPopulateGroup} from './algolia'
// check git

export const createGroup = (name , admin , desc , closed = true) => {
    const DP_URL = "https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fillumminati.jpg?alt=media&token=cd3c6612-8c0d-45b4-b3f5-3b3e684083ca"
    var data = {
        name ,
        desc ,
        admin ,
        created_at : Date.now() ,
        closed ,
        dp : DP_URL ,
        members : 0
    }
    
    return db.collection('groups').add(data).then( ref => {
        
        // console.log(ref)
        // console.log("ref" , data)
        algoliaPopulateGroup(ref.id , data)
            .catch(err=>console.log(err.message))
        return ref.id
    })
    .catch(error => console.log(error.message));
}

export const fetchGroupDetails = (group_id) => {        //done
    return db.collection("groups")
        .doc(group_id)
        .get()
        .then(ref => {
            if (ref.exists) {
                return ref.data()
            }
            // console.log(ref.data)
            return null
        })
        .catch(error => console.log(error.message))
}

export const fetchGroups = (user_uid) => {           //done
    // Fetch the groups a particular user is following
    return db.collection("group_member")
        .where("user_uid" , "==" , user_uid)
        .where("approved" , "==" , true)
        .get()
        .then(snapshots => snapshots.docs)
        .catch(err => console.log(err.message))
}

export const viewRequests = (group_id) => {
    // view the requests came to a particular group
    return db.collection("group_member")
        .where("group_id" , "==" ,group_id)
        .where("approved" , "==" , false)
        .get()
        .then(async res => {
            arr = []
            await res.forEach(obj => {
                arr=[...arr,obj.data()]
            })
            return arr;
        })
        .catch(err => console.log(err.message))
}

export const viewPendingPosts = (group_id) => {
    // view the posts pending in the group (group_id)
    return db.collection("posts")
        .where("created_by" , "==" ,group_id)
        .where("allowed" , "==" , false)
        .where("category" , "==" , 2)
        .get()
        .then(async res => {
            arr = []
            await res.forEach(obj => {
                arr=[...arr,obj.data()]
            })
            return arr;
        })
        .catch(err => console.log(err.message))
}

// modifying
export const acceptRequest = (group_id , user_uid) => {
    // For accepting the request of a particular user to a particular group
    var doc = {
        group_id,
        user_uid,
        approved : true
    }
    var doc_name = group_id + '_' + user_uid
    return db.collection("group_member")
        .doc(doc_name)
        .set(doc)
        .then(() => doc_name)
}

// Deleting
export const deleteRequest = (group_id , user_uid) => {
    // For rejecting the request of a particular user to a particular group
    var message = ''
    var doc_name = group_id + '_' + user_uid
    return db.collection('group_member')
        .doc(doc_name)
        .get()
        .then(doc => {
            if (!doc.exists) {
                message = "No request present"
                return message
            } else {
                db.collection('group_member')
                    .doc(doc_name).delete()
                    .then(() => true)
            }
        })
        .catch(err => {
            console.log('ERR', err.message);
        });
    
}

// Creating
export const createRequest = (group_id , user_uid) => {
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
        .then(() => uid)
}

export const joinGroup = (group_id , user_uid) => {              
    // For requesting a particular group by a particular user
    var doc = {
        group_id,
        user_uid,
        approved : true
    }
    var uid =  group_id + '_' + user_uid
    return db.collection('group_member')
        .doc(uid)
        .set(doc)
        .then(() => uid)
}

export const checkRequestStatus = (group_id , user_uid) => {
    var uid =  group_id + '_' + user_uid

    return db.collection("group_member")
        .doc(uid)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return null;
            }
            // console.log(doc)
            return doc.data().approved;
        })
}

/*
Fetch the posts associated with a group
export const fetchPostGroup = () => {

}
*/