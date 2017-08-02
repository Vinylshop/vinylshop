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
        <div>
          <NavLink id='user-name' activeClassName='active' to={`/users/${user.id}`}>
            { user.username }
          </NavLink>
          <button className='btn-remove' onClick={this.handleRemove}>
            <i className='fa fa-times fa-2x fa-pull-right' />
          </button>
        </div>
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
