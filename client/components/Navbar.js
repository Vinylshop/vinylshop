import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

const Navbar = (props) => {
  return (
    <nav className='navbar'>
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
          <ul className='nav navbar-nav navbar-left'>
            <li>
              <NavLink to='/home' activeClassName='active'>Vinylshop</NavLink>
            </li>
          </ul>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <NavLink to='/signup' activeClassName='active'>Signup</NavLink>
            </li>
            <li>
              <NavLink to='/login' activeClassName='active'>login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Navbar)
