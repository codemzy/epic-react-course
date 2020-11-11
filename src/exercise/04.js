// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'

// this is a function we could use that calls all the functions passed to it
// from the video
const callAllFunctions = function(...functions) {
    return function(...args) {
        functions.forEach(function(funct) {
            funct?.(...args);
        })
    }
};

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  const togglerProps = {'aria-pressed': on};

  // extra 1
  const getTogglerProps = function({onClick, ...options} = {}) {
        return {
            ...togglerProps,
            onClick: function() { // or could use callAllFunctions(onClick, toggle)
                onClick && onClick(); // if we have been passed an onClick function in the options call that
                toggle(); // always call the default toggle
            },
            ...options
        }
  };
  return {on, toggle, getTogglerProps};
};

// function App() {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

// extra 1
function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
};

export default App

/*
eslint
  no-unused-vars: "off",
*/
