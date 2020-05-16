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

export const logoutUser = () => ({
    type: LOGOUT_SUCCESS
})


export const createUser = (user) => {

    return function (dispatch, getState) {
        // Checking if user already logged in
        
        if (getState().auth.isAuthenticated) return dispatch({
            type: REGISTER_FAIL
        })

        // var config = setupConfig(getState)

        // fetch function for createUser CODE

        dispatch({
            type: REGISTER_SUCCESS ,
            payload : {
                token : "token" ,
                user : {
                    name : "user" ,
                    username : "username" ,
                    age : "21" ,
                    gender : 1 ,
                    followers : [] ,
                    following : []
                }
            } 
        })
    }
}

export const loginUser = ({ username, password }) => {
    return function (dispatch, getState) {
        if (getState().auth.isAuthenticated) return dispatch({
            type: LOGIN_FAIL
        })

        // var config = setupConfig(getState)

        dispatch({
            type : LOGIN_SUCCESS ,
            payload : {
                token : "token" ,
                user : {
                    name : "user" ,
                    username : "username" ,
                    age : "21" ,
                    gender : 1 ,
                    followers : [] ,
                    following : []
                }
            }
        })
    }
}

export const loadUser = () => {
    return function (dispatch, getState) {

        dispatch({
            type: USER_LOADING
        })

        // const config = setupConfig(getState)


        dispatch({
            type: USER_LOADED,
            payload : {
                token : "token" ,
                user : {
                    name : "user" ,
                    username : "username" ,
                    age : "21" ,
                    gender : 1 ,
                    followers : [] ,
                    following : []
                }
            }
        })

        // dispatch({
        //     type: AUTH_ERROR
        // })
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