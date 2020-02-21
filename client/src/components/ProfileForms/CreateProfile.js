import React, { useState, Fragment } from "react"
import { connect } from "react-redux"
import { createProfile } from "../../actions/profile"
import { Link, withRouter } from "react-router-dom"

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  })

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData

  const [socialNetwork, setSocialNetwork] = useState(false)

  const changeHandler = event => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = event => {
    event.preventDefault()
    createProfile(formData, history)
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='mt-5'>
          <div className=''>
            <div className=''>
              <h1 className='text-center'>Create your Profile</h1>
              <p className='text-center'>
                Let's get some information to make your profile stand out
              </p>
              <form className='form' onSubmit={event => submitHandler(event)}>
                <div className='form-group'>
                  <select
                    name='status'
                    value={status}
                    onChange={event => changeHandler(event)}
                    className='form-control'
                  >
                    <option value='0'>* Select Professional Status</option>
                    <option value='Developer'>Developer</option>
                    <option value='Junior Developer'>Junior Developer</option>
                    <option value='Senior Developer'>Senior Developer</option>
                    <option value='Manager'>Manager</option>
                    <option value='Student or Learning'>
                      Student or Learning
                    </option>
                    <option value='Instructor'>Instructor</option>
                    <option value='Intern'>Intern</option>
                    <option value='Other'>Other</option>
                  </select>
                  <small className='form-text'>
                    Give us an idea of where you are at in your career
                  </small>
                </div>

                <div className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    name='company'
                    value={company}
                    onChange={event => changeHandler(event)}
                    placeholder='Company'
                  />
                  <small className='form-text'>
                    Could be you own company or one at you work for
                  </small>
                </div>

                <div className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    name='website'
                    value={website}
                    onChange={event => changeHandler(event)}
                    placeholder='Website'
                  />
                  <small className='form-text'>
                    Could be you own compant website
                  </small>
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
                  <small className='form-text'>
                    Enter your State and city : (e.g TamilNadu , chennai)
                  </small>
                </div>

                <div className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    name='skills'
                    value={skills}
                    onChange={event => changeHandler(event)}
                    placeholder='Skills'
                  />
                  <small className='form-text'>
                    Enter your skills with comma Separated Values
                  </small>
                </div>

                <div className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    name='githubusername'
                    value={githubusername}
                    onChange={event => changeHandler(event)}
                    placeholder='Github Username'
                  />
                  <small className='form-text'>
                    Enter your Github User name if you have one
                  </small>
                </div>

                <div className='form-group'>
                  <textarea
                    className='form-control'
                    type='text'
                    name='bio'
                    value={bio}
                    onChange={event => changeHandler(event)}
                  />
                  <small className='form-text'>Tell us about yourself</small>
                </div>

                <div className='p-2 m-2'>
                  <button
                    onClick={() => setSocialNetwork(!socialNetwork)}
                    className='btn btn-secondary'
                  >
                    Add Social network Links
                  </button>
                  <span className='p-2 m-2'>Optional</span>
                </div>

                {socialNetwork && (
                  <div className='my-3'>
                    <div className='form-group my-3'>
                      <input
                        className='form-control'
                        type='text'
                        name='twitter'
                        value={twitter}
                        onChange={event => changeHandler(event)}
                        placeholder='Twitter URL'
                      />
                    </div>

                    <div className='form-group my-3'>
                      <input
                        className='form-control'
                        type='text'
                        name='facebook'
                        value={facebook}
                        onChange={event => changeHandler(event)}
                        placeholder='Facebook URL'
                      />
                    </div>

                    <div className='form-group my-3'>
                      <input
                        className='form-control'
                        type='text'
                        name='youtube'
                        value={youtube}
                        onChange={event => changeHandler(event)}
                        placeholder='Youtube URL'
                      />
                    </div>

                    <div className='form-group my-3'>
                      <input
                        className='form-control'
                        type='text'
                        name='linkedin'
                        value={linkedin}
                        onChange={event => changeHandler(event)}
                        placeholder='Linkedin URL'
                      />
                    </div>

                    <div className='form-group my-3'>
                      <input
                        className='form-control'
                        type='text'
                        name='instagram'
                        value={instagram}
                        onChange={event => changeHandler(event)}
                        placeholder='Instagram URL'
                      />
                    </div>
                  </div>
                )}

                <button
                  type='submit'
                  className='btn btn-primary btn-block mt-1'
                >
                  Submit
                </button>
                <Link to='/Dashboard' className='btn-secondary mt-1'>
                  Go back
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default connect(null, { createProfile })(withRouter(CreateProfile))
