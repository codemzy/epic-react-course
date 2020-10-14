// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React from 'react'

function Greeting() {
    
  const [name, setName] = React.useState('');

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
