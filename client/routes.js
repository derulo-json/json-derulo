import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  HomePage,
  AllProducts,
  SingleProduct,
  MyCart
} from './components'
import Home from './components/Home'
import {me} from './store'

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/cart" component={MyCart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route path="/allproducts/:id" component={SingleProduct} />
        <Route
          path="/allproducts"
          render={() => <AllProducts category="all" />}
        />
        <Route
          path="/apparel"
          render={() => <AllProducts category="apparel" />}
        />
        <Route path="/music" render={() => <AllProducts category="music" />} />
        <Route
          path="/treasures"
          render={() => <AllProducts category="treasures" />}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={HomePage} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={HomePage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      // dispatch(getAllProducts(aefaegw))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
