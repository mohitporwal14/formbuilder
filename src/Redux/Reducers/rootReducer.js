import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import FormReducer from './FormReducer'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    forms: FormReducer
})
export default createRootReducer