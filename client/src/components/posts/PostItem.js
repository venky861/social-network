import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import Moment from "react-moment"
import { addLike, removeLike, deletePost } from "../../actions/post"

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, comments, user, likes, date },
  addLike,
  removeLike,
  deletePost,
  showActions
}) => {
  return (
    <div>
      <div className='my-3 wrapper3'>
        <div className='my-2 box1'>
          <Link to={`/profile/${user}`}>
            <img
              src={avatar}
              alt='avatar'
              className='rounded-circle  image2'
            ></img>

            <h4 className=' text-primary name'>{name}</h4>
          </Link>
        </div>
        <div className='mx-2  box2'>
          <p className='comment'>{text}</p>
          <p className=''>
            {" "}
            Posted on{" "}
            <Moment format='YYYY/MM/DD' className='date mx-1'>
              {date}
            </Moment>
          </p>

          {showActions && (
            <div>
              <button
                onClick={e => addLike(_id)}
                className='mx-1 btn btn-secondary'
              >
                <i className='fas fa-thumbs-up'></i>
                {likes.length > 0 && (
                  <span className='mx-1'>{likes.length}</span>
                )}
              </button>

              <button
                onClick={e => removeLike(_id)}
                className=' mx-1 btn btn-secondary '
              >
                <i className='fas fa-thumbs-down mx-1'></i>
              </button>

              <Link to={`/posts/${_id}`} className=' mx-1 btn btn-primary '>
                Discussion{" "}
                {comments.length > 0 && (
                  <span className='mx-1'>{comments.length}</span>
                )}
              </Link>

              {user === auth.user._id && (
                <button
                  className=' btn btn-danger mx-1 '
                  type='button'
                  onClick={e => deletePost(_id)}
                >
                  <i className='fas fa-times xmark'></i>
                </button>
              )}
            </div>
          )}
        </div>{" "}
        {/* box 2 ends here*/}
      </div>{" "}
      {/* wrapper ends here*/}
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost
})(PostItem)
