import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom'
import UserItem from '../User/UserItem'
import OrderItem from '../Order/OrderItem'
import { updateUser } from '../../store/users'

/* -----------------    COMPONENT     ------------------ */

const adminState = ['true', 'false']
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
          <div className='col-lg-6 col-lg-offset-3'>
            <UserItem user={user} />
            <div>
              <h5>{user.isAdmin ? 'Administrator' : 'Regular User'}</h5>
              {
                currentUser.isAdmin && this.renderAdminChange()
              }
            </div>
            <div>
              <h5>{user.promptChange ? 'Reset Password' : 'No Password Change'}</h5>
              {
                currentUser.isAdmin && this.renderPromptChange()
              }
            </div>
          </div>
          <div className='col-lg-6 col-lg-offset-3'>
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
        <select className='form-control' name='isAdmin' defaultValue='' onChange={this.handleAdminChange} required>
          <option value='' disabled>Administrator?</option>
          {
              adminState.map((isAdmin, i) => (
                <option key={i} value={isAdmin}>{isAdmin}</option>
              ))
            }
        </select>
      </div>
    )
  }

  renderPromptChange () {
    return (
      <div>
        <select className='form-control' name='prompt' defaultValue='' onChange={this.handlePromptChange} required>
          <option value='' disabled>Reset Password?</option>
          {
              promptState.map((prompt, i) => (
                <option key={i} value={prompt}>{prompt}</option>
              ))
            }
        </select>
      </div>
    )
  }

  handleAdminChange (event) {
    let upAdmin = {
      isAdmin: (event.target.value === 'true')
    }
    this.props.updateUser(this.props.user.id, upAdmin)
  }

  handlePromptChange (event) {
    let upPrompt = {
      promptChange: (event.target.value === 'true')
    }
    this.props.updateUser(this.props.user.id, upPrompt)
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
