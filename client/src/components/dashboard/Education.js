import React, { Fragment } from "react"
import { connect } from "react-redux"
import { deleteEducation } from "../../actions/profile"
import Moment from "react-moment"

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className='btn btn-primary'
          onClick={() => deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <div className=''>
        <h2 className='my-2'>Education details</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    </Fragment>
  )
}

export default connect(null, { deleteEducation })(Education)
