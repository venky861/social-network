import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const Profileitem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <Fragment>
      <div className='card my-2'>
        <div className='mx-3'>
          {" "}
          <img
            src={avatar}
            alt='Avatar'
            className='rounded-circle mt-1 mx-1 image'
          />
          <h2 className='mx-1 mt-1'>{name}</h2>
          <p className='mt-1'>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='my-1 mx-1'>{location && <span>{location}</span>}</p>
        </div>
        <Link to={`/profile/${_id}`} className='btn btn-secondary my-1 mx-1'>
          View Profile
        </Link>
      </div>
    </Fragment>
  )
}

export default Profileitem
