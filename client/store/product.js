import axios from 'axios'
import initialState from './index'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

const getAllProducts = () => {
  return {
    type: GET_ALL_PRODUCTS,
    products
  }
}

export const gotAllProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('')
  } catch (error) {
    next(error)
  }
}
