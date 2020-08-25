import React from 'react';
import './App.css';
import axios from 'axios';

class TextBox extends React.Component{
  constructor(props){
    super(props)

    this.state = ({
      formSubmit: false
    })

    this.onSubmit=this.onSubmit.bind(this);
    this.onResponseChange=this.onResponseChange.bind(this);
  }

  onResponseChange(event) {
    this.setState({
      user_input: event.target.value
    })
  }

  onSubmit(event){
    var user_input = this.state.user_input
    event.preventDefault();
    axios.post('/api/help',{
      user_text: user_input 
    })
    .then((response) => {
      this.setState({
        formSubmit: true,
        response: response.data['bot_response']
      })

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let response = null;

    if(this.state.formSubmit === true){
      response = (
        <div>
          <p data-testid="response">
            {this.state.response}
          </p>
        </div>
      )
    }
    
    return(

      <div>
        <form onSubmit={this.onSubmit}>
          <label>Input
            <input type="text" name="user_text" onChange={this.onResponseChange}></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        {response}
      </div>

     );
  }
}

export default TextBox;