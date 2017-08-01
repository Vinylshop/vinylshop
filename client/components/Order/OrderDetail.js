import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateOrder, fetchOrder } from '../../store/orders';
import { Link } from 'react-router-dom';
import Items from './Items'
import OrderItem from './OrderItem'

/* -----------------    COMPONENT     ------------------ */

let orderTotal = 0;

class OrderDetail extends React.Component {
  constructor(props) {
    super(props);

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

    this.setState({
      order: newProps.order
    })
  }
  render() {
    const order = this.state.order;
    if (!order.userId) return <div />;//if order has yet to load or is invalid

    return (
      <div className="container">
        <OrderItem order={order} key={order.id}/>
        <ul className="list-inline">
          <li className="list-group-item">

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
        <div>
          <div>Order Items</div>
          {
            order.orderItems.map(item => {
              return  <Items key={item.id} item={item} />
            })
          }

          <span>SUBTOTAL:</span>
        </div>
        <br />
      </div>
    );
  }

  updateTotal(quantity, cost) {
    orderTotal += (quantity * cost)
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ orders, currentUser }, ownProps) => {
  const order = orders.find(orderIter => orderIter.id === +ownProps.match.params.id);
  const OrderId = ownProps.orderId;
  return { order, OrderId, currentUser};
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchOrderData: () => {
      const orderId = ownProps.match.params.id;
      dispatch(fetchOrder(orderId));
    }
  };
};

export default connect(mapState, mapDispatch)(OrderDetail);
