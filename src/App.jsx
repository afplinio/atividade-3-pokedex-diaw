import { useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import PokemonList from './components/PokemonList'
import { matchesSearch } from './utils/pokemon'
import './css/App.css'

function App() {
  const [search, setSearch] = useState('')

  // Estado derivado: a lista exibida é recalculada a cada digitação.
  const filteredPokemon = useMemo(
    () => data.pokemon.filter((pokemon) => matchesSearch(pokemon, search)),
    [search],
  )

  return (
    <div className="app">
      <Header total={data.pokemon.length} />
      <main className="app__content">
        <section className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
        </section>
        <PokemonList pokemonList={filteredPokemon} />
      </main>
    </div>
  )
}

export default App
