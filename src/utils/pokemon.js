// Funções e constantes auxiliares usadas pelos componentes da Pokédex.

const SPRITES_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// Imagem principal (arte oficial) e imagem reserva (sprite simples) da PokéAPI.
export const getArtworkUrl = (id) => `${SPRITES_URL}/other/official-artwork/${id}.png`
export const getSpriteUrl = (id) => `${SPRITES_URL}/${id}.png`

// 25 -> "#025"
export const formatId = (id) => `#${String(id).padStart(3, '0')}`

// Maior valor possível de um atributo base, usado nas barras de atributos.
export const MAX_STAT = 255

export const STATS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATK' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Especial', short: 'SP.ATK' },
  { key: 'specialDefense', label: 'Defesa Especial', short: 'SP.DEF' },
  { key: 'speed', label: 'Velocidade', short: 'SPD' },
]

export const getTotalStats = (stats) =>
  STATS.reduce((total, { key }) => total + stats[key], 0)

export const TYPE_COLORS = {
  Typeless: '#68a090',
  Normal: '#a8a77a',
  Fire: '#ee8130',
  Water: '#6390f0',
  Grass: '#7ac74c',
  Electric: '#f7d02c',
  Ice: '#96d9d6',
  Fighting: '#c22e28',
  Poison: '#a33ea1',
  Ground: '#e2bf65',
  Flying: '#a98ff3',
  Psychic: '#f95587',
  Bug: '#a6b91a',
  Rock: '#b6a136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6f35fc',
  Steel: '#b7b7ce',
}

export const TYPE_LABELS = {
  Typeless: 'Sem tipo',
  Normal: 'Normal',
  Fire: 'Fogo',
  Water: 'Água',
  Grass: 'Planta',
  Electric: 'Elétrico',
  Ice: 'Gelo',
  Fighting: 'Lutador',
  Poison: 'Venenoso',
  Ground: 'Terra',
  Flying: 'Voador',
  Psychic: 'Psíquico',
  Bug: 'Inseto',
  Rock: 'Pedra',
  Ghost: 'Fantasma',
  Dark: 'Sombrio',
  Dragon: 'Dragão',
  Steel: 'Aço',
}

export const getTypeColor = (typeName) => TYPE_COLORS[typeName] ?? TYPE_COLORS.Typeless

// Retorna apenas os tipos que aparecem em pelo menos um Pokémon, na ordem do arquivo.
export const getUsedTypes = (types, pokemonList) => {
  const used = new Set(pokemonList.flatMap((pokemon) => pokemon.types.map((type) => type.name)))
  return types.filter((type) => used.has(type.name))
}

// Remove acentos e deixa em minúsculas para comparar textos.
const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

// Pesquisa por nome ou ID ("25", "025" ou "#025").
export const matchesSearch = (pokemon, search) => {
  const query = normalize(search).replace(/^#/, '')
  if (!query) return true

  if (/^\d+$/.test(query)) {
    return String(pokemon.id).padStart(3, '0').includes(query)
  }

  return normalize(pokemon.name).includes(query)
}

export const matchesType = (pokemon, typeName) =>
  typeName === 'all' || pokemon.types.some((type) => type.name === typeName)

// Alguns Pokémon do arquivo (ex.: Mew) não possuem tipos cadastrados.
const NO_TYPE = [{ id: 0, name: 'Typeless' }]
export const getPokemonTypes = (pokemon) => (pokemon.types.length > 0 ? pokemon.types : NO_TYPE)

// Treinadores que possuem o Pokémon informado.
export const getOwners = (trainers, pokemonId) =>
  trainers.filter((trainer) => trainer.pokemonIds.includes(pokemonId))
