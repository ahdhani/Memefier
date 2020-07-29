import {db,storage} from '../../config'

export const createUserPost = (user_uid , img_url , caption) => {
    var post = {
        img : img_url ,
        caption : caption ,
        created_by : user_uid ,
        created_at : Date.now() ,
        likeCount : 0 ,
        dislikeCount : 0 ,
        commentCount : 0 ,
        allowed : true ,
        category : 1 ,
        group_member : user_uid
    }

    return db.collection('posts').add(post)
        .then(res => res.id)
        .catch(err => console.log(err.message))

}

export const createGroupPost = (user_uid , group_id , img_url , caption) => {
    var post = {
        img : img_url ,
        caption : caption ,
        created_by : group_id ,
        created_at : Date.now() ,
        likeCount : 0 ,
        dislikeCount : 0 ,
        commentCount : 0 ,
        allowed : false ,
        category : 2 ,
        group_member : user_uid
    }

    return db.collection('posts').add(post)
        .then(res => res.id)
        .catch(err => console.log(err.message))

}

export const fetchUserPosts = (user_uid) => {
    // order by timestamp missing
    return db.collection('posts')
        .where("created_by" , "==" , user_uid)
        .where("allowed" , "==" , true)
        .orderBy("created_at", "desc")
        .limit(2)
        .get()
        .then(snapshots => {
            return snapshots.docs
        })
        .catch(err => console.log(err.message))

}
 
export const fetchFeedPosts = (arr , lastPost = null) => {
    // order by timestamp missing
    if (lastPost == null) {
        return db.collection('posts')
            .where("created_by" , "in" , arr)
            .where("allowed" , "==" , true)
            .orderBy("created_at", "desc")
            .limit(2)
            .get()
            .then(snapshots => {
                return snapshots.docs
            })
            .catch(err => console.log("Snapshots error : " , err.message))
    } else {
        return db.collection('posts')
            .where("created_by" , "in" , arr)
            .where("allowed" , "==" , true)
            .orderBy("created_at", "desc")
            .startAfter(lastPost)
            .limit(2)
            .get()
            .then(snapshots => {
                return snapshots.docs
            })
            .catch(err => console.log("Snapshots error : " , err.message))
    }
    
}

export const fetchGroupPosts = (group_id) => {
    // order by timestamp missing
    return db.collection('posts')
        .where("created_by" , "==" , group_id)
        .where("allowed" , "==" , true)
        .get()
        .then
        (res => {
            arr = []
            res.forEach(obj => {
                arr=[...arr,obj.data()]
            })
            return arr;
        })
        .catch(err => console.log(err.message))

}

export const fetchGroupPostsForReview = (group_id) => {
    // order by timestamp missing
    return db.collection('posts')
        .where("created_by" , "==" , group_id)
        .where("allowed" , "==" , false)
        .get()
        .then(snapshots => {
            return snapshots.docs
        })
        .catch(err => console.log(err.message))

}

export const fetchPostDetails = (post_id) => {
    return db.collection('posts')
        .doc(post_id)
        .get()
        .then(doc => doc.data())
        .catch(err => console.log(err.message))
}