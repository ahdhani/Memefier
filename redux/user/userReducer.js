import {    LOGIN_SUCCESS,
    SET_USER,
} from "./userType"

const initialState = {
    user: null,
}

export default (state = initialState, action) => {
    switch (action.type) {

    case LOGIN_SUCCESS :
        return {
            ...state ,
            loading : !state.loading 
        }
    case SET_USER :
        return action.payload
    default:
        return state
    }
}
