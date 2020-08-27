import React from 'react';
import { render } from 'react-dom';
import Welcome from './Welcome';
import Container from 'react-bootstrap/Container'
import './App.scss'
import ChatAgent from './ChatAgent';

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      welcome: true,
      chat: false
    }
    this.changeWelcome=this.changeWelcome.bind(this)
  }

  changeWelcome(){
    this.setState({
      welcome: false
    })
  }

  render(){
    let welcome = (
      <Welcome onClick={this.changeWelcome} />
    )

    let chatagent = null;

    if(this.state.welcome===false){
      welcome = null;
      chatagent = (
        <ChatAgent />
      )
    }

    return(
      <Container>
        {welcome}
        {chatagent}
      </Container>
    )
  }
}

export default App