import {combineReducers} from 'redux'
import testReducer from './test/testReducer'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({
    test : testReducer,
    auth : authReducer
})

export default rootReducer