import React from "react"
import Moment from "react-moment"

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, form, description }
}) => {
  return (
    <div className='mx-auto'>
      <h3 className='mx-1 my-2'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD' className='mt-1'>
          {form}
        </Moment>{" "}
        -{" "}
        {!to ? (
          "Now"
        ) : (
          <Moment format='YYYY/MM/DD' className='mt-1'>
            {current}
          </Moment>
        )}
      </p>
      <p className='mt-1'>Degree: {degree}</p>
      <p className='mt-1'>Field of Study: {fieldofstudy}</p>
      <p className='mt-1'>Description: {description}</p>
    </div>
  )
}

export default ProfileEducation
