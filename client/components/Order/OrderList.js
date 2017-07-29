import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

/* -----------------    COMPONENT     ------------------ */



const orderState = ['CREATED', 'MOVED','SHIPPED', 'RECIEVED']


class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      name: ''
    };

    this.filterOrder = this.filterOrder.bind(this);
    this.renderOrderSearch = this.renderOrderSearch.bind(this);
  }

  render() {
    const isAdmin = false
    return (
      <div className="container">
        { isAdmin && this.renderOrderSearch() }
        <br />

        <ul className="list-group">
          {
            this.props.orders
            .filter(this.filterOrder)
            .map(order => <OrderItem order={order} key={order.id} />)
          }
        </ul>
      </div>
    );
  }

  renderOrderSearch() {
    return (
      <div className="list-group-item">
        <ul className="list-inline">
          <li>
            <select
              name="status"
              defaultValue=""
              onChange={evt => this.setState({status: evt.target.value})}
              required
            >

              <option value="" disabled>(select a status to filter by)</option>
              {
                orderStatus.map((stat, i) => (
                  <option key={i} value={stat}>{stat}</option>
                ))
              }
            </select>
          </li>

        </ul>
        <span className="glyphicon glyphicon-search" />
      </div>
    );
  }



  filterOrder(story) {
    const statusMatch = new RegExp(this.state.status, 'i');
    return statusMatch.test(order.status)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ orders }) => ({ orders });

const mapDispatch = {};

export default connect(mapState, mapDispatch)(OrderList);
