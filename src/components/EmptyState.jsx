import '../css/EmptyState.css'

function EmptyState({ title, message, children }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon" aria-hidden="true" />
      <h2 className="empty-state__title">{title}</h2>
      {message && <p className="empty-state__message">{message}</p>}
      {children}
    </div>
  )
}

export default EmptyState
