import React, { Fragment } from "react"
import { Link } from "react-router-dom"
const DashboardActions = () => {
  return (
    <Fragment>
      <Link
        to='/Edit-Profile'
        className='dashboard btn btn-secondary ml-0 p-2 mr-1'
      >
        Edit Profile
      </Link>

      <Link
        to='/Add-Experience'
        className='dashboard btn btn-secondary m-2 p-2'
      >
        Add Experience
      </Link>

      <Link to='/Add-Education' className='dashboard btn btn-secondary m-2 p-2'>
        Add Education
      </Link>
    </Fragment>
  )
}

export default DashboardActions
