import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import EmotionAnalyser from './EmotionAnalyser'


const ChatAgent = () => (
  <ChatBot
    headerTitle="AIsha"
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
);

export default ChatAgent;