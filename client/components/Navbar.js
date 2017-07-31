import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

const Navbar = (props) => {
  return (
    <div className='container'>
      <ul className='nav justify-content-end'>
        <li className='nav-item'><NavLink to='/' className='nav-link'>Home</NavLink></li>
        <li className='nav-item'><NavLink to='/signup' className='nav-link'>Signup</NavLink></li>
        <li className='nav-item'><NavLink to='/login' className='nav-link'>Login</NavLink></li>
      </ul>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Navbar)

<nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to='/home'>Home</Link>
              <a href='#' onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
        }
      </nav>
