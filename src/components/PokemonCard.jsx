import TypeBadge from './TypeBadge'
import { formatId, getArtworkUrl, getTotalStats, getTypeColor, STATS } from '../utils/pokemon'
import '../css/PokemonCard.css'

// Alguns Pokémon do arquivo (ex.: Mew) não possuem tipos cadastrados.
const NO_TYPE = [{ id: 0, name: 'Typeless' }]

function PokemonCard({ pokemon }) {
  const types = pokemon.types.length > 0 ? pokemon.types : NO_TYPE
  const mainColor = getTypeColor(types[0].name)
  const secondColor = getTypeColor((types[1] ?? types[0]).name)

  return (
    <article
      className="pokemon-card"
      style={{ '--card-color': mainColor, '--card-color-2': secondColor }}
    >
      <div className="pokemon-card__top">
        <span className="pokemon-card__id">{formatId(pokemon.id)}</span>
        <img
          className="pokemon-card__image"
          src={getArtworkUrl(pokemon.id)}
          alt={pokemon.name}
          width="120"
          height="120"
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
