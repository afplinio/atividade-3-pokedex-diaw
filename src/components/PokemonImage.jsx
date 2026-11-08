import { useState } from 'react'
import { getArtworkUrl, getSpriteUrl } from '../utils/pokemon'
import '../css/PokemonImage.css'

// Tenta a arte oficial; se falhar, usa o sprite simples; se também falhar, mostra um placeholder.
function PokemonImage({ id, name, size = 120, className = '' }) {
  const sources = [getArtworkUrl(id), getSpriteUrl(id)]
  const [attempt, setAttempt] = useState(0)
  const [loaded, setLoaded] = useState(false)

  if (attempt >= sources.length) {
    return (
      <div
        className={`pokemon-image pokemon-image--fallback ${className}`}
        style={{ width: size, height: size }}
        role="img"
        aria-label={name}
      >
        ?
      </div>
    )
  }

  return (
    <img
      className={`pokemon-image ${loaded ? 'is-loaded' : ''} ${className}`}
      src={sources[attempt]}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false)
        setAttempt((current) => current + 1)
      }}
    />
  )
}

export default PokemonImage
