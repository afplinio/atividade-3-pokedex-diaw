import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemonList, onSelect }) {
  return (
    <section className="pokemon-list" aria-label="Lista de Pokémon">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={onSelect} />
      ))}
    </section>
  )
}

export default PokemonList
