import Axios from 'axios'
import initialState from './index'

const GET_ALL_CARTS_ITEMS = 'GET_ALL_CARTS_ITEMS'
const ADD_TO_CART = 'ADD_TO_CART'

export function getAllCartItems(cartItems) {
  return {type: GET_ALL_CARTS_ITEMS, cartItems}
}

const addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

export function getAllCartItemsThunk() {
  return async dispatch => {
    const {data} = await Axios.get('/api/cartItems')
    dispatch(getAllCartItems(data))
  }
}

export const addToCartThunk = item => async dispatch => {
  const {data} = await Axios.post(`/api/cartItems/`, {
    id: 1,
    quantity: 1,
    productId: item.id
  })
  dispatch(addToCart(data))
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARTS_ITEMS:
      return {...state, cartItems: action.cartItems}
    case ADD_TO_CART:
      return {...state, cartItems: action.singleproduct}
    default:
      return state
  }
}
