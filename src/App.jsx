import { useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonList from './components/PokemonList'
import EmptyState from './components/EmptyState'
import { getUsedTypes, matchesSearch, matchesType } from './utils/pokemon'
import './css/App.css'

// Tipos presentes no arquivo de dados (calculado uma única vez).
const availableTypes = getUsedTypes(data.types, data.pokemon)

function App() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  // Estado derivado: a lista exibida é recalculada a cada digitação.
  const filteredPokemon = useMemo(
    () =>
      data.pokemon.filter(
        (pokemon) => matchesSearch(pokemon, search) && matchesType(pokemon, selectedType),
      ),
    [search, selectedType],
  )

  return (
    <div className="app">
      <Header total={data.pokemon.length} />
      <main className="app__content">
        <section className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <TypeFilter
            types={availableTypes}
            selectedType={selectedType}
            onSelect={setSelectedType}
          />
        </section>

        <p className="results-info" aria-live="polite">
          Exibindo <strong>{filteredPokemon.length}</strong> de {data.pokemon.length} Pokémon
        </p>

        {filteredPokemon.length > 0 ? (
          <PokemonList pokemonList={filteredPokemon} />
        ) : (
          <EmptyState
            title="Nenhum Pokémon encontrado"
            message="Tente pesquisar por outro nome ou ID, ou escolha outro tipo."
          />
        )}
      </main>
    </div>
  )
}

export default App
