import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import FavoriteButton from './FavoriteButton'
import { formatId, getPokemonTypes, getTotalStats, getTypeColor, STATS } from '../utils/pokemon'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, onSelect, isFavorite, onToggleFavorite }) {
  const types = getPokemonTypes(pokemon)
  const mainColor = getTypeColor(types[0].name)
  const secondColor = getTypeColor((types[1] ?? types[0]).name)

  return (
    <article
      className="pokemon-card"
      style={{ '--card-color': mainColor, '--card-color-2': secondColor }}
    >
      {/* Botão invisível que cobre o card inteiro e abre os detalhes. */}
      <button
        type="button"
        className="pokemon-card__open"
        onClick={() => onSelect(pokemon.id)}
        aria-label={`Ver detalhes de ${pokemon.name}`}
      />

      <div className="pokemon-card__actions">
        <FavoriteButton
          active={isFavorite}
          onToggle={() => onToggleFavorite(pokemon.id)}
          name={pokemon.name}
        />
      </div>

      <div className="pokemon-card__top">
        <span className="pokemon-card__id">{formatId(pokemon.id)}</span>
        <PokemonImage
          id={pokemon.id}
          name={pokemon.name}
          className="pokemon-card__image"
        />
      </div>

      <div className="pokemon-card__body">
        <h2 className="pokemon-card__name">{pokemon.name}</h2>

        <div className="pokemon-card__types">
          {types.map((type) => (
            <TypeBadge key={type.id} type={type} size="sm" />
          ))}
        </div>

        <dl className="pokemon-card__stats">
          {STATS.map((stat) => (
            <div key={stat.key} className="pokemon-card__stat" title={stat.label}>
              <dt>{stat.short}</dt>
              <dd>{pokemon.stats[stat.key]}</dd>
            </div>
          ))}
        </dl>

        <p className="pokemon-card__total">
          Total <strong>{getTotalStats(pokemon.stats)}</strong>
        </p>
      </div>
    </article>
  )
}

export default PokemonCard
