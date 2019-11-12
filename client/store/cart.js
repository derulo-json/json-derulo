import axios from 'axios'
import history from '../history'
import initialState from './index'

/**
 * ACTION TYPES
 */
const ADDED_TO_CART = 'ADDED_TO_CART'
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const PLUS_ONE = 'PLUS_ONE'
const MINUS_ONE = 'MINUS_ONE'
const CHECKOUT = 'CHECKOUT'
const UPDATE_INVENTORY = 'UPDATE_INVENTORY'
/**
 * ACTION CREATORS
 */

export const plusOne = product => {
  return {type: PLUS_ONE, product}
}

export const minusOne = product => {
  return {type: MINUS_ONE, product}
}

export const removeFromCart = item => {
  return {type: REMOVE_FROM_CART, item}
}

export const addToCart = entireCart => {
  return {type: ADDED_TO_CART, entireCart}
}

export const getCart = cart => {
  return {type: GET_CART, cart}
}

export const checkout = order => {
  return {type: CHECKOUT, order}
}

export const updateInventory = inventory => {
  return {type: UPDATE_INVENTORY, inventory}
}
/**
 * THUNK CREATORS
 */

export function plusOneThunk(product) {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/plus/${product.id}`)
      dispatch(plusOne(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function minusOneThunk(product) {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/minus/${product.id}`)
      dispatch(minusOne(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function removeFromCartThunk(id) {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/cart/${id}`)
      dispatch(removeFromCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToCartThunk = (userId, item) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/cart`, item)
    dispatch(addToCart(data))
  } catch (error) {
    console.error(error)
  }
}

export function getCartThunk() {
  return async dispatch => {
    try {
      console.log('getting cart')
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function checkoutThunk() {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/cart/checkout')
      dispatch(checkout(data.checkout))
    } catch (error) {
      console.log(error)
    }
  }
}

export function inventoryThunk() {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/cart/checkout')
      dispatch(updateInventory(data.updateInventory))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case ADDED_TO_CART:
      return action.entireCart
    case GET_CART:
      return {...state, cart: action.cart}
    case REMOVE_FROM_CART:
      return {}
    case PLUS_ONE:
      return action.product
    case MINUS_ONE:
      return action.product
    case CHECKOUT:
      return action.order
    case UPDATE_INVENTORY:
      return action.inventory
    default:
      return state
  }
}
