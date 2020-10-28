// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React from 'react'

function Counter({initialCount = 0, step = 1}) {
//   // 🐨 replace React.useState with React.useReducer.
//   // 💰 React.useReducer(countReducer, initialCount)
//   // const [count, setCount] = React.useState(initialCount)
//   const [count, changeCount] = React.useReducer(countReducer, initialCount);

//   function countReducer(state, step) {
//     return state + step; 
//   };
  
//   // 💰 you can write the countReducer function so you don't have to make any
//   // changes to the next two lines of code! Remember:
//   // The 1st argument is called "state" - the current value of count
//   // The 2nd argument is called "newState" - the value passed to setCount
//   const increment = () => changeCount(step)

    const [state, dispatch] = React.useReducer(countReducer, {
        count: initialCount,
    })

    // // extra 3
    // function countReducer(state, action) {
    //     return {
    //         ...state, 
    //         ...(typeof action === "function" ? action(state) : action)
    //     }; 
    // };

    // extra 4
    function countReducer(state, action) {
        if (action.type === 'INCREMENT') {
            return {count: state.count + action.step};
        } else {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    };

    const {count} = state;
    // const increment = () => setState({count: count + step})
    // const increment = () => setState(currentState => ({count: currentState.count + step}))
    const increment = () => dispatch({type: 'INCREMENT', step});

    return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
