import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, FETCH_POST_REQUEST, FETCH_POST_SUCCESS, FETCH_POST_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE } from "./memeTypes"


const initialState = {
    memes : null ,
    loading : false ,
    error : null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ADD_POST_REQUEST:
        return { 
            ...state,
            loading : true ,
            error : null
        }
    case ADD_POST_SUCCESS :
        return {
            ...state ,
            loading : false ,
            memes : [payload.new_meme , state.memes] ,
            error : null
        }
    case ADD_POST_FAILURE :
        return {
            ...state ,
            loading : false ,
            error : payload.error_msg
        }
    case FETCH_POST_REQUEST :
        return {
            ...state ,
            loading : true ,
            error : null
        }
    case FETCH_POST_SUCCESS :
        return {
            ...state ,
            loading : false ,
            memes : [payload.memes] ,
            error : null
        }
    case FETCH_POST_FAILURE :
        return {
            ...state ,
            loading : false ,
            error : payload.error_msg
        }
    case DELETE_POST_REQUEST :
        return {
            ...state ,
            loading : true ,
            error : null 
        }
    // Not completed -- To complete memes = filter. blah blah....
    case DELETE_POST_SUCCESS :
        return {
            ...state ,
            loading : false ,
            error : null ,
            memes : []
        }
    case DELETE_POST_FAILURE :
        return {
            ...state ,
            loading : false ,
            error : error_msg
        }


    default:
        return state
    }
}
