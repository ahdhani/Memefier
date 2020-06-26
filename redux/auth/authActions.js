import { USER_LOADED, USER_LOADING, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, FOLLOW_USER, UNFOLLOW_USER, CHANGE_DP_SUCCESS, UPDATE_USER_DETAILS } from './authTypes'
import { auth, db } from '../../config'

export const logoutUser = () => {
    return function (dispatch, getState) {

        auth.signOut()
            .then(user => {
                console.log("LOGGED OUT SUCCESS")

                return dispatch({
                    type: LOGOUT_SUCCESS
                })
            })
            .catch(error => console.log("Cannot Logout , ", error.message))
    }
}

export const createUser = (user) => {

    return function (dispatch, getState) {
        if (getState().auth.isAuthenticated) return dispatch({
            type: REGISTER_FAIL
        })
        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((cred) => {
                console.log("USER CREATED SUCCESS")


                var userDetails = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    gender: 0,
                    dob: new Date(2000,1,1),
                    // phone: user.phone,
                    followers: 0,
                    following: 0,
                    userId: user.userId,
                    dp: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9',
                    bio: '',
                    rank: 0
                }

                db.collection("userDetails").doc(cred.user.uid).set(userDetails)
                    .then(() => {
                        console.log("USER DETAILS PUSHED");

                        var userIdDetails = {
                            uid : cred.user.uid ,
                            userId : userDetails.userId
                        }

                        db.collection("userId").doc(userIdDetails.userId).set(userIdDetails)
                            .then(() => {
                                console.log("USERID ADDED")
                                
                                dispatch({
                                    type: REGISTER_SUCCESS,
                                    payload: {
                                        user, userDetails, following: []
                                    }
                                })
                            })
                            .catch(error => console.log(error.message))
                    })
                    .catch(error => console.log("User Details can't be added!!"))



            })
            .catch(error => dispatch({
                type: REGISTER_FAIL
            }))
    }
}

export const loginUser = ({ email, password }) => {
    return function (dispatch, getState) {
        if (getState().auth.isAuthenticated) return dispatch({
            type: LOGIN_FAIL
        })

        // var config = setupConfig(getState)

        auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log("LOGIN SUCCESS")
                db.collection("userDetails").doc(user.uid).get()
                    .then(snapshot => {
                        // console.log("USER DETAILS")
                        // console.log(snapshot.data())
                        console.log("USER DATA LOADED")

                        db.collection("followers").where('followed_by', '==', user.uid)
                            .get().
                            then(snapshot_followers => {
                                console.log("FOLLOWERS FETCH SUCCESS (LOGIN)");
                                // console.log(snapshot_followers.data())
                                // console.log(snapshot_followers.docs);

                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    payload: {
                                        user,
                                        userDetails: snapshot.data(),
                                        following: []
                                        // following: snapshot_followers.data()
                                    }
                                })
                            })

                        // console.log(getState().auth)
                    })
                    .catch(error => {
                        console.log("CANNOT LOAD USER DATA")
                    })
            })
            .catch(error => dispatch({
                type: LOGIN_FAIL
            }))
    }
}

export const loadUser = () => {
    return function (dispatch, getState) {

        dispatch({
            type: USER_LOADING
        })

        auth.onAuthStateChanged(function (user) {
            if (user) {
                db.collection("userDetails").doc(user.uid).get()
                    .then(snapshot => {
                        // console.log("USER DETAILS")
                        // console.log(snapshot.data())
                        console.log("USER LOADED")

                        db.collection("followers").where('followed_by', '==', user.uid)
                            .get()
                            .then(snapshot_followers => {
                                console.log("FOLLOWERS FETCH SUCCESS (LOGIN)");
                                // console.log(snapshot_followers.data())
                                // console.log(snapshot_followers.docs);
                                let arr = []
                                snapshot_followers.docs.forEach(item => {
                                    arr = [...arr, item.data().following]
                                })
                                dispatch({
                                    type: USER_LOADED,
                                    payload: {
                                        user,
                                        userDetails: snapshot.data(),
                                        following: arr
                                        // following: snapshot_followers.data()
                                    }
                                })

                            })


                        // console.log(getState().auth)
                    })
                    .catch(error => {
                        console.log("AUTH ERROR", error.message)
                        dispatch({
                            type: AUTH_ERROR
                        })
                    })

            } else {
                // no user
                dispatch({
                    type: AUTH_ERROR
                })
                console.log("AUTH ERROR")
            }
        })
    }
}

export const follow_user = (user_uid) => { // user_uid is the id of the user to be followed
    return function (dispatch, getState) {
        var doc_name = getState().auth.user.uid + '_' + user_uid
        db.collection("followers").doc(doc_name).set({
            followed_by: getState().auth.user.uid,
            following: user_uid
        }).then(() => {
            console.log("Promise data returned :");
            // console.log(ref)

            dispatch({
                type: FOLLOW_USER,
                payload: {
                    user_followed: user_uid
                }
            });

            console.log("FOLLOW USER SUCCESS");

            // console.log(getState().auth.following);

        }).catch(error => console.log("CANT FOLLOW", error.message))
    }
}

export const unfollow_user = (user_uid) => { // user_uid is the id of the user to be followed
    return function (dispatch, getState) {
        let query = db.collection('followers').where('followed_by', '==', getState().auth.user.uid).where('following', '==', user_uid);
        query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });

            dispatch({
                type: UNFOLLOW_USER,
                payload: {
                    user_unfollow: user_uid
                }
            })

            console.log("UNFOLLOW USER SUCCESS");
            // console.log(getState().auth.following);
        });
    }
}

export const changeDisplayPicture = (img_url) => {
    return function (dispatch, getState) {
        // Add a new document with a generated id.
        console.log("DP CHANGE REQUEST");

        let addDoc = db.collection('userDetails')
            .doc(getState().auth.user.uid)
            .update({
                dp: img_url
            })
            .then(ref => {
                console.log("DP CHANGE SUCCESS");

                dispatch({
                    type: CHANGE_DP_SUCCESS,
                    payload: {
                        dp: img_url
                    }
                })
                // console.log(getState().auth.userDetails)

                // console.log(ref.ZE.path.segments[1])
                // console.log(getState().post)
            }).catch(error => {
                console.log("DP CHANGE FAILURE", error.message);
            });
    }
}

export const updateUserDetails = (updatedUserdetails) => {
    return function (dispatch, getState) {
        var userDetailsRef = db.collection('userDetails').doc(getState().auth.user.uid)

        return userDetailsRef.update(updatedUserdetails)
            .then(() => {
                console.log("UserDetails Updated successfully!")
                dispatch({
                    type: UPDATE_USER_DETAILS,
                    payload: {
                        updatedUserdetails
                    }
                })

                // console.log("Dispatched")
            })
            .catch(error => console.log(error.message))
    }
}