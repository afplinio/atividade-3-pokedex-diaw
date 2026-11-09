import { useEffect, useRef } from 'react'
import '../css/Modal.css'

// Janela modal reutilizável: fecha com ESC, clique fora ou botão "×".
function Modal({ onClose, labelledBy, className = '', children }) {
  const closeButtonRef = useRef(null)

  // Leva o foco para o botão de fechar ao abrir.
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Fecha com ESC e trava a rolagem da página enquanto o modal está aberto.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div
        className={`modal__dialog ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
