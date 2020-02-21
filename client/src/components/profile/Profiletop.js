import React, { Fragment } from "react"

const Profiletop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <Fragment>
      <div className=' '>
        <img
          src={avatar}
          alt='Avatar'
          className='rounded-circle my-4 mx-auto image'
        ></img>
        <h1 className='mx-auto'>{name}</h1>
        <p className='mx-auto'>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='mx-auto'>{company && <span> {company}</span>}</p>

        <div className='mx-auto my-2 website'></div>
      </div>
    </Fragment>
  )
}

export default Profiletop
