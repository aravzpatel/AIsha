import React from 'react';
import { render } from 'react-dom';
import WelcomeImage from './Intersect.svg'
import Image from 'react-bootstrap/Image'


class Welcome extends React.Component{


  render(){
    console.log(this.props)

    return(
      <div className="welcome-container">

        <Image src={WelcomeImage} alt="Image" fluid width="500" onClick={this.props.onClick}/>
        
        <div className="welcome-content">
          <div className="text_shadows">
          Hello, I'm AIsha
          </div>
        </div>
      
      </div>
      
    )
  }
}

export default Welcome