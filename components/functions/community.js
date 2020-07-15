import {db,storage} from '../../config'
// check git

export const createGroup = (name , admin , desc , closed = true) => {
    return db.collection('groups').add({
        name ,
        desc ,
        admin ,
        created_at : Date.now() ,
        closed ,
        members : 1
    }).then( ref => {
        console.log(ref)
        return ref.id
    })
    .catch(error => console.log(error.message));
}

export const fetchGroupDetails = (group_id) => {
    return db.collection("groups")
        .where("group_id" , "==" , group_id)
        .get()
        .then(ref => {
            console.log(ref)
            return ref
        })
        .catch(error => console.log(error.message))
}

export const fetchGroups = (user_uid) => {
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
        .then(snapshots => snapshots.docs)
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

/*
Fetch the posts associated with a group
export const fetchPostGroup = () => {

}
*/