import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getPost } from "../../actions/post"
import PostItem from "../posts/PostItem"
import Spinner from "../layout/Spinner"
import { Link } from "react-router-dom"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"

const Post = ({ getPost, post: { loading, post }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])

  return loading || post === null ? (
    <Spinner></Spinner>
  ) : (
    <div>
      <h4 className='text-primary my-2'>Discussion</h4>
      <PostItem post={post} showActions={false} />
      <Link to='/Posts' className='btn btn-primary my-2'>
        Back To Post
      </Link>
      <CommentForm postId={post._id} />
      <div>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
