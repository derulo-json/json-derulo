import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleproduct from './singleproduct'
import cart from './cart'

const initialState = {
  products: [],
  product: {},
  user: {},
  users: [],
  cart: [],
  cartItems: []
}

const reducer = combineReducers({user, products, singleproduct, cart})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
