import axios from 'axios'
import history from '../history'
import initialState from './index'

/**
 * ACTION TYPES
 */
const ADDED_TO_CART = 'ADDED_TO_CART'

/**
 * ACTION CREATORS
 */
export const addToCart = entireCart => {
  return {type: ADDED_TO_CART, entireCart}
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

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case ADDED_TO_CART:
      return action.entireCart
    default:
      return state
  }
}
