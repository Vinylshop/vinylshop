import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateOrder, fetchOrder } from '../../store/orders';

/* -----------------    COMPONENT     ------------------ */

class StoryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {
        status: ''
      }
    }
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
    let orderTotal = 0;
    if (!order) return <div />;//if order has yet to load or is invalid
    return (
      <div className="container">
        <ul className="list-inline">
          <li>
            <Link to={`/orders/${order.id}`}>{order.id}</Link>
          </li>
          <li>
            <span>Status:{order.status}</span>
          </li>
          <li>
            <span>by</span>
          </li>
          <li>
            <Link to={`/users/${order.userId}`}>{order.userId}</Link>
          </li>
          <li>
            <span>on</span>
          </li>
          <li>
            <span>{order.createdAt}</span>
          </li>
          <li>
            {
              order.orderItems.map(item => (
                {orderTotal += item.quantity * item.price}
                  <Items key={item.id} item={item} />
              ))
            }
          </li>
          <li>
            <span>SUBTOTAL:{orderTotal}</span>
          </li>
        </ul>
        <br />
      </div>
    );
  }

}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ orders }, ownProps) => {
  const order = orders.find(orderIter => orderIter.id === +ownProps.match.params.id);
  const OrderId = ownProps.orderId;
  return { order, OrderId};
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchOrderData: () => {
      const orderId = ownProps.match.params.id;
      dispatch(fetchOrder(OrderId));
    }
  };
};

export default connect(mapState, mapDispatch)(StoryDetail);
