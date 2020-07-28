import { db } from '../../config'

export const fetchNotifications = (user_id , lastDoc = null) => {
    if (lastDoc == null) {
        return db.collection('notifications')
            .where("target" , "==" , user_id)
            .orderBy("created_at", "desc")
            .limit(10)
            .get()
            .then(snapshots => {
                return snapshots.docs
            })
            .catch(err => console.log("Notifications ERROR : " , err.message))
    } else {
        return db.collection('notifications')
            .where("target" , "==" , user_id)
            .orderBy("created_at", "desc")
            .startAfter(lastDoc)
            .limit(10)
            .get()
            .then(snapshots => {
                console.log("PAGINATE " , snapshots.docs.length)
                return snapshots.docs
            })
            .catch(err => console.log("Notifications ERROR : " , err.message))
    }
    
}

export const setSeen = (id) => {
    return db.collection("notifications")
        .doc(id)
        .update({
            seen : true
        })
        .then(() => console.log("SEEN UPDATED "))
        .catch(err => console.log("SEEN UPDATE ERROR : " , err.message))
}