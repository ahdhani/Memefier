import { db } from '../../config'

export const fetchUserId = async (user_uid) => {
    var userId = ''
    await db.collection("userDetails")
        .doc(user_uid)
        .get()
        .then(user => {
            userId = user.data().userId
            // console.log(userId)
        }).catch(error => console.log(error.message))
    return userId

}
