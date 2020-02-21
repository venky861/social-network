import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deleteComment } from "../../actions/post"
import Moment from "react-moment"
const CommentItem = ({
  postId,
  deleteComment,
  auth,
  comment: { _id, text, name, avatar, date, user }
}) => {
  return (
    <div>
      <div className='my-3 wrapper3'>
        <div className='my-1 box1'>
          <Link to={`/profile/${user}`}>
            <img
              src={avatar}
              alt='avatar'
              className='rounded-circle my-2 mx-1 image2'
            ></img>

            <h4 className='na text-primary name'>{name}</h4>
          </Link>
        </div>{" "}
        {/* box 1 ends*/}
        <div className='box2'>
          <div className='mx-2'>
            <p className='comment'>{text}</p>
            <p>
              {" "}
              Posted on{" "}
              <Moment format='YYYY/MM/DD' className='date mx-1'>
                {date}
              </Moment>
            </p>
          </div>
          <div>
            {!auth.loading && user === auth.user._id && (
              <button
                className=' btn btn-danger mx-1'
                type='button'
                onClick={e => deleteComment(postId, _id)}
              >
                <i className='fas fa-times xmark'></i>
              </button>
            )}
          </div>
        </div>{" "}
        {/* box 2 ends*/}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
