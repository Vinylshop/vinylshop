import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom'
import UserItem from './UserItem'
import OrderItem from '../Order/OrderItem'
import { updateUser } from '../../store/users'

/* -----------------    COMPONENT     ------------------ */
const adminState = ['true', 'false'] // tk: why have two?
const promptState = ['true', 'false']

class UserDetail extends Component {
  constructor (props) {
    super(props)
    this.renderAdminChange = this.renderAdminChange.bind(this)
    this.handleAdminChange = this.handleAdminChange.bind(this)
  }

  render () {
    const { user, orders } = this.props
    const isAdmin = true
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <UserItem user={user} />
            <div>
              <span>Administrator: {user.isAdmin}</span>
              {
              isAdmin && this.renderAdminChange()
              }
            </div>
            <ul>
              <li>
                {
                orders
                .filter(order => order.userId === user.id)
                .map(order => <OrderItem order={order} key={order.id} />)
              }
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderAdminChange () {
    return (
      <div>
        <select name='isAdmin' defaultValue='' onChange={this.handleAdminChange} required>
          <option value='' disabled>(Administrator)</option>
          {
            adminState.map((isAdmin, i) => (
              <option key={i} value={isAdmin}>{isAdmin}</option>
            ))
          }
        </select>
        <span className='glyphicon glyphicon-search' />
      </div>
    )
  }

  handleAdminChange (event) {
    let upAdmin = {
      isAdmin: event.target.value
    }
    this.props.updateUser(this.props.user.id, upAdmin)
    event.target.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, orders }, ownProps) => {
  const paramId = Number(ownProps.match.params.id)
  return {
    user: _.find(users, user => user.id === paramId),
    orders
  }
}

const mapDispatch = { updateUser }

export default connect(mapState, mapDispatch)(UserDetail)
