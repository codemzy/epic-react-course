// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import ErrorBoundary from './ErrorBoundary';
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  // state
  // extra 3 - state to object because react can;t batch state updates in async callbacks so this ensure status update happens
  // at the same time as pokemon update
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: false 
  });

  React.useEffect(() => {
    if (pokemonName) {
        setState({ status: "pending" });
        fetchPokemon(pokemonName).then(function(pokemonData) {
            setState({ status: "resolved", pokemon: pokemonData});
        }).catch(function(error) {
            setState({ status: "rejected", error: error});
        });
    }
  }, [pokemonName]);

  if (state.status === "rejected") {
    throw state.error;
  } else {
    return (
        state.status === "idle" ? 'Submit a pokemon' :
        state.status === "pending" ? <PokemonInfoFallback name={pokemonName} /> :
        <PokemonDataView pokemon={state.pokemon} />
    );
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary><PokemonInfo pokemonName={pokemonName} /></ErrorBoundary>
      </div>
    </div>
  )
}

export default App
