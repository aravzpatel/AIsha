import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import EmotionAnalyser from './EmotionAnalyser'
import WelcomeImage from './Intersect.svg'
import {ThemeProvider} from 'styled-components'


class ChatAgent extends React.Component{
  constructor(props){
    super(props)


  }
  
  render(){
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
                message: "I'm here to help you",
                trigger: '3'
              },
              {
                id: '3',
                message: "How are you feeling?",
                trigger: 'emotion'
              },
              {
                id: 'emotion',
                user: true,
                trigger: '4',
              },
              {
                id: '4',
                component: <EmotionAnalyser />,
                waitAction: true,
                asMessage: true, /*is a component*/
                trigger: '5',
              },
              {
                id: '5',
                message: ({steps}) =>
                  `Thanks for telling me, son`,
                end: true
              }
            ]}
          />
        </ThemeProvider>
      </div>
    )
  }
};

export default ChatAgent;