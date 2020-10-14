// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

// extra 3 - custom hook
function useLocalStorageState(key, defaultValue = '') {
    // take the key as an argument so can be used with other components (not just for names)
    const [state, setState] = React.useState(() => { // extra 1 - passed function to useState so that it doesnt check local storage each time for a value we only needed once
        const localStorageValue = window.localStorage.getItem(key);
        return localStorageValue ? JSON.parse(localStorageValue) : defaultValue; // extra 4 - parse local storage value if it exists
    });

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state)); // extra 4 - stringify incase its not a string
    }, [key, state]); // extra 2 adding dependency to prevent re-run on every render

    return [state, setState];
};

function Greeting({initialName = ''}) {
    // 🐨 initialize the state to the value from localStorage
    // 💰 window.localStorage.getItem('name') || initialName
    // the name, setName here is actually the state, setState from our custom hook because that's what we returned
    const [name, setName] = useLocalStorageState('name', initialName);

    function handleChange(event) {
        setName(event.target.value)
    }

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
