import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateOrder } from '../../store/orders';


/* -----------------    COMPONENT     ------------------ */
const orderState = ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']

class OrderItem extends Component {
  render() {
    const { order, removeOrder} = this.props
    const isAdmin = false
    return (
      <li className="list-group-item">
        <ul className="list-inline">
          <li>
            <Link className="large-font" to={`/orders/${order.id}`}>{order.id}</Link>
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
        </ul>
        {
          isAdmin && renderOrderChange()

        }
      </li>
    );
  }
  renderOrderChange() {
    return (
      <div className="list-group-item">
        <ul className="list-inline">
          <li>
            <select
              name="status"
              defaultValue=""
              onChange={onChangeHandler}
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
        <span className="glyphicon glyphicon-search" />
      </div>
    );
  }

  onChangeHandler(event){
    let updateOrder = {
      status: event.target.value
    }
    props.updateOrder(props.order.orderId, updateOrder)
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = null;
const mapDispatch = ({updateOrder}) => ({ updateOrder });

export default connect(mapState, mapDispatch)(OrderItem);
