import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4 col-lg-offset-4'>
          <form onSubmit={handleSubmit} name={name}>
            {
              (name === 'signup') &&
              <div className='form-group'>
                <label htmlFor='username'><small>Name</small></label>
                <input name='username' type='text' className='form-control' id='form-field' />
              </div>
            }
            <div className='form-group'>
              <label htmlFor='email'><small>Email</small></label>
              <input name='email' type='text' className='form-control' id='form-field' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'><small>Password</small></label>
              <input name='password' type='password' className='form-control' id='form-field' />
            </div>
            <div>
              <button type='submit' className='btn btn-submit'>{displayName}</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </div>
      <div className='row oauth'>
        <div className='col-lg-4 col-lg-offset-4'>
          <a href='/auth/google'>{displayName} with Google</a>
        </div>
      </div>
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
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.currentUser.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.currentUser.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      let username = null
      if (formName === 'signup') username = evt.target.username.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(username, email, password, formName))
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
