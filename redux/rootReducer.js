import {combineReducers} from 'redux'
import testReducer from './test/testReducer'

const rootReducer = combineReducers({
    test : testReducer
})

export default rootReducer