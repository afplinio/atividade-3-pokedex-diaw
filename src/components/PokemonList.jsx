import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemonList }) {
  return (
    <section className="pokemon-list" aria-label="Lista de Pokémon">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  )
}

export default PokemonList
