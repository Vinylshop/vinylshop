'use strict'
import axios from 'axios'
import history from '../history'

const initialState = {
  total: 0,
  items: []
}

const INIT = 'INITIALIZE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const REMOVE_CART = 'DELETE_CART'

const init = cart => ({type: INIT, cart})
const add = cart => ({type: ADD_TO_CART, cart})
const remove = cart => ({type: REMOVE_FROM_CART, cart})
const del = () => ({type: REMOVE_CART})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return action.cart
    case ADD_TO_CART:
      // let found = false
      // let totalDiff = 0
      // let newItems = state.items.map(item => {
      //   if (item.productId !== action.itemToAdd.productId) return item
      //   found = true
      //   totalDiff = (action.itemToAdd.quantity - item.quantity) * action.itemToAdd.price
      //   return action.itemToAdd
      // })
      // if (!found) {
      //   newItems = [...newItems, action.itemToAdd]
      //   totalDiff = action.itemToAdd.price * action.itemToAdd.quantity
      // }
      // return Object.assign({}, {
      //   total: state.total - totalDiff,
      //   items: newItems
      // })
      return action.cart
    case REMOVE_FROM_CART:
      // let diff = 0
      // return Object.assign({}, {
      //   items: state.items.filter(item => {
      //     if (item.productIdid !== action.itemToRemove.productId) return true
      //     diff = item.price * item.quantity
      //     return false
      //   }),
      //   total: (state.total - diff)
      // })
      return action.cart
    case REMOVE_CART:
      return Object.assign({}, initialState)
    default:
      return state
  }
}

export const fetchCart = () => dispatch => {
  axios.get(`/api/cart/`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching cart unsuccessful', err))
}

export const addToCart = (itemToAdd) => dispatch => {
  axios.put(`/api/cart/addItem`, itemToAdd)
    .then(res => dispatch(add(res.data)))
    .catch(err => console.error('Adding item to cart', err))
}
export const removeFromCart = (itemToRemove) => dispatch => {
  axios.put('/api/cart/removeItem', itemToRemove)
    .then(res => dispatch(remove(res.data)))
    .catch(err => console.error(`Removing items from cart`, err))
}
export const removeCart = () => dispatch => {
  axios.delete(`/api/cart`)
    .then(res => {
      return dispatch(del())
    })
    .catch(err => console.error('Removing cart', err))
}
