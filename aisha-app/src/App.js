import React from 'react';
import { render } from 'react-dom';
import Welcome from './Welcome';
import Container from 'react-bootstrap/Container'
import './App.scss'
import ChatAgent from './ChatAgent';
import LoginSignUp from './loginsignup'

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      welcome: true,
      chat: false,
      user_id: null
    }
    this.changeWelcome=this.changeWelcome.bind(this)
    this.changeLogin = this.changeLogin.bind(this)
  }

  changeWelcome(){
    this.setState({
      welcome: false
    })
  }

  changeLogin(id){
    this.setState({
      chat:true,
      user_id: id
    })
  }

  render(){
    let welcome = (
      <Welcome onClick={this.changeWelcome} />
    )
    let loginsignup = null;
    let chatagent = null;

    if(this.state.welcome===false){
      welcome = null;
      loginsignup = (
        <LoginSignUp success={this.changeLogin} />
      )
    }

    if(this.state.chat===true){
      loginsignup = null;
      chatagent = (
        <ChatAgent user_id={this.state.user_id}/>
      )
    }

    return(
      <Container>
        {welcome}
        {loginsignup}
        {chatagent}
      </Container>
    )
  }
}

export default App