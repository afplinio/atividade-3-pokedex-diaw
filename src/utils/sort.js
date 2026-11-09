import { getTotalStats } from './pokemon'

export const SORT_OPTIONS = [
  { value: 'id-asc', label: 'Número (crescente)' },
  { value: 'id-desc', label: 'Número (decrescente)' },
  { value: 'name-asc', label: 'Nome (A-Z)' },
  { value: 'name-desc', label: 'Nome (Z-A)' },
  { value: 'total', label: 'Total de atributos' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Ataque' },
  { value: 'defense', label: 'Defesa' },
  { value: 'specialAttack', label: 'Ataque Especial' },
  { value: 'specialDefense', label: 'Defesa Especial' },
  { value: 'speed', label: 'Velocidade' },
]

const comparators = {
  'id-asc': (a, b) => a.id - b.id,
  'id-desc': (a, b) => b.id - a.id,
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'name-desc': (a, b) => b.name.localeCompare(a.name),
  total: (a, b) => getTotalStats(b.stats) - getTotalStats(a.stats),
}

// Retorna uma nova lista ordenada (não altera a original).
// Atributos são ordenados do maior para o menor; empates mantêm a ordem por número.
export const sortPokemon = (list, sortBy) => {
  const compare =
    comparators[sortBy] ?? ((a, b) => b.stats[sortBy] - a.stats[sortBy] || a.id - b.id)
  return [...list].sort(compare)
}
