import { MAX_STAT } from '../utils/pokemon'
import '../css/StatBar.css'

// Cor da barra de acordo com o valor do atributo.
const getStatColor = (value) => {
  if (value < 50) return '#f34444'
  if (value < 80) return '#ff7f0f'
  if (value < 100) return '#ffdd57'
  if (value < 120) return '#a0e515'
  return '#23cd5e'
}

function StatBar({ label, value, max = MAX_STAT }) {
  const percent = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className="stat-bar">
      <span className="stat-bar__label">{label}</span>
      <span className="stat-bar__value">{value}</span>
      <div
        className="stat-bar__track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className="stat-bar__fill"
          style={{ width: `${percent}%`, '--bar-color': getStatColor(value) }}
        />
      </div>
    </div>
  )
}

export default StatBar
