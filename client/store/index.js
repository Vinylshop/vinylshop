import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import users from './users'
import currentUser from './currentUser'
import products from './products'
import orders from './orders'
import review from './review'
import lists from './lists'
import cart from './cart'

const reducer = combineReducers({cart, orders, users, currentUser, products, review, lists})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './users'
export * from './currentUser'
export * from './products'
export * from './orders'
export * from './review'
export * from './lists'
export * from './cart'
