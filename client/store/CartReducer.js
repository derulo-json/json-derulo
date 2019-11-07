import axios from 'axios'
import history from '../history'
import initialState from './index'

/**
 * ACTION TYPES
 */
const ADDED_TO_CART = 'ADDED_TO_CART'
const GET_CART = 'GET_CART'
/**
 * ACTION CREATORS
 */
export const addToCart = entireCart => {
  return {type: ADDED_TO_CART, entireCart}
}

export const getCart = cart => {
  return {type: GET_CART, cart}
}
/**
 * THUNK CREATORS
 */
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
    default:
      return state
  }
}
