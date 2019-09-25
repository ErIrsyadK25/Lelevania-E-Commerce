import {combineReducers} from 'redux'
import notes from './notes'
import categories from './categories'
import user from './user'
import products from './products'

const appReducer = combineReducers({
    notes,
    categories,
    user,
    products
})

export default appReducer