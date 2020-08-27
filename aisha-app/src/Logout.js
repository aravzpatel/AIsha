import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';
import Graph from './graph'


class GraphBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };
  }

  componentDidMount() {
    const user = this.props.user_id /*this collects the user_id so sub this into the post request for 1*/
    var user_input = this.props.previousStep.message
    axios.post('/logout',{
      user_id: user
    })
    .then((response) => {
      console.log(this.props)
      this.props.logout()
    })
    .catch(function (error) {
      console.log(error);
    });
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