import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import TextBox from '../TextBox'

test('changes the screen when the form is submitted', () => {
  render(<TextBox></TextBox>)

  fireEvent.change(form, {target: {value: "I am having a fantastic day, thank you for asking"}})
  fireEvent.click(screen.getByText('Submit'))
  expect(screen).toHaveTextContent("I'm thinking of a response")
})