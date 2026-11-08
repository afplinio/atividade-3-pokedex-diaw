import { useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonList from './components/PokemonList'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
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

  const hasFilters = search !== '' || selectedType !== 'all'

  const clearFilters = () => {
    setSearch('')
    setSelectedType('all')
  }

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

        <div className="results-bar">
          <p className="results-info" aria-live="polite">
            Exibindo <strong>{filteredPokemon.length}</strong> de {data.pokemon.length} Pokémon
          </p>
          {hasFilters && (
            <button type="button" className="button button--ghost" onClick={clearFilters}>
              Limpar filtros
            </button>
          )}
        </div>

        {filteredPokemon.length > 0 ? (
          <PokemonList pokemonList={filteredPokemon} />
        ) : (
          <EmptyState
            title="Nenhum Pokémon encontrado"
            message="Tente pesquisar por outro nome ou ID, ou escolha outro tipo."
          >
            <button type="button" className="button" onClick={clearFilters}>
              Limpar filtros
            </button>
          </EmptyState>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
