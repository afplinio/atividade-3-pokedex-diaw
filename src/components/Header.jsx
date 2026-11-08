import '../css/Header.css'

function Header({ total }) {
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
      </div>
    </header>
  )
}

export default Header
