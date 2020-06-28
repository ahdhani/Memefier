import { db , storage } from '../../config'

export const fetchUserDetails = async (uuid) => {
    var userDetails = {}
    await db.collection("userDetails")
        .doc(uuid)
        .get()
        .then(user => {
            userDetails = user.data()
        }).catch(error => console.log(error.message))
    return userDetails

}
