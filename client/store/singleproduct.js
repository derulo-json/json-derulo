import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * ACTION CREATORS
 */
const getSingleProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

/**
 * THUNK CREATORS
 */
export const gotProductThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
