import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../../actions/auth"

const Navbar = ({ auth, logout }) => {
  const { isAuthenticated, loading } = auth

  const authLinks = (
    <ul className='navbar-nav text-center ml-auto'>
      <li className='nav-item mx-3'>
        <Link to='/Profiles' className='nav-link'>
          Developers
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/Posts' className='nav-link'>
          Posts
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/Dashboard' className='nav-link'>
          Dashboard
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link onClick={logout} className='nav-link' to='/'>
          Logout
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item  mx-3'>
        <Link to='/Profiles' className='nav-link'>
          Developers
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/Login' className='nav-link'>
          Login
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/Register' className='nav-link'>
          Register
        </Link>
      </li>
    </ul>
  )

  return (
    <div className='mb-0'>
      <div className='navbar navbar-dark bg-dark navbar-expand-sm mx-1 '>
        <h2 className='text-secondary mx-5 my-4'>Dev Connector</h2>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
