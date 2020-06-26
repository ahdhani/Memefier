import { db } from '../../config'

export const addChallenge = (challenge_name , desc , created_by , end_time , start_time = Date.now()) => {
    return db.collection('challenges').add({
        challenge_name ,
        desc ,
        created_by ,
        end_time ,
        start_time
    }).then( ref => {
        console.log(ref);
        return ref.id
    })
    .catch(error => console.log(error.message));
}