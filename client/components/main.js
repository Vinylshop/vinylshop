import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Navbar from './Navbar'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = ({ children }) => {
  <div id='main' className='container-fluid'>
    <Navbar />
    { children }
  </div>
}

export default Main
