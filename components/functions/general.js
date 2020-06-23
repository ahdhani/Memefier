import { db } from '../../config'

export const fetchUser = async (user_uid) => {
    var userDetails = {}
    await db.collection("userDetails")
        .doc(user_uid)
        .get()
        .then(user => {
            userDetails = {
                userId: user.data().userId,
                dp: user.data().dp
            }
            // userId = user.data().userId
            console.log(userDetails)
        }).catch(error => console.log(error.message))
    return userDetails

}
