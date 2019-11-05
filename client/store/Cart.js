import Axios from 'axios'
import history from '../history'
import initialState from './index'

const NEW_CART = 'NEW_CART'
const GET_ALL_CARTS = 'GET_ALL_CARTS'

export function newCart(cart) {
  return {type: NEW_CART, cart}
}

export function getAllCarts(carts) {
  return {type: GET_ALL_CARTS, carts}
}

export function newCartThunk() {
  return async dispatch => {
    const {data} = await Axios.create('/api/carts', {})
  }
}

export function getAllCartsThunk() {
  return async dispatch => {
    const {data} = await Axios.get('/api/carts')
    dispatch(getAllCarts(data))
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS:
      return {...state, carts: action.carts}
    default:
      return state
  }
}
