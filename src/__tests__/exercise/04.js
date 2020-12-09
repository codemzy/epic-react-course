// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  let submittedData;
  const handleSubmit = data => (submittedData = data);
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />);
  // screen.debug(); // from video so we can see how the ui looks in the console test
  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByLabelText(/username/i); // regex so case doesnt matter
  const password = screen.getByLabelText(/password/i);
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  let inputValues = { username: "ausername", password: "apassword"}
  userEvent.type(username, inputValues.username);
  userEvent.type(password, inputValues.password);
  // 🐨 click on the button with the text "Submit"
  userEvent.click(screen.getByRole('button', {type: 'submit'}));
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(submittedData).toEqual(inputValues);
})

/*
eslint
  no-unused-vars: "off",
*/
