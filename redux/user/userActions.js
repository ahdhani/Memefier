import {    LOGIN_SUCCESS,
            SET_USER,
        } from "./userType"

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
})

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
})


