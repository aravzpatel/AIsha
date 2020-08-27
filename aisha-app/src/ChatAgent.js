import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import EmotionAnalyser from './EmotionAnalyser'
import WelcomeImage from './Intersect.svg'
import {ThemeProvider} from 'styled-components'
import GraphBuilder from './GraphContainer'
import LogOut from './Logout'


class ChatAgent extends React.Component{
  constructor(props){
    super(props)
  }
  
  render(){
    console.log(this.props)

    const theme =  {
      background: '#f5f8fb',
      fontFamily: 'Sans Serif',
      headerBgColor: '#EF6C00',
      headerFontColor: '#fff',
      headerFontSize: '20px',
      botBubbleColor: '#0368F5',
      botFontColor: '#fff',
      botFontSize: '18px',
      userBubbleColor: '#EA8C55',
      userFontColor: '#fff',
    }

    return(
      <div className="chatagent-container">
        <ThemeProvider theme={theme}>
          <ChatBot
            headerTitle="AIsha"
            botAvatar = {WelcomeImage}
            // speechSynthesis={{ enable: true, lang: 'en' }}
            steps={[
              {
                id: '1',
                message: "Hi, I'm AIsha",
                trigger: '2',
              },
              {
                id: '2',
                message: "I'm your companion to help you get in touch with your emotions",
                trigger: '3',
              },
              {
                id: '3',
                message: "So, let's get started.",
                trigger: '4',
                delay: 1250,
              },
              {
                id: '4',
                message: "Tell me how you are feeling?",
                trigger: 'emotion',
              },
              {
                id: 'emotion',
                user: true,
                trigger: '5',
              },
              {
                id: '5',
                component: <EmotionAnalyser user_id={this.props.user_id} />,
                waitAction: true,
                asMessage: true, /*is a component*/
                trigger: '6',
                delay: 1250
              },
              {
                id: '6',
                message: ({steps}) =>
                  `I hope that was helpful.`,
                trigger: '7'
              },
              {
                id: '7',
                options: [
                  {value: 1, label: 'Re-check your emotion', trigger: '4'},
                  {value: 2, label: 'View your Emotion Graph', trigger: 'emotiongraph'},
                  {value: 3, label: 'Logout', trigger: 'logout'}
                ]
              },
              {
                id: 'emotiongraph',
                component: <GraphBuilder user_id={this.props.user_id}/>,
                waitAction: true,
                asMessage: false, /*is a component*/
                trigger: '8',
                delay: 1250
              },
              {
                id: '8',
                message: "It's useful to check your emotions regularly, come back again tomorrow.",
                trigger: '9'
              },
              {
                id: '9',
                options: [
                  {value: 3, label: 'Logout', trigger: 'logout'}
                ]
              },
              {
                id: 'logout',
                message: 'Goodbye',
                trigger: '10',
              },
              {
                id: '10',
                component: <LogOut logout={this.props.logout} user_id={this.props.user_id} />,
                trigger: '10',
              }
            ]}
          />
        </ThemeProvider>
      </div>
    )
  }
};

export default ChatAgent;