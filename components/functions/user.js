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

export const fetchUser = async (user_uid) => {
    var userDetails = {}
    await db.collection("userDetails")
        .doc(user_uid)
        .get()
        .then(user => {
            userDetails = {
                userId: user.data().userId,
                dp: user.data().dp,
                firstname: user.data().firstname,
                lastname: user.data().lastname,

            }
        }).catch(error => console.log(error.message))
    return userDetails

}

export const fetchUserId = async (user_uid) => {
    var userDetails = {}
    await db.collection("userDetails")
        .doc(user_uid)
        .get()
        .then(user => {
            userDetails = {
                userId: user.data().userId,
            }
        }).catch(error => console.log(error.message))
    return userDetails

}

export const fetchDetails = (uuid) => {
    return db.collection("userDetails")
        .doc(uuid)
        .get()
        .then(user => {
            return user.data()
        }).catch(error => console.log(error.message))
}