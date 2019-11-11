import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
/**
 * ACTION CREATORS
 */
const getSingleProduct = singleproduct => {
  return {
    type: GET_PRODUCT,
    singleproduct
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
      return action.singleproduct
    default:
      return state
  }
}
