/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './NavBar'
export {default as UserHome} from './user-home'
export {default as HomePage} from './HomePage'
export {default as AllProducts} from './AllProducts'
export {default as Filtered} from './Filtered'
export {default as SingleProduct} from './SingleProduct'
export {default as MyCart} from './MyCart'

export {Login, Signup} from './auth-form'
