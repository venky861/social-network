import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getGithubRepos } from "../../actions/profile"

export const ProfileGithub = ({ getGithubRepos, username, repos }) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])

  return (
    <div>
      {repos === null ? (
        "No github found"
      ) : (
        <div>
          <h4>Github repos</h4>
          {repos.map(repo => (
            <div key={repo.id}>
              <h4>
                {" "}
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='githubname'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
