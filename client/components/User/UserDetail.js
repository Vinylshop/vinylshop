import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom'
import UserItem from '../User/UserItem'
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
    this.renderPromptChange = this.renderPromptChange.bind(this)
    this.handlePromptChange = this.handlePromptChange.bind(this)
  }

  render () {
    const { user, orders, currentUser } = this.props
    // const isAdmin = true
    // if an admin user, add a link to let them access all the orders(?)

    if (!user.id) return <div />
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <UserItem user={user} />
            <div>
              <span>{user.isAdmin ? 'Administrator' : 'Regular User'}</span>
              {
                currentUser.isAdmin && this.renderAdminChange()
              }
            </div>
            <div>
              <span>{user.promptChange ? 'Reset Password' : 'No Password Change'}</span>
              {
                currentUser.isAdmin && this.renderPromptChange()
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

  renderPromptChange () {
    return (
      <div>
        <select name='prompt' defaultValue='' onChange={this.handlePromptChange} required>
          <option value='' disabled>(Reset Password)</option>
          {
              promptState.map((prompt, i) => (
                <option key={i} value={prompt}>{prompt}</option>
              ))
            }
        </select>
        <span className='glyphicon glyphicon-search' />
      </div>
    )
  }

  handleAdminChange (event) {
    let upAdmin = {
      isAdmin: (event.target.value === 'true')
    }
    this.props.updateUser(this.props.user.id, upAdmin)
    event.target.value = ''
  }

  handlePromptChange (event) {
    let upPrompt = {
      promptChange: (event.target.value === 'true')
    }
    this.props.updateUser(this.props.user.id, upPrompt)
    event.target.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, orders, currentUser }, ownProps) => {
  const paramId = Number(ownProps.match.params.id)
  return {
    user: _.find(users, user => user.id === paramId),
    orders,
    currentUser
  }
}

const mapDispatch = { updateUser }

export default connect(mapState, mapDispatch)(UserDetail)
