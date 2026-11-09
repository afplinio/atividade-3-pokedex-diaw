import { SORT_OPTIONS } from '../utils/sort'
import '../css/SortSelect.css'

function SortSelect({ value, onChange }) {
  return (
    <label className="sort-select">
      <span className="sort-select__label">Ordenar por</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SortSelect
