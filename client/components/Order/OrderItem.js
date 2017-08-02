import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateOrder} from '../../store/orders'

/* -----------------    COMPONENT     ------------------ */
const orderState = ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']

class OrderItem extends Component {
  constructor (props) {
    super(props)

    this.renderOrderChange = this.renderOrderChange.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }
  render () {
    const {currentUser, order} = this.props
    const creation = order.createdAt.split('T')

    return (
      <div>

        <ul className="list-inline">
          <li className="list-group-item">
            {currentUser.isAdmin && this.renderOrderChange()}
            <li>
              Order #:
              <Link to={`/orders/${order.id}`}>{order.id}</Link>
            </li>
            <li>
              <span>Status: {order.status}
              </span>
            </li>
            <li>
              <span>Date: {creation[0]}
                Time: {creation[1].substr(0, 5)}</span>
            </li>
            <li>
              Shipped To:

              {order.user && <Link to={`/users/${order.userId}`}>{order.user.username}</Link>}
              {order.email}
            </li>
          </li>
        </ul>

      </div>
    )
  }

  renderOrderChange () {
    return (

      <select name="status" defaultValue="" onChange={this.onChangeHandler} required>

        <option value="" disabled>(Change Order Status)</option>
        {orderState.map((status, i) => (
          <option key={i} value={status}>{status}</option>
        ))
        }
      </select>

    )
  }

  onChangeHandler (event) {
    let upOrder = {
      status: event.target.value
    }
    this.props.updateOrder(this.props.order.id, upOrder)
    event.target.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {
  updateOrder
}

export default connect(mapState, mapDispatch)(OrderItem)
