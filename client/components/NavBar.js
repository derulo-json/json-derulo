import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getCartThunk} from '../store/cart'
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
