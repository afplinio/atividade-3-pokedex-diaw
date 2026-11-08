import data from './data/pokedex-data.json'
import Header from './components/Header'
import './css/App.css'

function App() {
  return (
    <div className="app">
      <Header total={data.pokemon.length} />
      <main className="app__content"></main>
    </div>
  )
}

export default App
