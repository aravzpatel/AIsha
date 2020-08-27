import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';
import Graph from './graph'


class GraphBuilder extends Component {
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
    this._isMounted = true
    const user = this.props.user_id /*this collects the user_id so sub this into the post request for 1*/
    var user_input = this.props.previousStep.message
    axios.post('/profile',{
      user_id: user
    })
    .then((response) => {
      if(this._isMounted){
        this.setState({
          loading: false, 
          result: response.data,
          trigger: true
        }, ()=> {
            console.log(this.state.result)
            this.props.triggerNextStep()
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="graphcontainer">
        { loading ? <Loading /> : <Graph data={this.state.result} /> }
      </div>
    );
  }
}

GraphBuilder.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

GraphBuilder.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default GraphBuilder