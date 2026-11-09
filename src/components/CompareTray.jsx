import { formatId, getSpriteUrl } from '../utils/pokemon'
import '../css/CompareTray.css'

// Barra fixa no rodapé com os Pokémon escolhidos para comparação (máximo 2).
function CompareTray({ selected, onRemove, onClear, onCompare }) {
  const slots = [selected[0], selected[1]]

  return (
    <aside className="compare-tray" aria-label="Comparação de Pokémon">
      <div className="compare-tray__slots">
        {slots.map((pokemon, index) =>
          pokemon ? (
            <div key={pokemon.id} className="compare-tray__slot">
              <img src={getSpriteUrl(pokemon.id)} alt="" width="48" height="48" />
              <span className="compare-tray__name">
                <small>{formatId(pokemon.id)}</small>
                {pokemon.name}
              </span>
              <button
                type="button"
                className="compare-tray__remove"
                onClick={() => onRemove(pokemon.id)}
                aria-label={`Remover ${pokemon.name} da comparação`}
              >
                ×
              </button>
            </div>
          ) : (
            <div key={`empty-${index}`} className="compare-tray__slot is-empty">
              Escolha outro Pokémon
            </div>
          ),
        )}
      </div>

      <div className="compare-tray__actions">
        <button type="button" className="button button--ghost" onClick={onClear}>
          Limpar
        </button>
        <button
          type="button"
          className="button"
          onClick={onCompare}
          disabled={selected.length < 2}
        >
          Comparar
        </button>
      </div>
    </aside>
  )
}

export default CompareTray
