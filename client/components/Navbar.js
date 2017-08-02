import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import {logout} from '../store'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.renderLoggedIn = this.renderLoggedIn.bind(this)
    this.renderLoggedOut = this.renderLoggedOut.bind(this)
  }

  render () {
    const {isLoggedIn} = this.props

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
              <li>
                <NavLink to='/products' activeClassName='active'>Products</NavLink>
              </li>

            </ul>
          </div>
          <div className='collapse navbar-collapse'>
            {
            isLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut()
            }
          </div>
        </div>
      </nav>
    )
  }

  renderLoggedIn () {
    return (
      <ul className='nav navbar-nav navbar-right'>
        {
          this.props.currentUser.isAdmin && (
            <li>
              <NavLink to='/orders' activeClassName='active'>All Orders</NavLink>
            </li>
          )
        }
        {
          this.props.currentUser.isAdmin && (
            <li>
              <NavLink to='/users' activeClassName='active'>All Users</NavLink>
            </li>
          )
        }
        <li>
          <a href='/cart'>
            <i className='fa fa-shopping-cart white' aria-hidden='true' />
          </a>
        </li>
        <li>
          <NavLink to='/home' activeClassName='active'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/login' onClick={this.props.handleClick} activeClassName='active'>Logout</NavLink>
        </li>
      </ul>
    )
  }

  renderLoggedOut () {
    return (
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <a href='/cart'>
            <i className='fa fa-shopping-cart white' aria-hidden='true' />
          </a>
        </li>
        <li>
          <NavLink to='/signup' activeClassName='active'>Signup</NavLink>
        </li>
        <li>
          <NavLink to='/login' activeClassName='active'>login</NavLink>
        </li>
      </ul>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    isLoggedIn: !!state.currentUser.id,
    currentUser: state.currentUser
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
