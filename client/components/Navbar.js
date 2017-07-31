import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import {logout} from '../store'

/* -----------------    COMPONENT     ------------------ */

const Navbar = (props) => {
  const {handleClick, isLoggedIn} = props

  return (
    <nav className='navbar navbar-default'>
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
          <Link className='navbar-brand' to='/'><img src='/images/vinylshoplogo.png' /></Link>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav justify-content-end'>
            {
              isLoggedIn
                ? <li>
                  {/* The navbar will show these links after you log in */}
                  <NavLink to='/home' activeClassName='active'>Home</NavLink>
                  <a href='#' onClick={handleClick}>Logout</a>
                </li>
                : <li>
                  {/* The navbar will show these links before you log in */}
                  <NavLink to='/login' activeClassName='active'>Login</NavLink>
                  <NavLink to='/signup' activeClassName='active'>Sign Up</NavLink>
                </li>
            }
          </ul>
          { this.renderLogout() }
          { this.renderLoginSignup() }
        </div>
      </div>
    </nav>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/* -----------------    PROP TYPES     ------------------ */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
