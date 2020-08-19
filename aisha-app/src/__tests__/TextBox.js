import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen, getByTestId} from '@testing-library/react'
import TextBox from '../TextBox'

test('onSubmit is called when the form submits', () => {
  const onSubmit = jest.fn() /* is a mock function */
  const {getByLabelText } = render(<TextBox submit={onSubmit}/>);
  

  fireEvent.change(getByLabelText("Input"), {target: {value: "I am having a fantastic day, thank you for asking"}})
  fireEvent.click(screen.getByText('Submit'))
  console.log(screen)
  expect(onSubmit).toHaveBeenCalled();
})