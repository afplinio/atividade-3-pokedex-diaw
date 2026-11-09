import { useEffect } from 'react'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import StatBar from './StatBar'
import TypeBadge from './TypeBadge'
import FavoriteButton from './FavoriteButton'
import { formatId, getPokemonTypes, getTotalStats, getTypeColor, STATS } from '../utils/pokemon'
import '../css/PokemonDetails.css'

function PokemonDetails({
  pokemon,
  owners,
  isFavorite,
  onToggleFavorite,
  onClose,
  onPrevious,
  onNext,
}) {
  const types = getPokemonTypes(pokemon)
  const mainColor = getTypeColor(types[0].name)
  const secondColor = getTypeColor((types[1] ?? types[0]).name)

  // Setas do teclado navegam entre os Pokémon.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onPrevious, onNext])

  return (
    <Modal onClose={onClose} labelledBy="details-title" className="details">
      <div
        className="details__hero"
        style={{ '--card-color': mainColor, '--card-color-2': secondColor }}
      >
        <span className="details__id">{formatId(pokemon.id)}</span>
        <PokemonImage
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          size={200}
          className="details__image"
        />
      </div>

      <div className="details__body">
        <div className="details__heading">
          <h2 id="details-title" className="details__name">
            {pokemon.name}
          </h2>
          <FavoriteButton
            active={isFavorite}
            onToggle={() => onToggleFavorite(pokemon.id)}
            name={pokemon.name}
          />
        </div>

        <div className="details__types">
          {types.map((type) => (
            <TypeBadge key={type.id} type={type} />
          ))}
        </div>

        <section className="details__section">
          <h3 className="details__subtitle">Atributos base</h3>
          <div className="details__stats">
            {STATS.map((stat) => (
              <StatBar key={stat.key} label={stat.label} value={pokemon.stats[stat.key]} />
            ))}
          </div>
          <p className="details__total">
            Total <strong>{getTotalStats(pokemon.stats)}</strong>
          </p>
        </section>

        <section className="details__section">
          <h3 className="details__subtitle">Treinadores</h3>
          {owners.length > 0 ? (
            <ul className="details__owners">
              {owners.map((trainer) => (
                <li key={trainer.id}>{trainer.name}</li>
              ))}
            </ul>
          ) : (
            <p className="details__empty">Nenhum treinador possui este Pokémon.</p>
          )}
        </section>

        <nav className="details__nav" aria-label="Navegar entre Pokémon">
          <button type="button" className="button button--ghost" onClick={onPrevious}>
            ← Anterior
          </button>
          <button type="button" className="button button--ghost" onClick={onNext}>
            Próximo →
          </button>
        </nav>
      </div>
    </Modal>
  )
}

export default PokemonDetails
