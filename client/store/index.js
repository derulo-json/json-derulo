import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import productsReducer from './products'
import singleproductReducer from './singleproduct'
import cartReducer from './cart'

// const initialState = {
//   products: [],
//   product: {},
//   currentUser: {},
//   users: [],
//   cart: [],
//   order: []
// }

const reducer = combineReducers({
  currentUser: userReducer,
  products: productsReducer,
  singleproduct: singleproductReducer,
  cart: cartReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
