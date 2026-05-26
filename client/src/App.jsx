import { useEffect, useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ResultCard from "./components/ResultCard";
import HistorySidebar from "./components/HistorySidebar";
import { useAnalyzer } from "./hooks/useAnalyzer";
import "./App.css";

export default function App() {
  const { result, history, loading, error, analyze, loadHistory, remove } = useAnalyzer();
  const [activeResult, setActiveResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    if (result) setActiveResult(result);
  }, [result]);

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-name">Visionary</span>
        </div>
        
        <button
          className="btn-history-toggle"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? "← Back" : "History"}
        </button>
      </header>

      <main className="app-main">
        {showHistory ? (
          <div className="history-panel">
            <h2>Past Analyses</h2>
            <HistorySidebar
              history={history}
              onDelete={remove}
              onLoad={(item) => { setActiveResult(item); setShowHistory(false); }}
            />
          </div>
        ) : (
          <div className="analyze-panel">
            <div className="upload-col">
              <ImageUploader onUpload={analyze} loading={loading} />
              {error && <p className="error-msg">⚠ {error}</p>}
            </div>
            <div className="result-col">
              {activeResult
                ? <ResultCard data={activeResult} />
                : (
                  <div className="result-placeholder">
                    <span>Upload an image to get started</span>
                  </div>
                )
              }
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
