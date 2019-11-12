import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import './NavBar'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {SIGHUP} from 'constants'
import Navbar from './NavBar'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const loggin = 'Log-in to your account'
  const signup = 'Sign up for an Account'
  const isLoggedIn = props
  return (
    <div>
      <Navbar />
      <Grid textAlign="center" style={{height: 100}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            {displayName === 'Login' && loggin}
            {displayName === 'Sign Up' && signup}
          </Header>
          <Form onSubmit={handleSubmit} name={name} size="large">
            <Segment stacked style={{width: ' -webkit-fill-available'}}>
              <Form.Input
                type="email"
                name="email"
                width="15"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                name="password"
                fluid
                width="15"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                required
              />
              <Button type="submit" color="teal" fluid size="large">
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
            </Segment>
          </Form>
          {displayName === 'Login' && (
            <Message>
              New to us?{' '}
              <Link to="/signup">
                {' '}
                <a href="#"> Sign Up</a>{' '}
              </Link>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      localStorage.clear()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
