import { formatId, getSpriteUrl } from '../utils/pokemon'
import '../css/TrainerCard.css'

const MAX_BADGES = 8

function TrainerCard({ trainer, pokemonById, onSelectPokemon }) {
  const initials = trainer.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="trainer-card">
      <header className="trainer-card__header">
        <span className="trainer-card__avatar" aria-hidden="true">
          {initials}
        </span>
        <div>
          <h2 className="trainer-card__name">{trainer.name}</h2>
          <p className="trainer-card__info">
            {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'} ·{' '}
            {trainer.pokemonIds.length} Pokémon
          </p>
        </div>
      </header>

      <div className="trainer-card__badges" aria-label={`${trainer.badges} insígnias`}>
        {Array.from({ length: Math.max(MAX_BADGES, trainer.badges) }, (_, index) => (
          <span
            key={index}
            className={`trainer-card__badge ${index < trainer.badges ? 'is-earned' : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>

      <ul className="trainer-card__team">
        {/* O mesmo Pokémon pode aparecer mais de uma vez no time, por isso a key usa o índice. */}
        {trainer.pokemonIds.map((pokemonId, index) => {
          const pokemon = pokemonById.get(pokemonId)
          if (!pokemon) return null

          return (
            <li key={`${pokemonId}-${index}`}>
              <button
                type="button"
                className="trainer-card__pokemon"
                onClick={() => onSelectPokemon(pokemon.id)}
                title={`Ver detalhes de ${pokemon.name}`}
              >
                <img
                  src={getSpriteUrl(pokemon.id)}
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                />
                <span className="trainer-card__pokemon-id">{formatId(pokemon.id)}</span>
                <span className="trainer-card__pokemon-name">{pokemon.name}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default TrainerCard
