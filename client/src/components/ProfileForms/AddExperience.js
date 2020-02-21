import React, { Fragment, useState } from "react"
import { connect } from "react-redux"
import { addExperience } from "../../actions/profile"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  })

  const [toDateDisabled, toggleDisable] = useState(false)

  const { company, title, location, from, to, current, description } = formData

  const changeHandler = event => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = event => {
    event.preventDefault()
    addExperience(formData, history)
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='mt-3'>
          <h2 className='mx-auto'>Add an experience</h2>
          <p className='lead'>
            Any any programming experience which you had in past
          </p>
          <form className='form' onSubmit={event => submitHandler(event)}>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='company'
                value={company}
                onChange={event => changeHandler(event)}
                placeholder='* Company'
              />
            </div>

            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='title'
                value={title}
                onChange={event => changeHandler(event)}
                placeholder='* Title'
              />
            </div>

            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='location'
                value={location}
                onChange={event => changeHandler(event)}
                placeholder='Location'
              />
            </div>

            <div className='form-group'>
              <h4>From Date:</h4>
              <input
                className='form-control'
                type='date'
                name='from'
                value={from}
                onChange={event => changeHandler(event)}
              />
            </div>

            <div className='form-group'>
              <input
                className='currentexp'
                type='checkbox'
                checked={current}
                name='current'
                value={current}
                onChange={event => {
                  setFormData({ ...formData, current: !current })
                  toggleDisable(!toDateDisabled)
                }}
              />
              <h4>Current Job: </h4>
            </div>

            <div className='form-group'>
              <h4>To Date:</h4>
              <input
                className='form-control'
                type='date'
                name='to'
                value={to}
                onChange={event => changeHandler(event)}
                disabled={toDateDisabled ? "disabled" : ""}
              />
            </div>

            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='description'
                value={description}
                onChange={event => changeHandler(event)}
                placeholder='Description'
              />
            </div>

            <button type='submit' className='btn btn-primary  ml-0 mr-2 p-2'>
              Submit
            </button>

            <Link to='/Dashboard' className='btn btn-secondary my-2 p-2'>
              Go back
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default connect(null, { addExperience })(withRouter(AddExperience))
