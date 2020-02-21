import React, { Fragment, useEffect } from "react"
import { connect } from "react-redux"
import Spinner from "../layout/Spinner"
import { getProfileById } from "../../actions/profile"
import { Link } from "react-router-dom"
import Profiletop from "./Profiletop"
import Profileabout from "./Profileabout"
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEducation"
import ProfileGithub from "./ProfileGithub"

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <Link to='/profiles' className='btn btn-primary'>
            Back to Profile
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/Edit-Profile' className='btn m-2 btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='my-2'>
            <div className='wrapperprofile my-1'>
              <div className='boxx1'>
                <Profiletop profile={profile}></Profiletop>
              </div>
              <div className='boxx2'>
                <Profileabout profile={profile} />
              </div>
            </div>
          </div>
          <div className='wrapper2 my-1'>
            <div className='Box1'>
              {profile.experience.length > 0 ? (
                <div>
                  <h3 className='my-1 '>Your Total Experience: </h3>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}

                  <div className='wrappergithub'>
                    {profile.githubusername && (
                      <ProfileGithub
                        username={profile.githubusername}
                      ></ProfileGithub>
                    )}
                  </div>
                </div>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>{" "}
            {/* div exp ends*/}
            <div className='Box2'>
              {profile.education.length > 0 ? (
                <div>
                  <h3 className='my-1 '>Education: </h3>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </div>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>{" "}
            {/* div edu ends */}
          </div>{" "}
          {/* wrapper2 ends*/}
        </div>
      )}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(Profile)
