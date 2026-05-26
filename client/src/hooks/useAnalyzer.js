import { useState, useCallback } from "react";
import { analyzeImage as analyzeAPI, getHistory, deleteAnalysis } from "../api";

export function useAnalyzer() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const base64 = await fileToBase64(file);
      const imageBase64 = base64.split(",")[1];
      const mediaType = file.type;
      const res = await analyzeAPI({ imageBase64, mediaType, imageName: file.name });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const res = await getHistory();
      setHistory(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const remove = useCallback(async (id) => {
    await deleteAnalysis(id);
    setHistory((prev) => prev.filter((h) => h._id !== id));
  }, []);

  return { result, history, loading, error, analyze, loadHistory, remove };
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
