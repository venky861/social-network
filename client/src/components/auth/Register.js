import React, { Fragment, useState } from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { setAlert } from "../../actions/alert"
import { register } from "../../actions/auth"
import PropTypes from "prop-types"

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const { name, email, password, password2 } = formData

  const changeHandler = event => {
    event.preventDefault()
    setformData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = async event => {
    event.preventDefault()
    if (password !== password2) {
      setAlert("Password does not match", "danger")
    } else {
      register({ name, email, password })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/Dashboard'></Redirect>
  }

  return (
    <Fragment>
      <div className='mt-5'>
        <div className='col-md-6 m-auto'>
          <div className='card card-body'>
            <h3 className='text-center'>Registeration</h3>
            <form onSubmit={event => submitHandler(event)}>
              <div className='form-group'>
                <label>Name</label>
                <input
                  className='form-control'
                  type='name'
                  name='name'
                  value={name}
                  onChange={event => changeHandler(event)}
                  placeholder='Enter a name'
                />
              </div>

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

              <div className='form-group'>
                <label>Confirm Password</label>
                <input
                  className='form-control'
                  type='password'
                  name='password2'
                  id='password2'
                  value={password2}
                  onChange={event => changeHandler(event)}
                  placeholder='Enter Password'
                />
              </div>

              <button type='submit' className='btn btn-primary btn-block my-1'>
                Register
              </button>
            </form>

            <p className='text-center my-2'>
              Have a account? <Link to='/Login'>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
