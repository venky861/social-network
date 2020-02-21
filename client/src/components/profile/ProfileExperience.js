import React from "react"
import Moment from "react-moment"

const ProfileExperience = ({
  experience: { company, title, location, current, to, form, description }
}) => {
  return (
    <div className='mx-auto'>
      <h3 className='my-1'>{company}</h3>
      <p>{!to ? "Now" : <Moment format='YYYY/MM/DD'>{current}</Moment>}</p>
      <p>Position: {title}</p>
      <p>Description: {description}</p>
    </div>
  )
}

export default ProfileExperience
