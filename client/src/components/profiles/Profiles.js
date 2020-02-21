import React, { Fragment, useEffect } from "react"
import { connect } from "react-redux"
import Spinner from "../layout/Spinner"
import { getProfiles } from "../../actions/profile"
import Profileitem from "./Profileitem"

const Profile = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <h1 className='large text-primary'>Developers</h1>
            <p>Browser and connect with developers</p>
          </div>
          <div>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <Profileitem key={profile._id} profile={profile}></Profileitem>
              ))
            ) : (
              <h3>No profile found...</h3>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(Profile)
