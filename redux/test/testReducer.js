import { ADD_ITEM_SUCCESS, DELETE_ITEM_SUCCESS } from "./testType"

const initialState = {
    items : [] ,
    loading : false
}

export default (state = initialState, { type }) => {
    switch (type) {

    case ADD_ITEM_SUCCESS :
        return {
            ...state ,
            loading : !state.loading 
        }
    case DELETE_ITEM_SUCCESS :
        return {
            ...state ,
            loading : false
        }

    default:
        return state
    }
}
