import React from 'react';
import { render } from '@testing-library/react';

class TextBox extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return(
      <form onSubmit={this.props.submit}>
        <label>Input
          <input type="text"></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
     );
  }
}

export default TextBox;
