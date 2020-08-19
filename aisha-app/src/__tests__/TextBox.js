import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen, getByTestId, wait} from '@testing-library/react'
import TextBox from '../TextBox'
import "jest-dom/extended-expect";

test('onSubmit is called when the form submits', () => {
  const originalError = console.error;
  console.error = jest.fn();

  const onSubmit = jest.fn() /* is a mock function */
  render(<TextBox submit={onSubmit}/>);
  
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

jest.mock("./api/help")

test('onSubmit creates a post request to a route when the form is submitted', async() => {
  /*mock the form submit function - so that when it is called; it executes a fake post request
  which posts the data that we want to the url*/
  const response = ["Thanks for letting me know"]
  const userInput = "I am having a fantastic day, thank you for asking"

  postResponse.mockResolvedValueOnce(response);
  const{ getByLabelText } = render(<TextBox />);
  fireEvent.change(getByLabelText("Input"), {target: {value: userInput}})
  fireEvent.click(screen.getByText("Submit"))

  expect(postResponse).toHaveBeenCalledTimes(1)
  expect(postResponse).toHaveBeenCalledWith(userInput);
  await wait(() => expect(screen.getByTestId("response")).toHaveTextContent(response))
})