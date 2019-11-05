import Axios from 'axios'
import history from '../history'
import initialState from './index'

const GET_ALL_CARTS_ITEMS = 'GET_ALL_CARTS_ITEMS'

export function getAllCartItems(cartItems) {
  return {type: GET_ALL_CARTS_ITEMS, cartItems}
}

export function getAllCartItemsThunk() {
  return async dispatch => {
    const {data} = await Axios.get('/api/cartsItems')
    dispatch(getAllCartItems(data))
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS_ITEMS:
      return {...state, cartItem: action.cartItems}
    default:
      return state
  }
}
