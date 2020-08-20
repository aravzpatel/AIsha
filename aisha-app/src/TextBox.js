import React from 'react';
import { render } from '@testing-library/react';

class TextBox extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return(
      <form action = "http://localhost:5000/api/help" method = "post">
         <p>Enter Text:</p>
         <p><input type = "text" name = "user_text" /></p>
         <p><input type = "submit" value = "submit" /></p>
      </form>
     );
  }
}

export default TextBox;
