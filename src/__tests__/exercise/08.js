// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {act, renderHook} from '@testing-library/react-hooks';

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

// extra 2
function setup({initialProps} = {}) {
    const results = {}
    function TestComponent(props) {
        results.current = useCounter(props);
        return null
    }
    render(<TestComponent {...initialProps} />);
    return results;
};

// test('exposes the count and increment/decrement functions', () => {
//   // 🐨 render the component
//   render(<Count />);
//   // 🐨 get the elements you need using screen
//   const incrementButton = screen.getByRole("button", { name: /increment/i});
//   const decrementButton = screen.getByRole("button", { name: /decrement/i});
//   const message = screen.getByText(/count/i)
//   // 🐨 assert on the initial state of the hook
//   expect(message).toHaveTextContent('Count: 0');
//   // 🐨 interact with the UI using userEvent and assert on the changes in the UI
//   userEvent.click(incrementButton);
//   expect(message).toHaveTextContent('Count: 1');
//   userEvent.click(decrementButton);
//   expect(message).toHaveTextContent('Count: 0');

//   // extra 1 - a different way of doing the same above tests without the custom Count component
//   // instead use a fake component
//   let result
//   function TestComponent(props) {
//     result = useCounter(props)
//     return null; // so that its a valid component but wont send anything to screen
//   }
//   render(<TestComponent />);
//   // console.log(result);
//   expect(result.count).toBe(0);
//   act(() => {result.increment()});
//   expect(result.count).toBe(1);
//   act(() => {result.decrement()});
//   expect(result.count).toBe(0);
// })

// // extra 2
// test('allows customization of the initial count', () => {
//     const result = setup({initialProps: {initialCount: 5}});
//     expect(result.current.count).toBe(5);
//     act(() => {result.current.increment()});
//     expect(result.current.count).toBe(6);
// })

// // extra 2
// test('allows customization of the step', () => { 
//     const results = setup({initialProps: {step: 10}});
//     expect(results.current.count).toBe(0);
//     act(() => {results.current.increment()});
//     expect(results.current.count).toBe(10);
//     act(() => {results.current.decrement()});
//     expect(results.current.count).toBe(0);
// })

/* eslint no-unused-vars:0 */

// extra 3 - using react-hooks-testing-library
test('allows customization of the initial count', () => {
    const { result } = renderHook(() => useCounter({initialCount: 5}));
    expect(result.current.count).toBe(5);
    act(() => {result.current.increment()});
    expect(result.current.count).toBe(6);
});

// extra 3 - using react-hooks-testing-library
test('allows customization of the step', () => { 
    const { result } = renderHook(() => useCounter({step: 10}));
    expect(result.current.count).toBe(0);
    act(() => {result.current.increment()});
    expect(result.current.count).toBe(10);
    act(() => {result.current.decrement()});
    expect(result.current.count).toBe(0);
});
