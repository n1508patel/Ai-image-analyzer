export default function HistorySidebar({ history, onDelete, onLoad }) {
  if (!history.length) return (
    <div className="history-empty">
      <span>No analyses yet</span>
    </div>
  );

  return (
    <ul className="history-list">
      {history.map((item) => (
        <li key={item._id} className="history-item" onClick={() => onLoad(item)}>
          <div className="history-info">
            <span className="history-name">{item.imageName}</span>
            <span className="history-caption">{item.caption?.slice(0, 60)}…</span>
            <span className="history-date">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
          <button
            className="btn-delete"
            onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
            aria-label="Delete"
          >✕</button>
        </li>
      ))}
    </ul>
  );
}
