import React, { Fragment } from "react"

const Profileabout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  return (
    <Fragment>
      <div className=''>
        {bio && (
          <div>
            <h4 className='mx-auto text-primary'>{name}'s- Bio</h4>
            <p>{bio}</p>
            <div>
              <h4 className='mx-auto text-primary'> Skills -</h4>
              {skills.map((skill, index) => (
                <div key={index}>
                  <i class='fa fa-check' aria-hidden='true'></i>
                  <span className='my-1 mx-2'>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Profileabout
