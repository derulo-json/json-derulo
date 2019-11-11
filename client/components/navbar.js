import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getCartThunk} from '../store/CartReducer'
import {Icon} from 'semantic-ui-react'
import './NavBar.css'

const Navbar = ({handleClick, isLoggedIn, cart}) => (
  <div>
    <nav>
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
          <Link to="/home">Home</Link>
          <Link id="Cart-Length" to="/cart">
            {cart ? (
              <div>
                <div id="cart-count">{cart}</div>
                <div>
                  <Icon name="shopping cart" />
                </div>
              </div>
            ) : (
              <Icon name="shopping cart" />
            )}
          </Link>
          <div className="dropdown">
            <button background-color="unset" type="button" className="dropbtn">
              Shop
            </button>
            <div className="dropdown-content">
              <Link to="/allproducts">All Products</Link>
              <Link to="/apparel">Apparel </Link>
              <Link to="/music">Music</Link>
              <Link to="/treasures">Treasures</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
function cartCounter(cart) {
  if (cart) {
    if (cart.products) {
      return cart.products.length
    } else {
      return cart
    }
  } else {
    return console.log(cart)
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: cartCounter(state.cart.cart)
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getCartThunk: () => dispatch(getCartThunk())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
