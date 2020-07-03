import { db } from '../../config'
import { API_KEY, APP_ID } from 'react-native-dotenv'

export const countLike = async (post_id = '57j6qQbKXOz8cXD7z0hr' ) => {
    var like = 0
    await db.collection("reactions").where('post_id' , '==' , post_id).where('reaction' , '==' , 0)
        .get()
        .then(snapshots => {
            like = snapshots.docs.length
        })
        .catch(error => console.log(error.message))

        return like
}

export const countDisike = async (post_id = '57j6qQbKXOz8cXD7z0hr' ) => {
    var dislike = 0
    await db.collection("reactions").where('post_id' , '==' , post_id).where('reaction' , '==' , 1)
        .get()
        .then(snapshots => {
            dislike = snapshots.docs.length
        })
        .catch(error => console.log(error.message))

        return dislike
}

export const checkReaction = async (post_id = '57j6qQbKXOz8cXD7z0hr', user_uid = 'TNB7jMDAKrRVJAtnvDLkf5K7jIB3') => {
    // var doc_name = user_uid + '_' + post_id

    var return_value = -1
    
    const query = db.collection('reactions')
                    .where('post_id' , '==' , post_id)
                    .where('user_uid' , '==' , user_uid)
    await query.get()
        .then((querySnapshot) => {
            if(querySnapshot.docs.length == 0) {
                return_value = -1
            } else {
                console.log(querySnapshot.docs[0].data())
                return_value = querySnapshot.docs[0].data().reaction
            }
        })
        .catch(error => console.log(error.message))

    return return_value
}

export const likePost = (user_uid = 'TNB7jMDAKrRVJAtnvDLkf5K7jIB3' , post_id = '57j6qQbKXOz8cXD7z0hr' , reaction = 0) => {   
    var doc_name = user_uid + '_' + post_id

    console.log("API KEY = " , API_KEY , APP_ID)

    db.collection("reactions").doc(doc_name).set({
        user_uid , post_id , reaction
    }).then(() => {
        console.log("POST LIKED SUCCESSFULLY");
    }).catch(error => console.log("CANT Like : ", error.message))
}
export const dislikePost = (user_uid = 'TNB7jMDAKrRVJAtnvDLkf5K7jIB3' , post_id = '57j6qQbKXOz8cXD7z0hr' , reaction = 1) => {
    var doc_name = user_uid + '_' + post_id
    db.collection("reactions").doc(doc_name).set({
        user_uid , post_id , reaction
    }).then(() => {
        console.log("POST DISLIKED SUCCESSFULLY");
    }).catch(error => console.log("CANT Like : ", error.message))
}

export const unlikePost = (user_uid = 'TNB7jMDAKrRVJAtnvDLkf5K7jIB3' , post_id = '57j6qQbKXOz8cXD7z0hr') => {
    var doc_name = user_uid + '_' + post_id
    let query = db.collection('reactions').doc(doc_name);
    query.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log("Doc found and deleted")
                query.delete()
            }
        })
        .catch(err => {
            console.log('ERR', err.message);
        });
}