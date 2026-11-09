import Modal from './Modal'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { formatId, getPokemonTypes, getTotalStats, MAX_STAT, STATS } from '../utils/pokemon'
import '../css/ComparePanel.css'

function CompareHeader({ pokemon }) {
  return (
    <div className="compare__pokemon">
      <PokemonImage id={pokemon.id} name={pokemon.name} size={110} className="compare__image" />
      <span className="compare__id">{formatId(pokemon.id)}</span>
      <h3 className="compare__name">{pokemon.name}</h3>
      <div className="compare__types">
        {getPokemonTypes(pokemon).map((type) => (
          <TypeBadge key={type.id} type={type} size="sm" />
        ))}
      </div>
    </div>
  )
}

function ComparePanel({ first, second, onClose }) {
  const rows = STATS.map((stat) => ({
    ...stat,
    left: first.stats[stat.key],
    right: second.stats[stat.key],
  }))

  const firstWins = rows.filter((row) => row.left > row.right).length
  const secondWins = rows.filter((row) => row.right > row.left).length
  const firstTotal = getTotalStats(first.stats)
  const secondTotal = getTotalStats(second.stats)

  // Quem vence mais atributos ganha; em caso de empate, decide o total.
  let summary = 'Empate técnico!'
  if (firstWins !== secondWins) {
    const [winner, wins] = firstWins > secondWins ? [first, firstWins] : [second, secondWins]
    summary = `${winner.name} vence em ${wins} de ${rows.length} atributos`
  } else if (firstTotal !== secondTotal) {
    const winner = firstTotal > secondTotal ? first : second
    summary = `Empate em atributos (${firstWins} x ${secondWins}), mas ${winner.name} tem o maior total`
  }

  return (
    <Modal onClose={onClose} labelledBy="compare-title" className="compare">
      <h2 id="compare-title" className="compare__title">
        Comparação
      </h2>

      <div className="compare__header">
        <CompareHeader pokemon={first} />
        <span className="compare__vs" aria-hidden="true">
          VS
        </span>
        <CompareHeader pokemon={second} />
      </div>

      <div className="compare__rows">
        {rows.map((row) => (
          <div key={row.key} className="compare__row">
            <span className={`compare__value ${row.left > row.right ? 'is-winner' : ''}`}>
              {row.left}
            </span>
            <div className="compare__bar compare__bar--left">
              <span style={{ width: `${(row.left / MAX_STAT) * 100}%` }} />
            </div>
            <span className="compare__label">{row.short}</span>
            <div className="compare__bar compare__bar--right">
              <span style={{ width: `${(row.right / MAX_STAT) * 100}%` }} />
            </div>
            <span className={`compare__value ${row.right > row.left ? 'is-winner' : ''}`}>
              {row.right}
            </span>
          </div>
        ))}

        <div className="compare__row compare__row--total">
          <span className={`compare__value ${firstTotal > secondTotal ? 'is-winner' : ''}`}>
            {firstTotal}
          </span>
          <span className="compare__label compare__label--total">TOTAL</span>
          <span className={`compare__value ${secondTotal > firstTotal ? 'is-winner' : ''}`}>
            {secondTotal}
          </span>
        </div>
      </div>

      <p className="compare__summary">{summary}</p>
    </Modal>
  )
}

export default ComparePanel
