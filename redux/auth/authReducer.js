import {
    USER_LOADED , USER_LOADING , AUTH_ERROR , LOGIN_SUCCESS , LOGIN_FAIL , LOGOUT_SUCCESS , REGISTER_SUCCESS , REGISTER_FAIL
} from './authTypes'

const initialState = {
    isLoading : false ,
    isAuthenticated : null ,
    // Take token from local storage CODE
    // token : null,
    // token : localStorage.getItem('token') ,
    user : null ,
    userDetails : null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case USER_LOADING:
        return { ...state, 
            isLoading : true
        }
    case USER_LOADED:
        return { ...state, 
            isLoading : false ,
            isAuthenticated : true ,
            user : payload.user ,
            userDetails : payload.userDetails
        }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
        // CODE for setting token to local storage
        // localStorage.setItem('token' , payload.token)
        return { ...state, 
            isLoading : false ,
            isAuthenticated : true ,
            user : payload.user ,
            userDetails : payload.userDetails
        }
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case AUTH_ERROR:
        // CODE for removing token from local storage
        // localStorage.removeItem('token')
        return { ...state, 
            isLoading : false ,
            isAuthenticated : false ,
            user : null ,
            userDetails : null
        }
    default:
        return state
    }
}