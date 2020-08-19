import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen, getByTestId} from '@testing-library/react'
import TextBox from '../TextBox'

test('onSubmit is called when the form submits', () => {
  const originalError = console.error;
  console.error = jest.fn();

  const onSubmit = jest.fn() /* is a mock function */
  const {getByLabelText } = render(<TextBox submit={onSubmit}/>);
  
  fireEvent.click(screen.getByText('Submit'))
  expect(onSubmit).toHaveBeenCalled();
  
  console.error = originalError;
})

test('onSubmit changes the screen when form is submitted', () => {
  const onSubmit = jest.fn() /* is a mock function */
  const { getByLabelText, getByTestId } = render(<TextBox submit={onSubmit}/>);

  fireEvent.change(getByLabelText("Input"), {target: {value: "I am having a fantastic day, thank you for asking"}})

  fireEvent.click(screen.getByText("Submit"))

  expect(getByTestId("response")).toHaveTextContent("Thanks for letting me know")
})