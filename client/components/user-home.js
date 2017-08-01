import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import UserDetail from './User/UserDetail'

/**
 * COMPONENT
 */
const UserHome = (props) => {
  const {email, currentUser} = props

  return (
    <div className='container'>
      <div className='row heading text-center'>
        <h3 className='display-5'>Welcome, {currentUser.username} !</h3>
        <Link to={`/users/${currentUser.id}`}>View your past orders.</Link>
      </div>
      <div className='row text-center'>
        {currentUser.promptChange && passwordResetForm()}
      </div>
    </div>
  )
}

function passwordResetForm () {
  return (
    <div className='col-lg-4 col-lg-offset-4'>
      <h4>Please change your password.</h4>
      <form className='form-group'>
        <input placeholder='enter new password' type='text' className='form-control' id='form-field' />
        <button type='submit' className='btn btn-submit'>Submit</button>
      </form>
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.currentUser.email,
    currentUser: state.currentUser
  }
}
const mapDispatch = (dispatch) => {

}
export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
