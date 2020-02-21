import React, { useEffect, Fragment } from "react"
import { connect } from "react-redux"
import { getCurrentProfile, deleteAccount } from "../../actions/profile"
import Spinner from "../layout/Spinner"
import { Link } from "react-router-dom"
import Experience from "./Experience"
import Education from "./Education"
import DashboardActions from "./DashboardActions"

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  const load =
    loading && profile === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <h4 className='my-3'>Welcome {user ? user.name : "Guest"}</h4>

        {profile !== null ? (
          <Fragment>
            <DashboardActions></DashboardActions>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className='my-2'>
              {" "}
              <button
                className='btn btn-secondary'
                onClick={() => deleteAccount()}
              >
                Delete Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            You does not a profile , please setup one{" "}
            <Link to='/profile-setup' className='btn btn-secondary m-2 p-2'>
              Profile setup
            </Link>
          </Fragment>
        )}
      </Fragment>
    )

  return <Fragment>{load}</Fragment>
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
)
