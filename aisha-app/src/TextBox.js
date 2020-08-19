import React from 'react';

class TextBox extends React.Component{
  constructor(props){
    super(props)

    this.state = ({
      formSubmit: false
    })

    this.onSubmit=this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    this.setState({
      formSubmit: true
    })
    this.props.submit();
  }

  /* create a function onSubmit
  - onSubmit triggers a state change
  - state change triggers a re-render to include response testid
  */

  render() {
    let response = null;

    if(this.state.formSubmit === true){
      response = (
        <div>
          <p data-testid="response">
            Thanks for letting me know
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
