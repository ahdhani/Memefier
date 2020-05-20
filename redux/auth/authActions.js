import { USER_LOADED, USER_LOADING, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './authTypes'
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
            .then(cred => {
                console.log("USER CREATED SUCCESS")


                var userDetails = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    gender: user.gender,
                    dob: user.dob,
                    phone: user.phone
                }

                db.collection("userDetails").doc(cred.user.uid).set(userDetails)
                    .then(() => {
                        console.log("USER DETAILS PUSHED")
                        dispatch({
                            type: REGISTER_SUCCESS,
                            payload: {
                                user, userDetails
                            }
                        })
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

                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {
                                user,
                                userDetails: snapshot.data()
                            }
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

                        dispatch({
                            type: USER_LOADED,
                            payload: {
                                user,
                                userDetails: snapshot.data()
                            }
                        })

                        // console.log(getState().auth)
                    })
                    .catch(error => {
                        console.log("AUTH ERROR")
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