import React, { Fragment, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { login } from "../../actions/auth"
import { connect } from "react-redux"

const Login = ({ login, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData

  const changeHandler = event => {
    event.preventDefault()
    setformData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = async event => {
    event.preventDefault()
    login({ email, password })
  }

  if (isAuthenticated) {
    return <Redirect to='/Dashboard'></Redirect>
  }

  return (
    <Fragment>
      <div className='mt-5'>
        <div className='col-md-6 m-auto'>
          <div className='card card-body'>
            <h3 className='text-center'>Login</h3>

            <form onSubmit={event => submitHandler(event)}>
              <div className='form-group'>
                <label>Email</label>
                <input
                  className='form-control'
                  type='email'
                  name='email'
                  value={email}
                  onChange={event => changeHandler(event)}
                  placeholder='Enter a email'
                />
              </div>

              <div className='form-group'>
                <label>Password</label>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  value={password}
                  onChange={event => changeHandler(event)}
                  placeholder='Enter Password'
                />
              </div>

              <button type='submit' className='btn btn-primary btn-block my-2'>
                Login
              </button>
            </form>

            <p className='text-center my-1'>
              New User? <Link to='/Register'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
