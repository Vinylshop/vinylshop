import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

/* -----------------    COMPONENT     ------------------ */



const orderState = ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']

const fakeOrders = [{
  id: 1,
  status: 'CREATED'
},{
  id: 2,
  status: 'CREATED'
},{
  id: 3,
    status: 'CREATED'
},{
  id: 4,
    status: 'PROCESSING'
},{
  id: 5,
  status: 'PROCESSING'
},{
  id: 6,
  status: 'PROCESSING'
}]

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
    const isAdmin = true
    return (
      <div className="container">
        { isAdmin && this.renderOrderSearch() }
        <br />

        <ul className="list-group">
          {
            fakeOrders
            .filter(this.filterOrder)
            .map((order, i) => <OrderItem order={order} key={i} />)
          }
        </ul>
      </div>
    );
  }

  renderOrderSearch() {
    return (
      <div>

        <select
          name="status"
          defaultValue=""
          onChange={evt => this.setState({status: evt.target.value})}
          required
        >

          <option value="" disabled>(select a status to filter by)</option>
          {
            orderState.map((stat, i) => (
              <option key={i} value={stat}>{stat}</option>
            ))
          }
        </select>

        <span className="glyphicon glyphicon-search" />
      </div>
    );
  }



  filterOrder(order) {
    const statusMatch = new RegExp(this.state.status, 'i');
    return statusMatch.test(order.status)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ orders }) => ({ orders });

const mapDispatch = {};

export default connect(mapState, mapDispatch)(OrderList);
