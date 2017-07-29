import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UserItem from './UserItem'

/* -----------------    COMPONENT     ------------------ */

const UserList = (props) => {
  return (
    <div className='container'>
      <div className='row heading'>
        <h3 className='display-5'>USER LIST</h3>
      </div>
      <div className='row'>
        <ul className='list-group'>
          {
		        props.users.map(user => <UserItem key={user.id} user={user} />)
		      }
        </ul>
      </div>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users }) => ({ users })
const mapDispatch = null

export default connect(mapState, mapDispatch)(UserList)
