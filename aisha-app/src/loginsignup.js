import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './loginsignup.scss';

const { Component } = React

const errorStyles = {
  color: 'red'
};
class LoginSignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "signUp",
      name: '',
      password: '',
      email: '',
      error: '',
      error_text: ''
    }
    this.onSubmitSignUp=this.onSubmitSignUp.bind(this);
    this.onSubmitLogin=this.onSubmitLogin.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmitSignUp(event){

    event.preventDefault();
    var email = this.state.email
    var name = this.state.name
    var password = this.state.password
    
    axios.post('/signup',{
      email: email,
      name: name,
      password: password
    })
    .then((response) => {
        console.log("sign up response recieved")
        console.log(response.data.error)
        console.log(response.data.data)
        if (response.data.error === true){
          this.setState({
            error: true,
            error_text: response.data.data
         })
        } else {
          this.props.success()
        }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onSubmitLogin(event){

    event.preventDefault();
    var email = this.state.email
    var password = this.state.password
    
    axios.post('/login',{
      email: email,
      password: password
    })
    .then((response) => {
      console.log("login response recieved")
      console.log(response.data.error)
      console.log(response.data.data)
      if (response.data.error === true){
        this.setState({
          error: true,
          error_text: response.data.data
       })
      } else {
        this.props.success()
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  changeView = (view) => {
    this.setState({
      currentView: view,
      name: '',
      password: '',
      email: '',
      error: '',
      error_text: ''
    })
  }
 
  currentView = () => {
    switch(this.state.currentView) {
      case "signUp":
        return (
          <form onSubmit={this.onSubmitSignUp}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label style={errorStyles}>{this.state.error_text}</label>
                </li>
                <li>
                  <label>Name:<br></br>
                    <input type="text" onChange={this.onChange} value={this.state.name} id="name" required/>
                  </label>
                </li>
                <li>
                  <label>Email:<br></br>
                    <input type="email" onChange={this.onChange} value={this.state.email} id="email" required/>
                  </label>
                </li>
                <li>
                  <label>Password:<br></br>
                    <input type="password" onChange={this.onChange} value={this.state.password} id="password" required/>
                  </label>
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={ () => this.changeView("logIn")}>Have an Account?</button>
          </form>
        )
      case "logIn":
        return (
          <form onSubmit={this.onSubmitLogin}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label style={errorStyles}>{this.state.error_text}</label>
                </li>
                <li>
                  <label>Email:<br></br>
                    <input type="email" id="email" onChange={this.onChange} value={this.state.email} required/>
                  </label>
                </li>
                <li>
                  <label>Password:<br></br>
                    <input type="password" id="password" onChange={this.onChange} value={this.state.password} required/>
                  </label>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
            <button type="button" onClick={ () => this.changeView("signUp")}>Create an Account</button>
          </form>
        )
      default:
        break
    }
  }

  render() {
    return (
      <section id="entry-page">
        {this.currentView()}
      </section>
    )
  }
}

export default LoginSignUp