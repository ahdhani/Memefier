import {combineReducers} from 'redux'
import authReducer from './auth/authReducer'
import memeReducer from './meme/memeReducer'

const rootReducer = combineReducers({
    auth : authReducer,
    post : memeReducer
})

export default rootReducer