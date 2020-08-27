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
    const user = this.props.user_id
    var user_input = this.props.previousStep.message
    axios.post('http://127.0.0.1:5000/profile',{
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