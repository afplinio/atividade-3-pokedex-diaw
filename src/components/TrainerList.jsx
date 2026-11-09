import { useMemo, useState } from 'react'
import TrainerCard from './TrainerCard'
import SearchBar from './SearchBar'
import EmptyState from './EmptyState'
import '../css/TrainerList.css'

function TrainerList({ trainers, pokemonById, onSelectPokemon }) {
  const [search, setSearch] = useState('')
  const [sortByBadges, setSortByBadges] = useState(false)

  const visibleTrainers = useMemo(() => {
    const query = search.trim().toLowerCase()
    const result = trainers.filter((trainer) => trainer.name.toLowerCase().includes(query))
    return sortByBadges ? [...result].sort((a, b) => b.badges - a.badges) : result
  }, [trainers, search, sortByBadges])

  return (
    <section className="trainer-list" aria-labelledby="trainers-title">
      <div className="trainer-list__intro">
        <h2 id="trainers-title" className="trainer-list__title">
          Treinadores
        </h2>
        <p className="trainer-list__text">
          Conheça os treinadores, suas insígnias e os Pokémon do time. Clique em um Pokémon para
          ver os detalhes.
        </p>
      </div>

      <div className="trainer-list__controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Pesquisar treinador..."
          label="Pesquisar treinador pelo nome"
        />
        <label className="trainer-list__check">
          <input
            type="checkbox"
            checked={sortByBadges}
            onChange={(event) => setSortByBadges(event.target.checked)}
          />
          Ordenar por insígnias
        </label>
      </div>

      {visibleTrainers.length > 0 ? (
        <div className="trainer-list__grid">
          {visibleTrainers.map((trainer) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              pokemonById={pokemonById}
              onSelectPokemon={onSelectPokemon}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhum treinador encontrado" message="Tente pesquisar outro nome." />
      )}
    </section>
  )
}

export default TrainerList
