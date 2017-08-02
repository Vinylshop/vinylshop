import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { updateOrder, fetchOrder } from '../../store/orders'
import { Link } from 'react-router-dom'
import Items from './Items'
import OrderItem from './OrderItem'

/* -----------------    COMPONENT     ------------------ */

let orderTotal = 0

class OrderDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      order: {
        status: ''
      }
    }
    this.updateTotal = this.updateTotal.bind(this)
  }

  componentDidMount () {
    this.props.fetchOrderData()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchOrderData()
    }

    this.setState({order: newProps.order})
  }

  render () {
    const order = this.state.order
    if (!order.userId) return // if order has yet to load or is invalid

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6 col-lg-offset-3'>
            <OrderItem order={order} key={order.id} />
          </div>

          <div className='row'>
            <div className='col-lg-6 col-lg-offset-3'>
              <ul className='list-group'>
                <li className='list-group-item'>

                  <li> Shipping Address: </li>
                  <li>
                    <span>{order.address}</span>
                  </li>
                  <li>
                    <span>{order.city}, {order.state}</span>
                  </li>
                  <li>
                    <span>{order.zipCode}</span>
                  </li>
                </li>
              </ul>
            </div>
          </div>

          <div className='row heading text-center'>
            <div className='col-lg-6 col-lg-offset-3'>
              <div>ORDER ITEMS</div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-6 col-lg-offset-3'>
              {
                order.orderItems.map(item => {
                  return <Items key={item.id} item={item} />
                })
              }
              <span>SUBTOTAL:</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  updateTotal (quantity, cost) {
    orderTotal += (quantity * cost)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ orders, currentUser }, ownProps) => {
  const order = orders.find(orderIter => orderIter.id === +ownProps.match.params.id)
  const OrderId = ownProps.orderId
  return { order, OrderId, currentUser}
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchOrderData: () => {
      const orderId = ownProps.match.params.id
      dispatch(fetchOrder(orderId))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderDetail)
