// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
// 🐨 add `screen` to the import here:
import {render, fireEvent, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'; // extra 1
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  // const {container} = render(<Counter />)
  render(<Counter />);
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  // const [decrement, increment] = container.querySelectorAll('button')
  // const message = container.firstChild.querySelector('div')
  const increment = screen.getByRole('button', {name: 'Increment'});
  const decrement = screen.getByRole('button', {name: 'Decrement'});
  const message = screen.getByText('Current count: 0');

  expect(message).toHaveTextContent('Current count: 0')
  // fireEvent.click(increment)
  userEvent.click(increment) // extra 1
  expect(message).toHaveTextContent('Current count: 1')
  // fireEvent.click(decrement)
  userEvent.click(decrement) // extra 1
  expect(message).toHaveTextContent('Current count: 0')
})
