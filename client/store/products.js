import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
/**
 * ACTION CREATORS
 */
const getAllProducts = products => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

/**
 * THUNK CREATORS
 */
export const gotAllProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
