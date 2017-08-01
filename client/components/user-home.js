import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const UserHome = (props) => {

  const {email, currentUser} = props

  return (
    <div>
      <h3>Welcome, {currentUser.username}</h3>
      <h4> Your past orders</h4>
      {currentUser.promptChange && passwordResetForm()}
    </div>
  );
};

function passwordResetForm(){
  return(
    <div>
      <h4>An admin has prompted that you change your password.</h4>
      <form>
        <input
          placeholder="enter new password"
          type="text"
        />
        <button
          type="submit"
        className="btn btn-default">
          <span className="glyphicon glyphicon-plus"/>
          Submit
        </button>
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
