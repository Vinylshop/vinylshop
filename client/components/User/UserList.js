import React from 'react'
import { connect } from 'react-redux'
import UserItem from './UserItem'

/* -----------------    COMPONENT     ------------------ */

const UserList = (props) => {
  return (
    <div className='container'>
      <div className='row heading text-center'>
        <div className='col-lg-6 col-lg-offset-3'>
          <h3 className='display-5'>USER LIST</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6 col-lg-offset-3'>
          <ul className='list-group'>
            {
              props.users.map(user => <UserItem key={user.id} user={user} />)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users }) => ({ users })
const mapDispatch = null

export default connect(mapState, mapDispatch)(UserList)
