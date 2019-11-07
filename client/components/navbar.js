import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './NavBar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>JSON Derulo</h1>
    <nav>
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
      <Link to="/cart">Cart</Link>
      <div className="dropdown">
        <button type="button" className="dropbtn">
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
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      localStorage.clear()
    }
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
