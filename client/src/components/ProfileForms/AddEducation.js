import React, { Fragment, useState } from "react"
import { connect } from "react-redux"
import { addEducation } from "../../actions/profile"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  })

  const [toDateDisabled, toggleDisable] = useState(false)

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData

  const changeHandler = event => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = event => {
    event.preventDefault()
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='mt-3'>
          <h2 className='mx-auto'>Add your education</h2>
          <p className='lead'>And school , degree etc</p>
          <form className='form' onSubmit={event => submitHandler(event)}>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='school'
                value={school}
                onChange={event => changeHandler(event)}
                placeholder='* School'
              />
            </div>

            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='degree'
                value={degree}
                onChange={event => changeHandler(event)}
                placeholder='* Degree or certificate'
              />
            </div>

            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                name='fieldofstudy'
                value={fieldofstudy}
                onChange={event => changeHandler(event)}
                placeholder='*Field of study'
              />
            </div>

            <div className='form-group'>
              <h4>From Date: </h4>
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
                className='currentedu'
                type='checkbox'
                checked={current}
                name='current'
                value={current}
                onChange={event => {
                  setFormData({ ...formData, current: !current })
                  toggleDisable(!toDateDisabled)
                }}
              />
              <h4>Current School: </h4>
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
                placeholder='Program Description'
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

export default connect(null, { addEducation })(withRouter(AddEducation))
