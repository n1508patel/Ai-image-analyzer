export default function ResultCard({ data }) {
  if (!data) return null;

  return (
    <div className="result-card">
      <div className="result-section">
        <label>Caption</label>
        <p className="caption-text">{data.caption}</p>
      </div>

      <div className="result-grid">
        <div className="result-section">
          <label>Mood</label>
          <span className="pill pill-mood">{data.mood}</span>
        </div>
        <div className="result-section">
          <label>Colors</label>
          <div className="pill-row">
            {data.colors?.map((c) => (
              <span key={c} className="pill">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="result-section">
        <label>Objects Detected</label>
        <div className="pill-row">
          {data.objects?.map((o) => (
            <span key={o} className="pill pill-object">{o}</span>
          ))}
        </div>
      </div>

      <div className="result-section">
        <label>Tags</label>
        <div className="pill-row">
          {data.tags?.map((t) => (
            <span key={t} className="pill pill-tag">#{t}</span>
          ))}
        </div>
      </div>

      <div className="result-section">
        <label>Detailed Analysis</label>
        <p className="detail-text">{data.detailedAnalysis}</p>
      </div>
    </div>
  );
}
