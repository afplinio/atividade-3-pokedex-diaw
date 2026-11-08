import { getTypeColor, TYPE_LABELS } from '../utils/pokemon'
import '../css/TypeBadge.css'

function TypeBadge({ type, size = 'md' }) {
  return (
    <span
      className={`type-badge type-badge--${size}`}
      style={{ '--type-color': getTypeColor(type.name) }}
    >
      {TYPE_LABELS[type.name] ?? type.name}
    </span>
  )
}

export default TypeBadge
