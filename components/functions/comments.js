import { db } from '../../config'

export const testFunction = () => {

    console.log("In testFunction")
    return 'hello'
}

export const countComment = async (post_id = '57j6qQbKXOz8cXD7z0hr' ) => {
    var comment = 0
    await db.collection("comments").where('post_id' , '==' , post_id)
        .get()
        .then(snapshots => {
            comment = snapshots.docs.length
        })
        .catch(error => console.log(error.message))

        return comment
}


export const fetchAllComments = async (post_id = "57j6qQbKXOz8cXD7z0hr") => {
    let query = db.collection("comments")
        .where('post_id' , '==' , post_id)
    let comments = []
    await query.get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach(async doc => {
                comments = [...comments , {...doc.data() , id}]
            })      
        })
        .catch(error => console.log(error.message))
    
    return comments
}

export const fetchAllReplies = async (comment_id) => {
    let query = db.collection("replies")
        .where('comment_id' , '==' , comment_id)
    let replies = []
    await query.get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                // console.log(doc.data())
                replies = [...replies , doc.data()]
            })      
        })
        .catch(error => console.log(error.message))

    return replies
}

export const addComment = (post_id="57j6qQbKXOz8cXD7z0hr" , content="test comment" , created_by="3eduXNW0vGTAlAeZBjMvYs45JfF3") => {
    db.collection('comments').add({
        post_id ,
        content ,
        created_by
    }).then( ref => {
        console.log("comment added successfully")
    }).catch(error => console.log(error.message))
}

export const addReply = (comment_id , content , created_by) => {
    db.collection('replies').add({
        comment_id ,
        content ,
        created_by
    }).then( ref => {
        console.log("Reply added successfully")
    }).catch(error => console.log(error.message))
}

export const deleteComment = (comment_id , user_uid) => {

}

export const deleteReply = (reply_id) => {
    
}

export const likeComment = (comment_id) => {
    
}

export const likeReply = (reply_id) => {
    
}

export const dislikeComment = (comment_id) => {
    
}

export const dislikeReply = (reply_id) => {
    
}

export const unlikeComment = (comment_id) => {
    
}

export const unlikeReply = (reply_id) => {
    
}