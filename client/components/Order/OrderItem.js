import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateOrder } from '../../store/orders'

/* -----------------    COMPONENT     ------------------ */
const orderState = ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED',]

class OrderItem extends Component {
  constructor (props) {
    super(props)

    this.renderOrderChange = this.renderOrderChange.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  render () {
    const {order} = this.props
    const isAdmin = true
    return (
      <li className="list-group-item">
        <ul className="list-inline">
          <li>
            <Link className="large-font" to={`/orders/${order.id}`}>Order #:{order.id}</Link>
          </li>
          <li>
            <span>by</span>
          </li>
          <li>
            <Link to={`/users/${order.userId}`}>User: {order.userId}</Link>
          </li>
          <li>
            <span>on</span>
          </li>
          <li>
            <span>{order.createdAt}</span>
          </li>
          <li>
            <span>{order.status}</span>
          </li>
        </ul>
        {
          isAdmin && this.renderOrderChange()

        }
      </li>
    )
  }

  renderOrderChange () {
    return (
      <div className="list-group-item">
        <ul className="list-inline">
          <li>
            <select
              name="status"
              defaultValue=""
              onChange={this.onChangeHandler}
              required
            >

              <option value="" disabled>(Change Order Status)</option>
              {
                orderState.map((status, i) => (
                  <option key={i} value={status}>{status}</option>
                ))
              }
            </select>
          </li>

        </ul>
        <span className="glyphicon glyphicon-search"/>
      </div>
    )
  }

  onChangeHandler (event) {
    let updateOrder = {
      status: event.target.value
    }
    // console.log(this.props)
    // this.props.updateOrder()(this.props.order.orderId, updateOrder)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null
const mapDispatch = ({updateOrder}) => ({updateOrder})

export default connect(mapState, mapDispatch)(OrderItem)
