// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  // 💰 React.Children.map(props.children, child => {/* return child clone here */})
  // 📜 https://reactjs.org/docs/react-api.html#reactchildren
  // 📜 https://reactjs.org/docs/react-api.html#cloneelement
  return React.Children.map(children, function(child) {
    let domChild = typeof child.type === "string"; // extra 1 - accept dom component children
    return React.cloneElement(child, domChild ? false : {on, toggle}); // if dom component don't pass the props
  });
}

// 🐨 Flesh out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = function({on, children}) {
    return on ? children : null;
};

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = function({on, children}) {
    return !on ? children : null;
};

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = function({on, toggle, ...props}) {
    return <Switch on={on} onClick={toggle} {...props} />;
};

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
