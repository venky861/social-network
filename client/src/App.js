import React, { Fragment, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Footer from "./components/layout/Footer"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { Provider } from "react-redux"
import store from "./store"
import { loadUser } from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"
import Alert from "./components/layout/Alert"
import Dashboard from "./components/dashboard/Dashboard"
import CreateProfile from "./components/ProfileForms/CreateProfile"
import PrivateRoute from "./components/routing/PrivateRoute"
import EditProfile from "./components/ProfileForms/EditProfile"
import AddExperience from "./components/ProfileForms/AddExperience"
import AddEducation from "./components/ProfileForms/AddEducation"
import Profiles from "./components/profiles/Profiles"
import Profile from "./components/profile/Profile"
import Posts from "./components/posts/Posts"
import Post from "./components/Post/Post"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert className='text-center'></Alert>
          <Route exact path='/' component={Landing}></Route>

          <div className='container'>
            <Switch>
              <Route exact path='/Login' component={Login}></Route>
              <Route exact path='/Register' component={Register}></Route>
              <Route exact path='/Profiles' component={Profiles}></Route>
              <Route exact path='/Profile/:id' component={Profile}></Route>
              <PrivateRoute
                exact
                path='/Dashboard'
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/profile-setup'
                component={CreateProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/Edit-Profile'
                component={EditProfile}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path='/Add-Experience'
                component={AddExperience}
              ></PrivateRoute>

              <PrivateRoute
                exact
                path='/Add-Education'
                component={AddEducation}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/Posts'
                component={Posts}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/Posts/:id'
                component={Post}
              ></PrivateRoute>
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
