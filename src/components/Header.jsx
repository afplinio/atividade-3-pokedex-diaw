import '../css/Header.css'

const VIEWS = [
  { id: 'pokedex', label: 'Pokédex' },
  { id: 'trainers', label: 'Treinadores' },
]

function Header({ total, view, onChangeView }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__pokeball" aria-hidden="true" />
          <div>
            <h1 className="header__title">Pokédex</h1>
            <p className="header__subtitle">{total} Pokémon da região de Kanto</p>
          </div>
        </div>

        <div className="header__actions">
          <nav className="header__nav" aria-label="Seções">
            {VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`header__tab ${view === item.id ? 'is-active' : ''}`}
                onClick={() => onChangeView(item.id)}
                aria-current={view === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
