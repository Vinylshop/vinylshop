import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {logout} from '../store'

/* -----------------    COMPONENT     ------------------ */

const Navbar = (props) => {
  const {handleClick, isLoggedIn} = props

  return (
    <nav className='navbar navbar-inverse'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='.navbar-collapse'>
            <span className='icon-bar' />
            <span className='icon-bar' />
            <span className='icon-bar' />
          </button>
          <a class='navbar-brand' href='#'>Vinylshop</a>
        </div>
        {
          isLoggedIn
          ? <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <NavLink to='/home' activeClassName='active'>Home</NavLink>
              </li>
              <li>
                <a href='#' onClick={handleClick}>Logout</a>
              </li>
            </ul>
          </div>
          : <div className='collapse navbar-collapse'>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <NavLink to='/signup' activeClassName='active'>Signup</NavLink>
              </li>
              <li>
                <NavLink to='/login' activeClassName='active'>login</NavLink>
              </li>
            </ul>
          </div>
      }
      </div>
    </nav>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    isLoggedIn: !!state.currentUser.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar))

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
