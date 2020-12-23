// Cache resources
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}

// 🐨 create a pokemonResourceCache object
// const pokemonResourceCache = {};

// // 🐨 create a getPokemonResource function which accepts a name checks the cache
// // for an existing resource. If there is none, then it creates a resource
// // and inserts it into the cache. Finally the function should return the
// // resource.
// function getPokemonResource(name) {
//     const lowerName = name.toLowerCase();
//     let resource = pokemonResourceCache[lowerName];
//     if (!resource) {
//         resource = createPokemonResource(lowerName);
//         pokemonResourceCache[lowerName] = resource;
//     }
//     return resource;
// }

function createPokemonResource(pokemonName) {
  return createResource(fetchPokemon(pokemonName))
}

// extra 1
const pokemonCacheContext = React.createContext();

function usePokemonResourceCache() {
    let context = React.useContext(pokemonCacheContext);
    if (!context) {
        throw new Error("usePokemonResourceCache should be used within a PokemonCacheProvider");
    }
    return context;
};

// extra 2 (extra 3 - cacheTime defaults to 5000 but can be configured)
function PokemonCacheProvider({cacheTime = 5000, children}) {
    const cache = React.useRef({});
    const timestamps = React.useRef({})
    const getPokemonResource = React.useCallback((name) => {
        const time = Date.now();
        const lowerName = name.toLowerCase();
        let resource = cache.current[lowerName];
        let timestamp = timestamps.current[lowerName];
        if (!resource || !timestamp || time - timestamp > cacheTime) {
            resource = createPokemonResource(lowerName);
            cache.current[lowerName] = resource;
            timestamps.current[lowerName] = time; // add time so can check if stale (extra 3)
        }
        return resource;
    }, [cacheTime]);

    return (
        <pokemonCacheContext.Provider value={getPokemonResource}>
            {children}
        </pokemonCacheContext.Provider>
    );
};

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)
  const getPokemonResource = usePokemonResourceCache()

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      // 🐨 change this to getPokemonResource instead
      setPokemonResource(getPokemonResource(pokemonName))
    })
  }, [pokemonName, startTransition, getPokemonResource])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

function AppWithProvider() {
    return (
        <PokemonCacheProvider cacheTime={6000}><App /></PokemonCacheProvider>
    )
};

export default AppWithProvider
