import data from './data/pokedex-data.json'
import Header from './components/Header'
import PokemonList from './components/PokemonList'
import './css/App.css'

function App() {
  return (
    <div className="app">
      <Header total={data.pokemon.length} />
      <main className="app__content">
        <PokemonList pokemonList={data.pokemon} />
      </main>
    </div>
  )
}

export default App
