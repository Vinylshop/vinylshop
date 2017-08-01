import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { removeUser } from '../../store/users'

/* -----------------    COMPONENT     ------------------ */

class UserItem extends Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  render () {
    const { user } = this.props
    return (
      <li className='list-group-item'>
        <div className='user-item'>
          <NavLink activeClassName='active' to={`/users/${user.id}`}>
            <h3>{ user.username }</h3>
          </NavLink>
        </div>
        <button className='btn-remove' onClick={this.handleRemove}>
          <i className='fa fa-times fa-2x fa-pull-right' />
        </button>
      </li>
    )
  }

  handleRemove (event) {
    event.stopPropagation()
    const { user } = this.props
    console.log(user)
    this.props.removeUser(user.id)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null
const mapDispatch = { removeUser }

export default connect(mapState, mapDispatch)(UserItem)
