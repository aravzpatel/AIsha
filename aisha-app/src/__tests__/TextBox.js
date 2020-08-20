import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen, getByTestId, wait} from '@testing-library/react'
import TextBox from '../TextBox'


xtest('onSubmit is called when the form submits', () => {
  const originalError = console.error;
  console.error = jest.fn();

  const onSubmit = jest.fn() /* is a mock function */
  render(<TextBox submit={onSubmit}/>);
  
  fireEvent.click(screen.getByText('Submit'))
  expect(onSubmit).toHaveBeenCalled();
  
  console.error = originalError;
})

xtest('onSubmit changes the screen when form is submitted', () => {
  const onSubmit = jest.fn() /* is a mock function */
  const { getByLabelText, getByTestId } = render(<TextBox submit={onSubmit}/>);

  fireEvent.change(getByLabelText("Input"), {target: {value: "I am having a fantastic day, thank you for asking"}})

  fireEvent.click(screen.getByText("Submit"))

  expect(getByTestId("response")).toHaveTextContent("Thanks for letting me know")
})

const axios = require('axios');
jest.mock('axios')

test('onSubmit creates a post request to a route when the form is submitted', async() => {
  axios.post.mockResolvedValue({
      data: [
        "Something inputted",
        "Poor you for having such bad day"
      ]
    }
  )
  const userInput = "I am having a fantastic day, thank you for asking"

  const{ getByLabelText } = render(<TextBox />);
  fireEvent.change(getByLabelText("Input"), {target: {value: userInput}})
  fireEvent.click(screen.getByText("Submit"))

  await wait(() => expect(screen.getByTestId("response")).toHaveTextContent("Poor you for having such bad day"))
})