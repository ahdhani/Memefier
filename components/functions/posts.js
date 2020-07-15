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
        .get()
        .then(snapshots => {
            return snapshots.docs
        })
        .catch(err => console.log(err.message))

}

export const fetchFeedPosts = (arr) => {
    // order by timestamp missing
    return db.collection('posts')
        .where("created_by" , "in" , arr)
        .where("allowed" , "==" , true)
        .get()
        .then(snapshots => {
            return snapshots.docs
        })
        .catch(err => console.log(err.message))

}

export const fetchGroupPosts = (group_id) => {
    // order by timestamp missing
    return db.collection('posts')
        .where("created_by" , "==" , group_id)
        .where("allowed" , "==" , true)
        .get()
        .then(snapshots => {
            return snapshots.docs
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