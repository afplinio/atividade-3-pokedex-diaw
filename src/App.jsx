import { useCallback, useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import SortSelect from './components/SortSelect'
import RandomButton from './components/RandomButton'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import CompareTray from './components/CompareTray'
import ComparePanel from './components/ComparePanel'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
import { useFavorites } from './hooks/useFavorites'
import { useTheme } from './hooks/useTheme'
import { getOwners, getUsedTypes, matchesSearch, matchesType } from './utils/pokemon'
import { sortPokemon } from './utils/sort'
import './css/App.css'

// Tipos presentes no arquivo de dados (calculado uma única vez).
const availableTypes = getUsedTypes(data.types, data.pokemon)

// Mapa id -> Pokémon para buscas rápidas (usado nos treinadores).
const pokemonById = new Map(data.pokemon.map((pokemon) => [pokemon.id, pokemon]))

function App() {
  const [view, setView] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [sortBy, setSortBy] = useState('id-asc')
  const [compareIds, setCompareIds] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const { favorites, toggleFavorite } = useFavorites()
  const { theme, toggleTheme } = useTheme()

  // Estado derivado: a lista exibida é recalculada a cada digitação, filtro ou ordenação.
  const filteredPokemon = useMemo(() => {
    const result = data.pokemon.filter(
      (pokemon) =>
        matchesSearch(pokemon, search) &&
        matchesType(pokemon, selectedType) &&
        (!onlyFavorites || favorites.includes(pokemon.id)),
    )
    return sortPokemon(result, sortBy)
  }, [search, selectedType, onlyFavorites, favorites, sortBy])

  const hasFilters = search !== '' || selectedType !== 'all' || onlyFavorites

  const clearFilters = () => {
    setSearch('')
    setSelectedType('all')
    setOnlyFavorites(false)
  }

  // Navegação do modal: percorre a lista filtrada (ou a completa, se o Pokémon não estiver nela).
  const navigationList = filteredPokemon.some((pokemon) => pokemon.id === selectedId)
    ? filteredPokemon
    : data.pokemon
  const selectedIndex = navigationList.findIndex((pokemon) => pokemon.id === selectedId)
  const selectedPokemon = selectedIndex >= 0 ? navigationList[selectedIndex] : null

  const closeDetails = useCallback(() => setSelectedId(null), [])

  const showPrevious = useCallback(() => {
    const index = (selectedIndex - 1 + navigationList.length) % navigationList.length
    setSelectedId(navigationList[index].id)
  }, [selectedIndex, navigationList])

  const showNext = useCallback(() => {
    const index = (selectedIndex + 1) % navigationList.length
    setSelectedId(navigationList[index].id)
  }, [selectedIndex, navigationList])

  // Sorteia um Pokémon da lista atual (ou de todos, se a lista estiver vazia).
  const showRandom = () => {
    const source = filteredPokemon.length > 0 ? filteredPokemon : data.pokemon
    const randomPokemon = source[Math.floor(Math.random() * source.length)]
    setSelectedId(randomPokemon.id)
  }

  // Comparação: no máximo 2 Pokémon. Ao escolher um terceiro, o mais antigo sai.
  const toggleCompare = (id) => {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((compareId) => compareId !== id)
      return current.length < 2 ? [...current, id] : [current[1], id]
    })
  }

  const clearCompare = () => {
    setCompareIds([])
    setShowCompare(false)
  }

  const closeCompare = useCallback(() => setShowCompare(false), [])

  const comparePokemon = compareIds.map((id) => pokemonById.get(id))

  return (
    <div className={`app ${compareIds.length > 0 ? 'app--with-tray' : ''}`}>
      <Header
        total={data.pokemon.length}
        view={view}
        onChangeView={setView}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="app__content">
        {view === 'trainers' ? (
          <TrainerList
            trainers={data.trainers}
            pokemonById={pokemonById}
            onSelectPokemon={setSelectedId}
          />
        ) : (
          <>
            <section className="toolbar">
              <div className="toolbar__row">
                <SearchBar value={search} onChange={setSearch} />
                <div className="toolbar__actions">
                  <SortSelect value={sortBy} onChange={setSortBy} />
                  <button
                    type="button"
                    className={`chip-button ${onlyFavorites ? 'is-active' : ''}`}
                    onClick={() => setOnlyFavorites((current) => !current)}
                    aria-pressed={onlyFavorites}
                  >
                    ♥ Favoritos ({favorites.length})
                  </button>
                  <RandomButton onClick={showRandom} />
                </div>
              </div>
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
              <PokemonList
                pokemonList={filteredPokemon}
                onSelect={setSelectedId}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                compareIds={compareIds}
                onToggleCompare={toggleCompare}
              />
            ) : (
              <EmptyState
                title="Nenhum Pokémon encontrado"
                message={
                  onlyFavorites && favorites.length === 0
                    ? 'Você ainda não tem favoritos. Toque no coração de um Pokémon para favoritá-lo.'
                    : 'Tente pesquisar por outro nome ou ID, ou escolha outro tipo.'
                }
              >
                <button type="button" className="button" onClick={clearFilters}>
                  Limpar filtros
                </button>
              </EmptyState>
            )}
          </>
        )}
      </main>

      <Footer />

      {compareIds.length > 0 && (
        <CompareTray
          selected={comparePokemon}
          onRemove={toggleCompare}
          onClear={clearCompare}
          onCompare={() => setShowCompare(true)}
        />
      )}

      {showCompare && comparePokemon.length === 2 && (
        <ComparePanel
          first={comparePokemon[0]}
          second={comparePokemon[1]}
          onClose={closeCompare}
        />
      )}

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          owners={getOwners(data.trainers, selectedPokemon.id)}
          isFavorite={favorites.includes(selectedPokemon.id)}
          onToggleFavorite={toggleFavorite}
          onClose={closeDetails}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </div>
  )
}

export default App
