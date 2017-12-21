import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      email: 'user@belltower.com',
      pass: 'password'
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePass = this.handleChangePass.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.processLogIn = this.processLogIn.bind(this)
  }

  processLogIn(email, pass) {
    const uri = process.env.API_URI + 'user_token'
    axios.post(uri, {
      "auth": {
        "email": email,
        "password": pass
      }
    })
    .then(res => {
      const token = res.data.jwt
      console.log(token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem("jwt", token)
      this.setState({ redirectToReferrer: true })
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value})
  }

  handleChangePass(event) {
    this.setState({pass: event.target.value})
  }

  handleSubmit(event) {
    this.processLogIn(this.state.email, this.state.pass)
    event.preventDefault()
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
        </label>
        <label>
          Password:
          <input type="text" value={this.state.pass} onChange={this.handleChangePass} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }


}

// Evalutates authentication
// TODO: Clean this up and have this check to make sure token is valid

export const auth = () => {
  if (!axios.defaults.headers.common['Authorization']) {
    const token = localStorage.getItem("jwt")
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

export default Login
