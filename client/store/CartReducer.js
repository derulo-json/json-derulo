import axios from 'axios'
import history from '../history'
import initialState from './index'

/**
 * ACTION TYPES
 */
const ADDED_TO_CART = 'ADDED_TO_CART'
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * ACTION CREATORS
 */
export const removeFromCart = item => {
  return {type: REMOVE_FROM_CART, item}
}

export const addToCart = entireCart => {
  return {type: ADDED_TO_CART, entireCart}
}

export const getCart = cart => {
  return {type: GET_CART, cart}
}
/**
 * THUNK CREATORS
 */

export function removeFromCartThunk(id) {
  return async dispatch => {
    try {
      const {data} = await axios.delete('/api/cart/')
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
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
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
    default:
      return state
  }
}
