import React from 'react';
import { render } from '@testing-library/react';

class TextBox extends React.Component{
  constructor(props){
    super(props)
  }

  onSubmit(user_input) {
    console.log(user_input)
  }

  render() {
    return(
      <form onSubmit={() => this.onSubmit(user_input)}>
        <label>Input
          <input type="text" name="user_input"></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
     );
  }
}

export default TextBox;
