// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React from 'react'

function Greeting({initialName = ''}) { // extra credit (accept initialName prop) and added default of '' incase no intitial value (so not undefined)

  const [name, setName] = React.useState(initialName);

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Codemzy" />
}

export default App
