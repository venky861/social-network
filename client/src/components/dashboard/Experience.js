import React, { Fragment } from "react"
import { connect } from "react-redux"
import Moment from "react-moment"
import { deleteExperience } from "../../actions/profile"

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-primary'
          onClick={() => deleteExperience(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <div className=''>
        <h2 className='my-2'>Experience Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default connect(null, { deleteExperience })(Experience)
