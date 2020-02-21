import React from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/Dashboard'></Redirect>
  }

  return (
    <div className='mt-0'>
      <div className='landing'>
        <div className='container '>
          <h2 className='devconnecter'>Connecting Developers</h2>
          <p className='portfolio'>
            Create a developer portfolio, share post and get help form other
            developer's
          </p>

          <Link to='/Register' className='text btn btn-secondary  register'>
            Sign Up
          </Link>

          <Link to='/Login' className='text btn btn-secondary login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing)
