import { useState } from 'react'
import '../css/RandomButton.css'

function RandomButton({ onClick }) {
  const [spinning, setSpinning] = useState(false)

  const handleClick = () => {
    setSpinning(true)
    onClick()
  }

  return (
    <button
      type="button"
      className={`random-button ${spinning ? 'is-spinning' : ''}`}
      onClick={handleClick}
      onAnimationEnd={() => setSpinning(false)}
      title="Pokémon aleatório"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="8" r="1.6" fill="currentColor" />
        <circle cx="16" cy="8" r="1.6" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        <circle cx="8" cy="16" r="1.6" fill="currentColor" />
        <circle cx="16" cy="16" r="1.6" fill="currentColor" />
      </svg>
      <span>Aleatório</span>
    </button>
  )
}

export default RandomButton
