import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Manage from "./Manage"
import Login, {auth} from "./Login"

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/manage" component={Manage}/>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default App
