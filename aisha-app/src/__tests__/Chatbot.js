import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen, getByTestId, wait, getByLabelText, getByPlaceholderText} from '@testing-library/react'
import Chatagent from '../Chatagent'

test('the Chatagent introduces themself', async() => {
  const {container} = render(<Chatagent />);
  
  // const chatbot = container.querySelector('div.rsc.classname-test').childNodes[0].childNodes[1].children[0].textContent
  
  await wait(() => expect(container).toHaveTextContent("Hi, I'm AIsha"))
})

const axios = require('axios');
jest.mock('axios')

test('After a request is made the user receives a response', async()=> {
  axios.post.mockResolvedValue({
    data: [
      "Something inputted",
      "Poor you for having such bad day"
    ]
  })
  
  const { container, getByPlaceholderText } = render(<Chatagent />);
  const userInput = "I am having a fantastic day, thank you for asking"

  fireEvent.change(getByPlaceholderText("Type the message ..."), {target: {value: userInput}})
  const submitButton = container.querySelector('div.rsc').childNodes[0].childNodes[2].children[1]

  fireEvent.click(submitButton)
  await wait(() => expect(submitButton).toBeDisabled())
})