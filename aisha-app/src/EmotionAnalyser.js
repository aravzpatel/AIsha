import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';


class EmotionAnalyser extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };
  }

  componentDidMount() {
    const user = this.props.user_id
    this._isMounted = true
    var user_input = this.props.previousStep.message
    axios.post('/api/help',{
      user_text: user_input,
      user_id: user
    })
    .then((response) => {
      if(this._isMounted){
        console.log("We're inside the response")
        console.log("We're about to setState")
        this.setState({
          loading: false, 
          result: response.data['bot_response'],
          trigger: true
        }, ()=> {
            this.props.triggerNextStep()
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillUnmount(){
    console.log("We're about to componentWillUnmount")
    this._isMounted = false;
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