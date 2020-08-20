import React from 'react';
import axios from 'axios';

class TextBox extends React.Component{
  constructor(props){
    super(props)

    this.state = ({
      formSubmit: false
    })

    this.onSubmit=this.onSubmit.bind(this);
    this.responseHandle=this.responseHandle.bind(this);
  }
  responseHandle(response) {
    
  }
  onSubmit(event){
    event.preventDefault();
    axios.post('/api/help',{
      user_input: 'I am having an awful day' 
    })
    .then((response) => {
      this.setState({
        formSubmit: true,
        response: response.data.response
      })
    })

    // this.props.submit();
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
            <input type="text"></input>
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        {response}
      </div>
     );
  }
}

export default TextBox;
