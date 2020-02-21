import axios from "axios"
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from "./types"
import { setAlert } from "./alert"

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me")

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// get all profiles

export const getProfiles = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  })

  try {
    const res = await axios.get("/api/profile")

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// get profile by ID

export const getProfileById = userID => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${userID}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// github repo

export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// create or update profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await axios.post("/api/profile", formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"))

    if (!edit) {
      history.push("/Dashboard")
    }
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Update experience

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await axios.put("/api/profile/experience", formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Experience Updated"))

    history.push("/Dashboard")
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Update education

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await axios.put("/api/profile/education", formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Education Updated"))

    history.push("/Dashboard")
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    }

    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

/// delete experience

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Experience Deleted"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// delete education

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert("Education Deleted"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Delete account and profile

export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure to delete your account permanently")) {
    try {
      await axios.delete("/api/profile")

      dispatch({
        type: CLEAR_PROFILE
      })
      dispatch({ type: ACCOUNT_DELETED })

      dispatch(setAlert("Your account Deleted"))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        paylod: { msg: err.response.statusText, status: err.response.status }
      })
    }
  }
}
