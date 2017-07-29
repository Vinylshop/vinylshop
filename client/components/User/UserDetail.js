import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom'
import UserItem from '../User/UserItem'
// import OrderItem from './OrderItem';

/* -----------------    COMPONENT     ------------------ */

class UserDetail extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
  	const { user, orders } = props
  	return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <UserItem campus={user} />
          <div className='form-group'>
	          <form onSubmit={this.handleSubmit}>
	            <select name='select' className='form-control' id="select-dropdown">
	              <option value='Admin?'>Administrator Access?</option>
	              <option key={user.id} value='true'>YES</option>
	              <option key={user.id} value='false'>NO</option>
	            </select>
	            <button type='submit' className='btn btn-primary btn-submit'>
	              <span className='glyphicon glyphicon-plus' />
	            </button>
	          </form>
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
}

handleSubmit(event) {
    event.preventDefault()
    const user = {
      isAdmin: event.target.select.value
    }
    this.props.updateUser(user)
    event.target.title.value = ''
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
