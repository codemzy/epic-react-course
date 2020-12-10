// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
function Count() {
    const {count, increment, decrement} = useCounter();
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the component
  render(<Count />);
  // 🐨 get the elements you need using screen
  const incrementButton = screen.getByRole("button", { name: /increment/i});
  const decrementButton = screen.getByRole("button", { name: /decrement/i});
  const message = screen.getByText(/count/i)
  // 🐨 assert on the initial state of the hook
  expect(message).toHaveTextContent('Count: 0');
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  userEvent.click(incrementButton);
  expect(message).toHaveTextContent('Count: 1');
  userEvent.click(decrementButton);
  expect(message).toHaveTextContent('Count: 0');
})

/* eslint no-unused-vars:0 */
