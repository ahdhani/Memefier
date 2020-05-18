/**
 * @docs
 * 
 * loadUser :
 *  asynchronous action
 *  fetches the user from `~/ai/auth/user` and headers : { x_auth : token }
 *      
 *      
 */

// import axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from './authTypes'
import * as firebase from 'firebase'

export const logoutUser = () => ({
    type: LOGOUT_SUCCESS
})


export const createUser = (user) => {

    return function (dispatch, getState) {
        // Checking if user already logged in

        if (getState().auth.isAuthenticated) return dispatch({
            type: REGISTER_FAIL
        })
        firebase.auth().createUserWithEmailAndPassword(user.email , user.password)
            .then( user => dispatch({
                type : REGISTER_SUCCESS ,
                payload : {user}
            }))
            .catch( error => dispatch({
                type : REGISTER_FAIL
            }))
    }
}

export const loginUser = ({ email, password }) => {
    return function (dispatch, getState) {
        if (getState().auth.isAuthenticated) return dispatch({
            type: LOGIN_FAIL
        })

        // var config = setupConfig(getState)

        firebase.auth().signInWithEmailAndPassword(email , password)
            .then( user => dispatch({
                type : LOGIN_SUCCESS ,
                payload : {
                    user 
                }
            }))
            .catch( error => dispatch({
                type : LOGIN_FAIL
            }))
    }
}

export const loadUser = () => {
    return function (dispatch, getState) {

        dispatch({
            type: USER_LOADING
        })

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // logged in
                console.log(user)
                dispatch({
                    type: USER_LOADED,
                    payload: {
                        user 
                    }
                })
            } else {
                // no user
                console.log("No user logged in")
                dispatch({
                    type : AUTH_ERROR
                })
            }
        })
    }
}


/*
// Don't edit the below code

const setupConfig = (getState) => {
    var config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    var token = getState().auth.token

    if (token) {
        config.headers['x_auth'] = "token"
    }

    return config
}
*/