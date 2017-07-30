import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom'
import UserItem from '../User/UserItem'
import OrderItem from '../Order/OrderItem'
import { updateUser } from '../../store/users'

/* -----------------    COMPONENT     ------------------ */

const UserDetail = (props) => {
  const { user, orders } = props

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <UserItem user={user} />
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
