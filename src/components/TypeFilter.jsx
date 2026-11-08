import { getTypeColor, TYPE_LABELS } from '../utils/pokemon'
import '../css/TypeFilter.css'

function TypeFilter({ types, selectedType, onSelect }) {
  const options = [{ id: 'all', name: 'all' }, ...types]

  return (
    <div className="type-filter" role="group" aria-label="Filtrar por tipo">
      {options.map((type) => {
        const isAll = type.name === 'all'
        const isActive = selectedType === type.name

        return (
          <button
            key={type.id}
            type="button"
            className={`type-filter__button ${isActive ? 'is-active' : ''}`}
            style={{ '--type-color': isAll ? 'var(--color-primary)' : getTypeColor(type.name) }}
            onClick={() => onSelect(type.name)}
            aria-pressed={isActive}
          >
            {isAll ? 'Todos' : TYPE_LABELS[type.name] ?? type.name}
          </button>
        )
      })}
    </div>
  )
}

export default TypeFilter
