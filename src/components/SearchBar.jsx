import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="search" className="sr-only">
        Pesquisar Pokémon por nome ou ID
      </label>
      <span className="search-bar__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </span>
      <input
        id="search"
        type="search"
        className="search-bar__input"
        placeholder="Pesquisar Pokémon... (nome ou ID)"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Limpar pesquisa"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar
