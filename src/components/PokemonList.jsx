import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemonList, onSelect, favorites, onToggleFavorite }) {
  return (
    <section className="pokemon-list" aria-label="Lista de Pokémon">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onSelect={onSelect}
          isFavorite={favorites.includes(pokemon.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default PokemonList
