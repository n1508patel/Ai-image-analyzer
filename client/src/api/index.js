import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const analyzeImage = (payload) => api.post("/analyze", payload);
export const getHistory = () => api.get("/analyze");
export const deleteAnalysis = (id) => api.delete(`/analyze/${id}`);
