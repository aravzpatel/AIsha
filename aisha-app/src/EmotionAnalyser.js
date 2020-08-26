import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';


class EmotionAnalyser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };
  }

  componentDidMount() {
    var user_input = this.props.previousStep.message
    axios.post('/api/help',{
      user_text: user_input 
    })
    .then((response) => {
      this.setState({
        loading: false, 
        result: response.data['bot_response'],
        trigger: true
      }, ()=> {
        this.props.triggerNextStep()
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        { loading ? <Loading /> : result }
      </div>
    );
  }
}

EmotionAnalyser.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

EmotionAnalyser.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default EmotionAnalyser