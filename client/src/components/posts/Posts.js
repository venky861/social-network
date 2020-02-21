import React, { useEffect } from "react"
import { getPosts } from "../../actions/post"
import Spinner from "../layout/Spinner"
import { connect } from "react-redux"
import PostItem from "./PostItem"
import PostForm from "./PostForm"

const Posts = ({ getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return (
    <div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <h2 className='text-primary my-2'>Posts</h2>
          <p className='large my-1'>Welcome to the community</p>
          <PostForm />
          <h2 className='my-1'>All Posts are listed below:-</h2>
          <div>
            {posts.map(post => (
              <PostItem key={post._id} post={post}></PostItem>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  post: state.post
})
export default connect(mapStateToProps, { getPosts })(Posts)
