import '../css/FavoriteButton.css'

function FavoriteButton({ active, onToggle, name, className = '' }) {
  return (
    <button
      type="button"
      className={`favorite-button ${active ? 'is-active' : ''} ${className}`}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? `Remover ${name} dos favoritos` : `Adicionar ${name} aos favoritos`}
      title={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  )
}

export default FavoriteButton
