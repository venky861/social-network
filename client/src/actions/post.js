import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  REMOVE_COMMENT,
  ADD_COMMENT
} from "./types"
import axios from "axios"
import { setAlert } from "./alert"

// get all posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts")

    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
// remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// delete post
export const deletePost = id => async dispatch => {
  try {
     await axios.delete(`/api/posts/${id}`)

    dispatch({
      type: DELETE_POST,
      payload: id
    })

    dispatch(setAlert("Post has been deleted"))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const res = await axios.post(`/api/posts`, formData, config)

    dispatch({
      type: ADD_POST,
      payload: res.data
    })

    dispatch(setAlert("Post has been created"))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Single  post

// get all posts
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//add comment

export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  try {
    const res = await axios.post(
      `/api/posts/comments/${postId}`,
      formData,
      config
    )

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    })

    dispatch(setAlert("Comment added"))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//Delete comment

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
     await axios.delete(`/api/posts/comments/${postId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    })

    dispatch(setAlert("Comment Removed"))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
