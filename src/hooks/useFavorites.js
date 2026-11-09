import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'pokedex:favorites'

const readFavorites = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// Hook customizado: guarda os IDs favoritos e salva no localStorage.
export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Sem acesso ao localStorage (ex.: navegação privada): os favoritos ficam só na sessão.
    }
  }, [favorites])

  const toggleFavorite = useCallback((id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    )
  }, [])

  return { favorites, toggleFavorite }
}
