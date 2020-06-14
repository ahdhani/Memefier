import { db } from '../../config'

export const likePost = (user_uid = 'TNB7jMDAKrRVJAtnvDLkf5K7jIB3' , post_id = '57j6qQbKXOz8cXD7z0hr' , reaction = 0) => {   
    var doc_name = user_uid + '_' + post_id
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
    db.collection('reactions').doc(doc_name).delete()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
            console.log("Unlike Success");
        })
        .catch(err => console.log(err.message));
}